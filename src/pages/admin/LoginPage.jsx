import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [showPassword, setShowPassword] = useState(false)
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
        <a href="#" className="flex flex-col items-center leading-none select-none">
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              letterSpacing: '0.18em',
              color: '#1a2644',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Imperium
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 700,
              fontSize: '1.45rem',
              letterSpacing: '0.18em',
              color: '#1a2644',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            Realty
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontWeight: 400,
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              color: '#5a6a8a',
              lineHeight: 1,
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            Negócios Imobiliários
          </span>
        </a>

        <div className="flex flex-col gap-4">
          <Input
            label="E-mail"
            type="email"
            placeholder="corretor@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">Senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border-[1.5px] border-gray-200 font-body text-sm text-navy bg-white focus:outline-none focus:border-gold transition-colors placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
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
