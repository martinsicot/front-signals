export {}

declare module 'next-auth' {
  /** Object returned by `authorize()` and passed to the `jwt` callback. */
  interface User {
    id: string
    email: string
    firstName: string
    accessToken: string
    refreshToken: string
  }

  /** Shape exposed to the client via `useSession()` / `getServerSession()`. */
  interface Session {
    user: {
      id: string
      email: string
      firstName: string
    }
    accessToken: string
    error?: 'RefreshAccessTokenError'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    email: string | null
    firstName: string
    accessToken: string
    refreshToken: string
    /** Epoch ms when `accessToken` expires. */
    accessTokenExpires: number
    error?: 'RefreshAccessTokenError'
  }
}
