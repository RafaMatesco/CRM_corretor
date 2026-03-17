import { useState } from 'react'
import { Save } from 'lucide-react'
import { Modal }   from '@/components/ui/Modal'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Toggle }  from '@/components/ui/Toggle'
import { Button }  from '@/components/ui/Button'
import { PROPERTY_TYPES, PLACEHOLDER_IMAGES } from '@/lib/constants'

const BLANK = {
  title: '', type: 'Apartamento', location: '', price: '',
  bedrooms: '', bathrooms: '', area: '', parking: '',
  description: '', features: '', is_published: false,
  images: [PLACEHOLDER_IMAGES[0], PLACEHOLDER_IMAGES[1], PLACEHOLDER_IMAGES[2]],
}

export function PropertyForm({ property, onSave, onClose }) {
  const [form, setForm] = useState(() => property
    ? { ...property, features: Array.isArray(property.features) ? property.features.join(', ') : property.features }
    : BLANK
  )

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.title.trim() && form.location.trim()

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

        <div className="border-t border-gray-100 pt-4">
          <Toggle
            checked={form.is_published}
            onChange={(v) => setForm((f) => ({ ...f, is_published: v }))}
            label="Publicar no Portal Público"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="gold" onClick={handleSave} disabled={!valid}>
            <Save size={15} /> Salvar Imóvel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
