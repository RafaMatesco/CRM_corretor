import { useCallback } from 'react'
import { supabase, IS_DEMO } from '@/lib/supabase'

const BUCKET = 'property-images'

export function useStorage() {
  /**
   * Upload a File object to Supabase Storage.
   * Returns { url, error }.
   */
  const uploadImage = useCallback(async (file) => {
    if (IS_DEMO) {
      // In demo mode return a placeholder URL immediately
      return { url: URL.createObjectURL(file), error: null }
    }

    const ext  = file.name.split('.').pop()
    const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false })

    if (uploadError) return { url: null, error: uploadError }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return { url: data.publicUrl, error: null }
  }, [])

  /**
   * Delete an image from Storage given its full public URL.
   * Returns { error }.
   */
  const deleteImage = useCallback(async (url) => {
    if (IS_DEMO || !url) return { error: null }

    // Extract the path after the bucket name in the URL
    const marker = `/${BUCKET}/`
    const idx    = url.indexOf(marker)
    if (idx === -1) return { error: null }
    const path = url.slice(idx + marker.length)

    const { error } = await supabase.storage.from(BUCKET).remove([path])
    return { error }
  }, [])

  return { uploadImage, deleteImage }
}
