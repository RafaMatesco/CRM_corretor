import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Modal }    from '@/components/ui/Modal'
import { Input, Textarea } from '@/components/ui/Input'
import { Button }   from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

export function LeadModal({ property, onClose, onSubmit }) {
  const [form, setForm]       = useState({ name: '', phone: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.name.trim() && form.phone.trim()

  const handleSubmit = async () => {
    if (!valid) return
    setLoading(true)
    await onSubmit({ ...form, property_id: property.id, property_title: property.title })
    setLoading(false)
    setDone(true)
  }

  if (done) return (
    <Modal open onClose={onClose} title="">
      <div className="flex flex-col items-center text-center py-6 gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="font-display text-2xl font-semibold">Interesse Registrado!</h3>
        <p className="text-gray-500 text-sm max-w-xs">
          O corretor recebeu sua mensagem e entrará em contato em breve.
        </p>
        <Button variant="gold" size="lg" onClick={onClose}>Fechar</Button>
      </div>
    </Modal>
  )

  return (
    <Modal
      open
      onClose={onClose}
      title="Tenho Interesse"
      subtitle={`${property.title} — ${formatPrice(property.price)}`}
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input label="Nome completo *" placeholder="Seu nome"         value={form.name}    onChange={set('name')}    />
          <Input label="WhatsApp *"      placeholder="(11) 9xxxx-xxxx"  value={form.phone}   onChange={set('phone')}   />
        </div>
        <Input label="E-mail (opcional)" type="email" placeholder="seu@email.com" value={form.email} onChange={set('email')} />
        <Textarea label="Mensagem (opcional)" placeholder="Melhor horário, forma de pagamento..." value={form.message} onChange={set('message')} rows={3} />

        <Button variant="gold" size="lg" className="w-full mt-1" onClick={handleSubmit} disabled={!valid || loading}>
          {loading ? 'Enviando…' : '📩 Enviar meu interesse'}
        </Button>
        <p className="text-center text-xs text-gray-400">Seus dados são usados apenas para contato. Sem spam.</p>
      </div>
    </Modal>
  )
}
