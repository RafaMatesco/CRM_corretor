import { useState, useEffect, useCallback } from 'react'
import { supabase, IS_DEMO } from '@/lib/supabase'

const DEMO_USER = { id: 'demo', email: 'demo@imocrm.com', name: 'Carlos Rodrigues', creci: '12345-SP' }

export function useAuth() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo mode — nenhuma chamada de rede
    if (IS_DEMO) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const signIn = useCallback(async (email, password) => {
    // ── Demo mode ────────────────────────────────────────────────────────
    if (IS_DEMO) {
      if (email === 'demo@imocrm.com' && password === 'demo1234') {
        setUser(DEMO_USER)
        return { user: DEMO_USER, error: null }
      }
      return { user: null, error: { message: 'E-mail ou senha incorretos. Use demo@imocrm.com / demo1234' } }
    }

    // ── Supabase real ────────────────────────────────────────────────────
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) setUser(data.user)
    return { user: data?.user ?? null, error }
  }, [])

  const signOut = useCallback(async () => {
    if (!IS_DEMO) await supabase.auth.signOut()
    setUser(null)
  }, [])

  return { user, loading, signIn, signOut, IS_DEMO }
}
