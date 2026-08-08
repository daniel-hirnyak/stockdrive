import { useState, useEffect } from 'react'
import { supabasePanel } from './supabase'

export function useAuth() {
  const [session, setSession] = useState(undefined) // undefined = cargando, null = sin sesión, object = con sesión

  useEffect(() => {
    supabasePanel.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } = supabasePanel.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return session
}
