import { useState, useRef } from 'react'
import { Save, Upload, X, Image, Loader2 } from 'lucide-react'
import { Modal }   from '@/components/ui/Modal'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Toggle }  from '@/components/ui/Toggle'
import { Button }  from '@/components/ui/Button'
import { PROPERTY_TYPES } from '@/lib/constants'
import { useStorage } from '@/hooks/useStorage'

const BLANK = {
  title: '', type: 'Apartamento', location: '', price: '',
  bedrooms: '', bathrooms: '', area: '', parking: '',
  description: '', features: '', is_published: false,
  images: [],
}

export function PropertyForm({ property, onSave, onClose }) {
  const { uploadImage, deleteImage } = useStorage()
  const fileRef = useRef(null)

  const [form, setForm] = useState(() => property
    ? {
        ...property,
        features: Array.isArray(property.features)
          ? property.features.join(', ')
          : property.features,
        images: property.images ?? [],
      }
    : BLANK
  )

  // Track which URLs were added during this session (so we can delete them on cancel)
  const [uploadingCount, setUploadingCount] = useState(0)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.title.trim() && form.location.trim()

  // ── Image upload ────────────────────────────────────────────────────────
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    e.target.value = ''                     // reset so same file can be re-selected

    setUploadingCount((n) => n + files.length)

    const results = await Promise.all(files.map((f) => uploadImage(f)))

    const urls = results
      .filter((r) => !r.error)
      .map((r) => r.url)

    setForm((f) => ({ ...f, images: [...f.images, ...urls] }))
    setUploadingCount((n) => n - files.length)
  }

  const handleRemoveImage = async (url, idx) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }))
    await deleteImage(url)
  }

  // ── Save ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    if (!valid) return
    onSave({
      ...form,
      price:     parseInt(form.price)     || 0,
      bedrooms:  parseInt(form.bedrooms)  || 0,
      bathrooms: parseInt(form.bathrooms) || 0,
      area:      parseInt(form.area)      || 0,
      parking:   parseInt(form.parking)   || 0,
      features: typeof form.features === 'string'
        ? form.features.split(',').map((f) => f.trim()).filter(Boolean)
        : form.features,
    })
  }

  return (
    <Modal
      open
      onClose={onClose}
      title={property ? 'Editar Imóvel' : 'Novo Imóvel'}
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col gap-4">
        <Input label="Título *" placeholder="ex: Apartamento 3 Quartos em Moema" value={form.title} onChange={set('title')} />

        <div className="grid grid-cols-2 gap-3">
          <Select label="Tipo" value={form.type} onChange={set('type')}>
            {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
          </Select>
          <Input label="Preço (R$)" type="number" placeholder="850000" value={form.price} onChange={set('price')} />
        </div>

        <Input label="Localização *" placeholder="ex: Moema, São Paulo – SP" value={form.location} onChange={set('location')} />

        <div className="grid grid-cols-4 gap-3">
          {[['bedrooms','Quartos'],['bathrooms','Banheiros'],['area','Área m²'],['parking','Vagas']].map(([k, l]) => (
            <Input key={k} label={l} type="number" min="0" value={form[k]} onChange={set(k)} />
          ))}
        </div>

        <Textarea label="Descrição" placeholder="Descreva o imóvel…" value={form.description} onChange={set('description')} rows={3} />
        <Input label="Diferenciais (separados por vírgula)" placeholder="Piscina, Academia, Varanda Grill" value={form.features} onChange={set('features')} />

        {/* ── Imagens ──────────────────────────────────────────────── */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Imagens</p>

          {/* Upload button */}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-dark border-2 border-dashed border-gold/40 hover:border-gold/70 rounded-xl px-4 py-3 w-full justify-center transition-colors"
          >
            <Upload size={16} />
            Selecionar imagens do computador
          </button>

          {/* Uploading indicator */}
          {uploadingCount > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <Loader2 size={13} className="animate-spin" />
              Enviando {uploadingCount} imagem(ns)…
            </div>
          )}

          {/* Preview grid */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {form.images.map((url, i) => (
                <div key={url + i} className="relative group rounded-lg overflow-hidden aspect-video bg-cream-dark">
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url, i)}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    title="Remover imagem"
                  >
                    <X size={12} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 bg-gold text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      CAPA
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {form.images.length === 0 && uploadingCount === 0 && (
            <div className="flex flex-col items-center justify-center gap-1 mt-3 py-6 text-gray-300">
              <Image size={28} />
              <p className="text-xs">Nenhuma imagem adicionada</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 pt-4">
          <Toggle
            checked={form.is_published}
            onChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
            label="Publicar no Portal Público"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="gold" onClick={handleSave} disabled={!valid || uploadingCount > 0}>
            <Save size={15} /> Salvar Imóvel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
