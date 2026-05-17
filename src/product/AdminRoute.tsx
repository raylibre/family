import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AppShell } from '../shell/components/AppShell'
import { AdminLogin } from '../sections/admin-and-verification/components/AdminLogin'
import { DonationsReview } from '../sections/admin-and-verification/components/DonationsReview'
import { useAuth } from '../hooks/useAuth'
import type { DonationRecord, AdminUser } from '@/../product/sections/admin-and-verification/types'

const BLUE = 'oklch(0.42 0.175 260)'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')
}

export function AdminRoute() {
  const navigate = useNavigate()
  const { user, loading: authLoading, signOut } = useAuth()
  const [donations, setDonations] = useState<DonationRecord[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    if (user?.role === 'admin') {
      loadDonations()
    }
  }, [user?.role])

  async function loadDonations() {
    setDataLoading(true)
    const { data, error } = await supabase
      .from('donations')
      .select('*, family_profiles(family_name)')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setDonations(
        data.map(row => ({
          id: row.id,
          familyId: row.family_id,
          familyName: (row.family_profiles as { family_name?: string } | null)?.family_name ?? 'Unknown Family',
          donorName: row.donor_name ?? '',
          donorEmail: row.donor_email ?? '',
          amount: row.amount,
          currency: row.currency ?? 'USD',
          status: row.status === 'rejected' ? 'cancelled' : row.status as DonationRecord['status'],
          submittedAt: row.created_at,
          note: row.note ?? '',
          proofScreenshot: row.proof_screenshot ?? '',
        }))
      )
    }
    setDataLoading(false)
  }

  async function handleLogin(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function handleApproveDonation(donationId: string) {
    await supabase.from('donations').update({ status: 'approved' }).eq('id', donationId)
  }

  async function handleCancelDonation(donationId: string) {
    await supabase.from('donations').update({ status: 'rejected' }).eq('id', donationId)
  }

  if (authLoading) return <LoadingState />

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  const adminUser: AdminUser = {
    id: '',
    name: user.name ?? '',
    email: user.email ?? '',
    role: 'admin',
    avatarInitials: getInitials(user.name ?? ''),
  }

  return (
    <AppShell
      user={user}
      onNavigateHome={() => navigate('/')}
      onNavigateAdmin={() => navigate('/admin')}
      onLogout={signOut}
    >
      {dataLoading ? (
        <LoadingState />
      ) : (
        <DonationsReview
          donations={donations}
          adminUser={adminUser}
          onApproveDonation={handleApproveDonation}
          onCancelDonation={handleCancelDonation}
        />
      )}
    </AppShell>
  )
}

function LoadingState() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-4"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: `${BLUE}30`, borderTopColor: BLUE }}
      />
    </div>
  )
}
