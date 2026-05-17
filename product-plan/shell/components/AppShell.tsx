import { useEffect } from 'react'
import { UserMenu } from './UserMenu'
import type { UserMenuUser } from './UserMenu'

export type Locale = 'uk' | 'en'

export interface AppShellProps {
  children: React.ReactNode
  user?: UserMenuUser
  locale?: Locale
  onLocaleChange?: (locale: Locale) => void
  onNavigateHome?: () => void
  onNavigateAdmin?: () => void
  onLogout?: () => void
}

export function AppShell({
  children,
  user,
  locale = 'uk',
  onLocaleChange,
  onNavigateHome,
  onNavigateAdmin,
  onLogout,
}: AppShellProps) {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  function toggleLocale() {
    onLocaleChange?.(locale === 'uk' ? 'en' : 'uk')
  }

  return (
    <div
      className="min-h-screen bg-background"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2" style={{ borderColor: 'oklch(0.42 0.175 260)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'oklch(0.42 0.175 260)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2C6 2 3.5 4.5 3.5 7.5C3.5 11 6.5 14 9 16C11.5 14 14.5 11 14.5 7.5C14.5 4.5 12 2 9 2Z"
                  fill="white"
                  opacity="0.85"
                />
                <path
                  d="M9 5.5C7.2 5.5 5.5 7 5.5 8.8C5.5 10.5 7.2 12 9 13C10.8 12 12.5 10.5 12.5 8.8C12.5 7 10.8 5.5 9 5.5Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              className="text-sm font-bold transition-opacity group-hover:opacity-70"
              style={{ color: 'oklch(0.18 0.055 261)', fontFamily: "'DM Sans', sans-serif" }}
            >
              Family to Family
            </span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle — hidden on mobile */}
            <button
              onClick={toggleLocale}
              className="hidden sm:flex items-center px-3 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border-2 transition-all duration-150"
              style={{
                borderColor: 'oklch(0.42 0.175 260)',
                color: 'oklch(0.42 0.175 260)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'oklch(0.42 0.175 260)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'white'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'oklch(0.42 0.175 260)'
              }}
            >
              {locale === 'uk' ? 'EN' : 'UA'}
            </button>

            {user ? (
              <UserMenu
                user={user}
                onNavigateAdmin={user.role === 'admin' ? onNavigateAdmin : undefined}
                onLogout={onLogout}
              />
            ) : (
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: 'oklch(0.87 0.03 258)' }} />
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
