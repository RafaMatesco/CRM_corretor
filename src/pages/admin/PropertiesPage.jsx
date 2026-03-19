import { useState } from 'react'
import { Plus, Pencil, Trash2, Search, Eye, Info } from 'lucide-react'
import { PropertyForm } from '@/components/admin/PropertyForm'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { Toggle } from '@/components/ui/Toggle'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatAddress } from '@/lib/utils'
import { PROPERTY_STATUSES } from '@/lib/constants'

export function PropertiesPage({ properties, onCreate, onUpdate, onDelete, onTogglePublish, showToast }) {
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [viewingDetails, setViewingDetails] = useState(null)

  const filtered = properties.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (data) => {
    if (editing) {
      await onUpdate(editing.id, data)
      showToast('Imóvel atualizado!')
    } else {
      await onCreate(data)
      showToast('Imóvel cadastrado!')
    }
    setShowForm(false); setEditing(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este imóvel?')) return
    await onDelete(id)
    showToast('Imóvel removido.')
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Gestão de Imóveis</h1>
          <p className="text-sm text-gray-400 mt-1">
            {properties.length} cadastrados · {properties.filter((p) => p.is_published).length} publicados
          </p>
        </div>
        <Button variant="gold" onClick={() => { setEditing(null); setShowForm(true) }}>
          <Plus size={16} /> Novo Imóvel
        </Button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Search bar */}
        <div className="px-5 py-3 border-b border-gray-100">
          <div className="relative max-w-xs">
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg border-[1.5px] border-gray-200 text-sm focus:outline-none focus:border-gold transition-colors"
              placeholder="Buscar imóveis…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Imóvel', 'Tipo', 'Status', 'Preço', 'Detalhes', 'Views', 'Portal', 'Ações'].map((h) => (
                  <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-cream/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]} alt="" className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-navy">{p.title}</p>
                        <p className="text-xs text-gray-400">{formatAddress(p)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge color="gray">{p.type}</Badge></td>
                  <td className="px-4 py-3">
                    {(() => { const s = PROPERTY_STATUSES[p.status ?? 'disponivel']; return <Badge color={s.color}>{s.label}</Badge> })()}
                  </td>
                  <td className="px-4 py-3 font-display font-semibold text-navy">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <button
                      title="Ver Detalhes"
                      onClick={() => setViewingDetails(p)}
                      className="p-1.5 rounded-md hover:bg-cream-dark text-gray-400 hover:text-navy transition-colors flex items-center justify-center w-8 h-8"
                    >
                      <Info size={16} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye size={12} /> {p.views ?? 0}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge color={p.is_published ? 'green' : 'gray'}>
                      {p.is_published ? 'Publicado' : 'Rascunho'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Toggle checked={p.is_published} onChange={() => onTogglePublish(p.id)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        title="Editar"
                        onClick={() => { setEditing(p); setShowForm(true) }}
                        className="p-1.5 rounded-lg hover:bg-cream-dark text-gray-400 hover:text-navy transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        title="Excluir"
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-3">🏠</p>
                    <p className="font-semibold">Nenhum imóvel encontrado.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <PropertyForm
          property={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null) }}
        />
      )}

      {viewingDetails && (
        <Modal
          open
          onClose={() => setViewingDetails(null)}
          title="Detalhes do Imóvel"
          maxWidth="max-w-md"
        >
          <div className="flex flex-col gap-4 text-sm text-gray-600">
            {/* Proprietário */}
            <div>
              <p className="font-semibold text-navy mb-1 text-xs uppercase tracking-wide">Proprietário</p>
              <div className="bg-cream-dark p-3 rounded-lg flex flex-col gap-1">
                <p><strong>Nome:</strong> {viewingDetails.owner_name || 'Não informado'}</p>
                <p className="flex items-center justify-between"> <div><strong>Contato:</strong> {viewingDetails.owner_phone || 'Não informado'}</div> {viewingDetails.owner_phone && (
                  <a
                    href={`https://wa.me/${viewingDetails.owner_phone ?? '5511999999999'}?`}
                    target="_blank" rel="noreferrer"
                    className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-l shadow-lg hover:scale-110 transition-transform z-50"
                    aria-label="WhatsApp"
                  >
                    💬
                  </a>
                )}</p>


              </div>
            </div>

            {/* Estrutura */}
            <div>
              <p className="font-semibold text-navy mb-1 text-xs uppercase tracking-wide">Estrutura</p>
              <div className="grid grid-cols-2 gap-2 bg-cream p-3 rounded-lg">
                <p><strong>Quartos:</strong> {viewingDetails.bedrooms}</p>
                <p><strong>Banheiros:</strong> {viewingDetails.bathrooms}</p>
                <p><strong>Vagas:</strong> {viewingDetails.parking}</p>
                <p><strong>Área Útil:</strong> {viewingDetails.area}m²</p>
                <p><strong>Terreno:</strong> {viewingDetails.land_area}m²</p>
              </div>
            </div>

            {/* Valores */}
            <div>
              <p className="font-semibold text-navy mb-1 text-xs uppercase tracking-wide">Valores Adicionais</p>
              <div className="grid grid-cols-2 gap-2 bg-cream p-3 rounded-lg">
                <p><strong>Condomínio:</strong> {viewingDetails.condominium ? formatPrice(viewingDetails.condominium) : '-'}</p>
                <p><strong>IPTU:</strong> {viewingDetails.iptu ? formatPrice(viewingDetails.iptu) : '-'}</p>
              </div>
            </div>

            {/* Atualização */}
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
              <span>Última atualização:</span>
              <span className="font-medium text-gray-600">
                {viewingDetails.updated_at ? new Date(viewingDetails.updated_at).toLocaleString('pt-BR') : 'Desconhecida'}
              </span>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="ghost" onClick={() => setViewingDetails(null)}>Fechar</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
