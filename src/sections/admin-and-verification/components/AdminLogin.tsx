import { useState } from 'react'

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const NAVY      = 'oklch(0.18 0.055 261)'
const BORDER    = 'oklch(0.91 0.025 258)'
const MUTED     = 'oklch(0.55 0.07 258)'

interface AdminLoginProps {
  onLogin?: (email: string, password: string) => Promise<void> | void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setError(false)
    setIsLoading(true)
    try {
      await onLogin?.(email, password)
    } catch {
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(145deg, ${NAVY} 0%, oklch(0.24 0.08 261) 100%)`,
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 32px 80px rgba(15,30,61,0.5)' }}
      >
        {/* Top accent strip */}
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, oklch(0.68 0.20 24) 100%)` }} />

        <div className="bg-white px-8 py-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: BLUE }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2.5C6.5 2.5 4 4.8 4 7.5C4 11 7 14 9 15.5C11 14 14 11 14 7.5C14 4.8 11.5 2.5 9 2.5Z" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: MUTED }}>
                Admin Portal
              </p>
              <p className="text-sm font-black leading-tight" style={{ color: NAVY }}>
                Family to Family
              </p>
            </div>
          </div>

          <h1 className="text-xl font-black mb-1.5" style={{ color: NAVY }}>Sign in</h1>
          <p className="text-sm mb-7" style={{ color: MUTED }}>
            Administrator access only
          </p>

          {error && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl mb-5 text-sm"
              style={{ backgroundColor: 'oklch(0.97 0.018 28)', color: 'oklch(0.45 0.18 24)' }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
                <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7.5 4.5v3.5M7.5 10v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              Invalid credentials. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@familytofamily.org"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={!email || !password || isLoading}
              className="mt-2 w-full py-3.5 rounded-full font-black text-sm text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed"
              style={{
                backgroundColor: email && password && !isLoading ? BLUE : 'oklch(0.89 0.02 258)',
                color: email && password && !isLoading ? 'white' : MUTED,
                boxShadow: email && password && !isLoading ? `0 6px 22px -4px ${BLUE}50` : 'none',
              }}
              onMouseEnter={e => { if (email && password) e.currentTarget.style.backgroundColor = BLUE_DEEP }}
              onMouseLeave={e => { if (email && password) e.currentTarget.style.backgroundColor = BLUE }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="5.5" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                    <path d="M7.5 2a5.5 5.5 0 0 1 5.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Signing in…
                </span>
              ) : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
