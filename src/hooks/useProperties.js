import { useState, useEffect, useCallback } from 'react'
import { supabase, IS_DEMO } from '@/lib/supabase'
import { MOCK_PROPERTIES } from '@/lib/mockData'
import { slugify } from '@/lib/utils'

/**
 * Full CRUD hook for the `properties` table.
 * In demo mode it works against local state; when Supabase is configured
 * it hits the real database.
 */
export function useProperties({ onlyPublished = false } = {}) {
  const [properties, setProperties] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  // ── Fetch ──────────────────────────────────────────────────────────────
  const fetch = useCallback(async () => {
    setLoading(true)
    if (IS_DEMO) {
      const data = onlyPublished ? MOCK_PROPERTIES.filter(p => p.is_published) : MOCK_PROPERTIES
      setProperties(data)
      setLoading(false)
      return
    }
    let query = supabase.from('properties').select('*').order('created_at', { ascending: false })
    if (onlyPublished) query = query.eq('is_published', true)
    const { data, error } = await query
    if (error) setError(error.message)
    else setProperties(data ?? [])
    setLoading(false)
  }, [onlyPublished])

  useEffect(() => { fetch() }, [fetch])

  // ── Create ─────────────────────────────────────────────────────────────
  const create = useCallback(async (payload) => {
    const row = { ...payload, slug: slugify(payload.title) }
    if (IS_DEMO) {
      const newProp = { ...row, id: String(Date.now()), views: 0, created_at: new Date().toISOString() }
      setProperties(prev => [newProp, ...prev])
      return { data: newProp, error: null }
    }
    const { data, error } = await supabase.from('properties').insert(row).select().single()
    if (!error) setProperties(prev => [data, ...prev])
    return { data, error }
  }, [])

  // ── Update ─────────────────────────────────────────────────────────────
  const update = useCallback(async (id, payload) => {
    const row = payload.title ? { ...payload, slug: slugify(payload.title) } : payload
    if (IS_DEMO) {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...row } : p))
      return { error: null }
    }
    const { error } = await supabase.from('properties').update(row).eq('id', id)
    if (!error) setProperties(prev => prev.map(p => p.id === id ? { ...p, ...row } : p))
    return { error }
  }, [])

  // ── Delete ─────────────────────────────────────────────────────────────
  const remove = useCallback(async (id) => {
    if (IS_DEMO) {
      setProperties(prev => prev.filter(p => p.id !== id))
      return { error: null }
    }
    const { error } = await supabase.from('properties').delete().eq('id', id)
    if (!error) setProperties(prev => prev.filter(p => p.id !== id))
    return { error }
  }, [])

  // ── Toggle publish ─────────────────────────────────────────────────────
  const togglePublish = useCallback(async (id) => {
    const prop = properties.find(p => p.id === id)
    if (!prop) return
    return update(id, { is_published: !prop.is_published })
  }, [properties, update])

  // ── Record a view (analytics) ──────────────────────────────────────────
  const recordView = useCallback(async (propertyId) => {
    if (IS_DEMO) {
      setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, views: (p.views ?? 0) + 1 } : p))
      return
    }
    await supabase.from('analytics').insert({ property_id: propertyId })
    // Also increment cached counter locally
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, views: (p.views ?? 0) + 1 } : p))
  }, [])

  return { properties, loading, error, fetch, create, update, remove, togglePublish, recordView }
}
