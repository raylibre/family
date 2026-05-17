import { useState, useRef, useEffect } from 'react'
import { LogOut, ShieldCheck, ChevronDown } from 'lucide-react'

export interface UserMenuUser {
  name: string
  email?: string
  avatarUrl?: string
  role?: 'admin' | 'family' | 'donor'
}

interface UserMenuProps {
  user: UserMenuUser
  onNavigateAdmin?: () => void
  onLogout?: () => void
}

const BLUE = 'oklch(0.42 0.175 260)'
const BLUE_LIGHT = 'oklch(0.94 0.035 258)'
const NAVY = 'oklch(0.18 0.055 261)'

function Avatar({ user }: { user: UserMenuUser }) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('')
    .toUpperCase()

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-8 h-8 rounded-full object-cover"
      />
    )
  }

  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{ backgroundColor: BLUE }}
    >
      <span className="text-xs font-bold text-white">{initials}</span>
    </div>
  )
}

export function UserMenu({ user, onNavigateAdmin, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_LIGHT)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Avatar user={user} />
        <span
          className="hidden sm:block text-sm font-medium max-w-[120px] truncate"
          style={{ color: NAVY }}
        >
          {user.name}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          style={{ color: BLUE }}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-1 w-52 bg-white rounded-2xl shadow-xl py-1 z-50"
          style={{ border: `1.5px solid ${BLUE_LIGHT}` }}
        >
          <div className="px-3 py-2.5">
            <p className="text-sm font-bold truncate" style={{ color: NAVY, fontFamily: "'DM Sans', sans-serif" }}>
              {user.name}
            </p>
            {user.email && (
              <p className="text-xs truncate mt-0.5" style={{ color: 'oklch(0.55 0.07 258)', fontFamily: "'DM Sans', sans-serif" }}>
                {user.email}
              </p>
            )}
          </div>

          {user.role === 'admin' && onNavigateAdmin && (
            <>
              <div className="h-px mx-2 my-1" style={{ backgroundColor: BLUE_LIGHT }} />
              <button
                onClick={() => { onNavigateAdmin(); setOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = BLUE_LIGHT)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <ShieldCheck size={15} style={{ color: BLUE }} className="flex-shrink-0" />
                Admin Panel
              </button>
            </>
          )}

          <div className="h-px mx-2 my-1" style={{ backgroundColor: BLUE_LIGHT }} />
          <button
            onClick={() => { onLogout?.(); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif", color: 'oklch(0.55 0.07 258)' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'oklch(0.97 0.005 75)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <LogOut size={15} className="flex-shrink-0" />
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
