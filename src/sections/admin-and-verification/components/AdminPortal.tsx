import { useState, useEffect } from 'react'
import type { AdminAndVerificationProps } from '@/../product/sections/admin-and-verification/types'
import { AdminLogin } from './AdminLogin'
import { DonationsReview } from './DonationsReview'

type View = 'login' | 'donations'

export function AdminPortal({
  adminUser,
  donations,
  onLogin,
  onApproveDonation,
  onCancelDonation,
}: AdminAndVerificationProps) {
  const [view, setView] = useState<View>('login')

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  function handleLogin(email: string, password: string) {
    onLogin?.(email, password)
    setView('donations')
  }

  if (view === 'login') {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <DonationsReview
      donations={donations}
      adminUser={adminUser}
      onApproveDonation={onApproveDonation}
      onCancelDonation={onCancelDonation}
    />
  )
}
