import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { accessTokenExpiry, refreshAccessToken } from './refreshToken'

/** Server-side backend base URL (never exposed to the browser). */
const BASE = process.env.API_INTERNAL_URL ?? 'http://localhost:8000/api'

/** User shape returned by BACK-01 `/api/auth/login/`. */
export interface BackendUser {
  id: number
  email: string
  first_name: string
}

interface LoginResponse {
  access: string
  refresh: string
  user: BackendUser
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/connexion',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const res = await fetch(`${BASE}/auth/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) return null

        const data = (await res.json()) as Partial<LoginResponse>
        if (!data.access || !data.refresh || !data.user) return null

        // Carry the backend payload through to the `jwt` callback via the
        // NextAuth user object. `id` must be a string for the User type.
        return {
          id: String(data.user.id),
          email: data.user.email,
          firstName: data.user.first_name,
          accessToken: data.access,
          refreshToken: data.refresh,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in: seed the token from the authorized user.
      if (user) {
        return {
          ...token,
          userId: user.id,
          email: user.email ?? null,
          firstName: user.firstName,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: accessTokenExpiry(user.accessToken),
          error: undefined,
        }
      }

      // Access token still valid (60s safety margin): reuse it.
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires - 60_000) {
        return token
      }

      // Expired: renew via the refresh token.
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      session.user = {
        id: token.userId,
        email: token.email ?? '',
        firstName: token.firstName,
      }
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    },
  },
}
