import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { UserMenuUser } from '../shell/components/UserMenu'

interface AuthState {
  user: UserMenuUser | null
  loading: boolean
}

export function useAuth(): AuthState & { signOut: () => Promise<void> } {
  const [state, setState] = useState<AuthState>({ user: null, loading: true })

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email)
      } else {
        setState({ user: null, loading: false })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email)
      } else {
        setState({ user: null, loading: false })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId: string, email?: string) {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, role, avatar_url')
      .eq('id', userId)
      .single()

    setState({
      user: data
        ? {
            name: data.full_name,
            email: email,
            role: data.role as UserMenuUser['role'],
            avatarUrl: data.avatar_url ?? undefined,
          }
        : { name: email?.split('@')[0] ?? 'User', email, role: 'donor' },
      loading: false,
    })
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return { ...state, signOut }
}
