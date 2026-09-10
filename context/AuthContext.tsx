'use client'

import { createContext, useContext, useMemo } from 'react'
import {
  SessionProvider,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react'

export interface AuthUser {
  id: string
  email: string
  firstName: string
}

interface LoginResult {
  ok: boolean
  /** User-facing error message on failure, otherwise null. */
  error: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  /** True while the session is being resolved (avoids auth flicker). */
  isLoading: boolean
  login: (email: string, password: string) => Promise<LoginResult>
  logout: (callbackUrl?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthState({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const value = useMemo<AuthContextValue>(() => {
    const user = session?.user ?? null

    async function login(email: string, password: string): Promise<LoginResult> {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      if (!res || res.error) {
        return { ok: false, error: 'Email ou mot de passe incorrect.' }
      }
      return { ok: true, error: null }
    }

    async function logout(callbackUrl = '/') {
      // Invalidate the backend refresh token, then clear the local session.
      try {
        await fetch('/api/auth/logout', { method: 'POST' })
      } catch {
        // Proceed with local sign-out regardless.
      }
      await signOut({ callbackUrl })
    }

    return {
      user,
      isAuthenticated: status === 'authenticated' && user !== null,
      isLoading: status === 'loading',
      login,
      logout,
    }
  }, [session, status])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthState>{children}</AuthState>
    </SessionProvider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
