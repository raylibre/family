import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const NAVY      = 'oklch(0.18 0.055 261)'
const BORDER    = 'oklch(0.87 0.03 258)'
const MUTED     = 'oklch(0.55 0.07 258)'

interface SignInModalProps {
  onClose: () => void
}

export function SignInModal({ onClose }: SignInModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-black mb-6" style={{ color: NAVY }}>Sign In</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full px-3 py-2.5 rounded-xl text-sm border-2 outline-none transition-colors"
              style={{ borderColor: BORDER, color: NAVY }}
              onFocus={e => { e.currentTarget.style.borderColor = BLUE }}
              onBlur={e => { e.currentTarget.style.borderColor = BORDER }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: NAVY }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2.5 rounded-xl text-sm border-2 outline-none transition-colors"
              style={{ borderColor: BORDER, color: NAVY }}
              onFocus={e => { e.currentTarget.style.borderColor = BLUE }}
              onBlur={e => { e.currentTarget.style.borderColor = BORDER }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: 'oklch(0.55 0.20 24)' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-black text-white mt-2 transition-colors"
            style={{ backgroundColor: loading ? MUTED : BLUE }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = BLUE_DEEP }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = loading ? MUTED : BLUE }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
