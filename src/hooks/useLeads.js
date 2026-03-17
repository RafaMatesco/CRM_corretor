import { useState, useEffect, useCallback } from 'react'
import { supabase, IS_DEMO } from '@/lib/supabase'
import { MOCK_LEADS } from '@/lib/mockData'

export function useLeads() {
  const [leads, setLeads]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    if (IS_DEMO) { setLeads(MOCK_LEADS); setLoading(false); return }
    const { data, error } = await supabase
      .from('leads')
      .select('*, properties(title)')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setLeads((data ?? []).map(l => ({ ...l, property_title: l.properties?.title ?? '—' })))
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const create = useCallback(async (payload) => {
    const row = { ...payload, status: 'novo', created_at: new Date().toISOString() }
    if (IS_DEMO) {
      const newLead = { ...row, id: String(Date.now()) }
      setLeads(prev => [newLead, ...prev])
      return { data: newLead, error: null }
    }
    const { data, error } = await supabase.from('leads').insert(row).select().single()
    if (!error) setLeads(prev => [data, ...prev])
    return { data, error }
  }, [])

  const updateStatus = useCallback(async (id, status) => {
    if (IS_DEMO) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
      return { error: null }
    }
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    return { error }
  }, [])

  const remove = useCallback(async (id) => {
    if (IS_DEMO) { setLeads(prev => prev.filter(l => l.id !== id)); return { error: null } }
    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (!error) setLeads(prev => prev.filter(l => l.id !== id))
    return { error }
  }, [])

  return { leads, loading, error, fetch, create, updateStatus, remove }
}
