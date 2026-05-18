import { AuthButton } from './AuthButton'
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
            className="group"
          >
            <img
              src="/famtofam.png"
              alt="Family to Family"
              className="h-9 w-auto rounded-xl shadow-sm object-contain transition-opacity group-hover:opacity-75"
            />
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLocale}
              className="flex items-center px-3 py-1.5 text-xs font-semibold tracking-widest uppercase rounded-full border-2 transition-all duration-150"
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

            <AuthButton
              user={user}
              locale={locale}
              onNavigateAdmin={onNavigateAdmin}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  )
}
