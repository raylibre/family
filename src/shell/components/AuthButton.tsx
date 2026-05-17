import { useState } from 'react'
import { UserMenu } from './UserMenu'
import { SignInModal } from './SignInModal'
import type { UserMenuUser } from './UserMenu'
import type { Locale } from './AppShell'

const BLUE = 'oklch(0.42 0.175 260)'

interface AuthButtonProps {
  user?: UserMenuUser
  locale?: Locale
  onNavigateAdmin?: () => void
  onLogout?: () => void
}

export function AuthButton({ user, locale = 'uk', onNavigateAdmin, onLogout }: AuthButtonProps) {
  const [showSignIn, setShowSignIn] = useState(false)

  if (user) {
    return (
      <UserMenu
        user={user}
        onNavigateAdmin={user.role === 'admin' ? onNavigateAdmin : undefined}
        onLogout={onLogout}
      />
    )
  }

  return (
    <>
      <button
        onClick={() => setShowSignIn(true)}
        className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full border-2 transition-all duration-150"
        style={{ borderColor: BLUE, color: BLUE }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = BLUE
          e.currentTarget.style.color = 'white'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = BLUE
        }}
      >
        {locale === 'uk' ? 'Увійти як донатер' : 'Sign In as Donor'}
      </button>
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
    </>
  )
}
