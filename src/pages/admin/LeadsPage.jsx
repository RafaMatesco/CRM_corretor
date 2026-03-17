import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { LEAD_STATUSES, WHATSAPP_NUMBER } from '@/lib/constants'
import { formatDate, initials, whatsappUrl } from '@/lib/utils'
import { useLeads } from '@/hooks/useLeads'

const STATUS_ORDER = Object.keys(LEAD_STATUSES)

export function LeadsPage({ leads, onUpdateStatus, onDelete, showToast }) {
  const [filter, setFilter] = useState('todos')


  const visible = filter === 'todos' ? leads : leads.filter((l) => l.status === filter)

  const handleStatus = async (id, status) => {
    await onUpdateStatus(id, status)
    showToast('Status atualizado!')
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este lead?')) return
    await onDelete(id)
    showToast('Lead removido.')
  }

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-navy">Gestão de Leads</h1>
        <p className="text-sm text-gray-400 mt-1">
          {leads.length} leads · {leads.filter((l) => l.status === 'novo').length} aguardando contato
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={filter === 'todos' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('todos')}
        >
          Todos ({leads.length})
        </Button>
        {STATUS_ORDER.map((s) => {
          const count = leads.filter((l) => l.status === s).length
          if (!count) return null
          return (
            <Button
              key={s}
              variant={filter === s ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(s)}
            >
              {LEAD_STATUSES[s].label} ({count})
            </Button>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Contato', 'Imóvel', 'Mensagem', 'Data', 'Status', 'Ações'].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-5 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((lead) => {
                const st = LEAD_STATUSES[lead.status]
                const waLink = whatsappUrl(`55${lead.phone.replace(/\D/g, '')}`, `Olá ${lead.name.split(' ')[0]}! Vi seu interesse no imóvel "${lead.property_title}". Como posso ajudá-lo?`)
                return (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-cream/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {initials(lead.name)}
                        </div>
                        <div>
                          <p className="font-semibold">{lead.name}</p>
                          <p className="text-xs text-gray-400">{lead.phone}</p>
                          {lead.email && <p className="text-xs text-gray-400">{lead.email}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-500 max-w-[180px]">
                      <p className="truncate">{lead.property_title}</p>
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 max-w-[200px]">
                      {lead.message || <span className="italic">—</span>}
                    </td>
                    <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge color={st?.color ?? 'gray'}>{st?.label}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {/* WhatsApp quick link */}
                        <a href={waLink} target="_blank" rel="noreferrer"
                          className="inline-flex items-center bg-[#25D366] text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-[#1da851] transition-colors">
                          WA
                        </a>
                        {/* Status change */}
                        <select
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-gold"
                          value={lead.status}
                          onChange={(e) => handleStatus(lead.id, e.target.value)}
                        >
                          {STATUS_ORDER.map((s) => (
                            <option key={s} value={s}>{LEAD_STATUSES[s].label}</option>
                          ))}
                        </select>
                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-3">📋</p>
                    <p className="font-semibold">Nenhum lead encontrado.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
