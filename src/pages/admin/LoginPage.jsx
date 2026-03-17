import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) return
    setLoading(true); setError('')
    const { error: err } = await onLogin(email, password)
    if (err) setError(err.message)
    setLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80')",
        backgroundSize: 'cover', backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative bg-white rounded-2xl p-10 w-full max-w-sm shadow-2xl fade-in">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-navy">
            Imo<span className="text-gold">CRM</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">Painel do Corretor</p>
        </div>

        <div className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="corretor@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        <Button variant="primary" size="lg" className="w-full mt-6" onClick={handleSubmit} disabled={loading}>
          <Lock size={15} /> {loading ? 'Entrando…' : 'Entrar no Painel'}
        </Button>

      </div>
    </div>
  )
}
