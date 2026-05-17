import { useState } from 'react'
import type { DonationRecord, AdminUser } from '@/../product/sections/admin-and-verification/types'

const BLUE        = 'oklch(0.42 0.175 260)'
const CORAL = 'oklch(0.68 0.20 24)'
const NAVY  = 'oklch(0.18 0.055 261)'
const CREAM       = 'oklch(0.985 0.012 75)'
const BORDER      = 'oklch(0.91 0.025 258)'
const MUTED       = 'oklch(0.55 0.07 258)'
const GREEN       = 'oklch(0.42 0.14 155)'
const GREEN_DEEP  = 'oklch(0.30 0.12 155)'
const GREEN_FAINT = 'oklch(0.93 0.08 155)'
const GOLD        = 'oklch(0.62 0.14 88)'
const GOLD_FAINT  = 'oklch(0.97 0.025 85)'

type FilterTab = 'all' | 'pending' | 'approved' | 'cancelled'

interface DonationsReviewProps {
  donations: DonationRecord[]
  adminUser: AdminUser
  onApproveDonation?: (donationId: string) => void
  onCancelDonation?: (donationId: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function StatusBadge({ status }: { status: DonationRecord['status'] }) {
  const styles: Record<DonationRecord['status'], { bg: string; text: string; label: string }> = {
    pending:   { bg: GOLD_FAINT,   text: GOLD,   label: 'Pending' },
    approved:  { bg: GREEN_FAINT,  text: GREEN,  label: 'Approved' },
    cancelled: { bg: 'oklch(0.97 0.018 28)', text: CORAL, label: 'Cancelled' },
  }
  const s = styles[status]
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  )
}

export function DonationsReview({ donations, adminUser, onApproveDonation, onCancelDonation }: DonationsReviewProps) {
  const [filter, setFilter] = useState<FilterTab>('pending')
  const [localDonations, setLocalDonations] = useState<DonationRecord[]>(donations)
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const counts = {
    all:       localDonations.length,
    pending:   localDonations.filter(d => d.status === 'pending').length,
    approved:  localDonations.filter(d => d.status === 'approved').length,
    cancelled: localDonations.filter(d => d.status === 'cancelled').length,
  }

  const filtered = filter === 'all'
    ? localDonations
    : localDonations.filter(d => d.status === filter)

  function handleApprove(id: string) {
    setProcessingId(id)
    setTimeout(() => {
      setLocalDonations(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' as const } : d))
      setProcessingId(null)
      onApproveDonation?.(id)
    }, 500)
  }

  function handleCancel(id: string) {
    setProcessingId(id)
    setTimeout(() => {
      setLocalDonations(prev => prev.map(d => d.id === id ? { ...d, status: 'cancelled' as const } : d))
      setProcessingId(null)
      onCancelDonation?.(id)
    }, 500)
  }

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all',       label: 'All' },
    { key: 'pending',   label: 'Pending' },
    { key: 'approved',  label: 'Approved' },
    { key: 'cancelled', label: 'Cancelled' },
  ]

  return (
    <div
      className="min-h-screen pb-16"
      style={{ backgroundColor: CREAM, fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Page header */}
      <div
        className="bg-white px-6 sm:px-10 py-6"
        style={{ borderBottom: `1.5px solid ${BORDER}` }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
              Admin Portal
            </p>
            <h1 className="text-xl font-black" style={{ color: NAVY }}>
              Donations Review
            </h1>
          </div>
          {/* Admin badge */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0"
              style={{ backgroundColor: BLUE }}
            >
              {adminUser.avatarInitials}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold leading-tight" style={{ color: NAVY }}>{adminUser.name}</p>
              <p className="text-xs" style={{ color: MUTED }}>{adminUser.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-10 pt-8">

        {/* Summary strip */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ backgroundColor: GOLD_FAINT }}
          >
            <span className="text-lg font-black" style={{ color: GOLD }}>{counts.pending}</span>
            <span className="text-xs font-semibold" style={{ color: GOLD }}>pending</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ backgroundColor: GREEN_FAINT }}
          >
            <span className="text-lg font-black" style={{ color: GREEN }}>{counts.approved}</span>
            <span className="text-xs font-semibold" style={{ color: GREEN }}>approved</span>
          </div>
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ backgroundColor: 'oklch(0.97 0.018 28)' }}
          >
            <span className="text-lg font-black" style={{ color: CORAL }}>{counts.cancelled}</span>
            <span className="text-xs font-semibold" style={{ color: CORAL }}>cancelled</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-2xl" style={{ backgroundColor: 'oklch(0.94 0.02 258)' }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-bold transition-all duration-150"
              style={{
                backgroundColor: filter === tab.key ? 'white' : 'transparent',
                color: filter === tab.key ? NAVY : MUTED,
                boxShadow: filter === tab.key ? '0 2px 8px rgba(15,30,61,0.08)' : 'none',
              }}
            >
              {tab.label}
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full font-black"
                style={{
                  backgroundColor: filter === tab.key
                    ? (tab.key === 'pending' ? GOLD_FAINT : tab.key === 'approved' ? GREEN_FAINT : tab.key === 'cancelled' ? 'oklch(0.97 0.018 28)' : 'oklch(0.93 0.02 258)')
                    : 'oklch(0.89 0.02 258)',
                  color: filter === tab.key
                    ? (tab.key === 'pending' ? GOLD : tab.key === 'approved' ? GREEN : tab.key === 'cancelled' ? CORAL : MUTED)
                    : MUTED,
                }}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Donation list */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 rounded-2xl"
            style={{ backgroundColor: 'white', border: `1.5px dashed ${BORDER}` }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="mb-3 opacity-30">
              <circle cx="20" cy="20" r="18" stroke={NAVY} strokeWidth="2" />
              <path d="M20 12v10M20 26v2" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-semibold" style={{ color: MUTED }}>No {filter} donations</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(donation => (
              <DonationCard
                key={donation.id}
                donation={donation}
                isProcessing={processingId === donation.id}
                onApprove={() => handleApprove(donation.id)}
                onCancel={() => handleCancel(donation.id)}
                onViewScreenshot={url => setLightboxUrl(url)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Screenshot lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(15,30,61,0.80)', backdropFilter: 'blur(6px)' }}
          onClick={() => setLightboxUrl(null)}
        >
          <div className="relative max-w-lg w-full">
            <img
              src={lightboxUrl}
              alt="Transfer proof"
              className="w-full rounded-2xl"
              style={{ boxShadow: '0 32px 80px rgba(15,30,61,0.5)' }}
            />
            <button
              onClick={() => setLightboxUrl(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'white', color: NAVY, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

interface DonationCardProps {
  donation: DonationRecord
  isProcessing: boolean
  onApprove: () => void
  onCancel: () => void
  onViewScreenshot: (url: string) => void
}

function DonationCard({ donation, isProcessing, onApprove, onCancel, onViewScreenshot }: DonationCardProps) {
  const isPending = donation.status === 'pending'

  const amountColor = donation.status === 'approved'
    ? GREEN
    : donation.status === 'cancelled'
      ? MUTED
      : NAVY

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden transition-all duration-150"
      style={{
        boxShadow: isPending
          ? `0 2px 14px rgba(15,30,61,0.08), 0 0 0 1.5px ${GOLD}40`
          : '0 1px 6px rgba(15,30,61,0.06)',
        opacity: isProcessing ? 0.6 : 1,
      }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">

          {/* Amount column */}
          <div className="flex-shrink-0 text-center w-16">
            <p className="text-2xl font-black leading-none" style={{ color: amountColor }}>
              ${donation.amount}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: MUTED }}>
              {donation.currency}
            </p>
            <div className="mt-2">
              <StatusBadge status={donation.status} />
            </div>
          </div>

          {/* Separator */}
          <div className="w-px self-stretch" style={{ backgroundColor: BORDER }} />

          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-base leading-snug" style={{ color: NAVY }}>
                  {donation.familyName}
                </p>
                <p className="text-sm mt-0.5" style={{ color: MUTED }}>
                  {donation.donorName}
                  <span className="mx-1.5 opacity-40">·</span>
                  <span className="text-xs">{donation.donorEmail}</span>
                </p>
                <p className="text-xs mt-1" style={{ color: 'oklch(0.65 0.05 258)' }}>
                  {formatDate(donation.submittedAt)}
                </p>
              </div>

              {/* Screenshot thumbnail */}
              {donation.proofScreenshot && (
                <button
                  onClick={() => onViewScreenshot(donation.proofScreenshot)}
                  className="flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden relative transition-all duration-150 hover:scale-105"
                  style={{ boxShadow: `0 2px 8px rgba(15,30,61,0.15)` }}
                >
                  <img
                    src={donation.proofScreenshot}
                    alt="Proof"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: 'rgba(15,30,61,0.5)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="white" strokeWidth="1.4" />
                      <path d="M9.5 9.5l2.5 2.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                </button>
              )}

              {/* No screenshot indicator */}
              {!donation.proofScreenshot && (
                <div
                  className="flex-shrink-0 w-14 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'oklch(0.94 0.02 258)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke={MUTED} strokeWidth="1.3" strokeOpacity="0.5" />
                    <path d="M4 11L7 7.5L9.5 10L10.5 8.5L12.5 11" stroke={MUTED} strokeWidth="1" strokeOpacity="0.4" strokeLinejoin="round" />
                    <circle cx="5" cy="6.5" r="1" fill={MUTED} fillOpacity="0.4" />
                  </svg>
                </div>
              )}
            </div>

            {/* Note */}
            {donation.note && (
              <div
                className="mt-3 px-3 py-2 rounded-xl text-sm italic leading-relaxed"
                style={{ backgroundColor: 'oklch(0.97 0.012 258)', color: MUTED }}
              >
                "{donation.note}"
              </div>
            )}
          </div>
        </div>

        {/* Action buttons — pending only */}
        {isPending && (
          <div
            className="flex gap-2 mt-4 pt-4"
            style={{ borderTop: `1.5px solid ${BORDER}` }}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5.5" stroke={MUTED} strokeWidth="2" strokeOpacity="0.3" />
                  <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
                </svg>
                Processing…
              </div>
            ) : (
              <>
                <button
                  onClick={onApprove}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-black text-white transition-all duration-150 hover:-translate-y-0.5"
                  style={{ backgroundColor: GREEN, boxShadow: `0 4px 14px -2px ${GREEN}50` }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = GREEN_DEEP }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = GREEN }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Approve
                </button>
                <button
                  onClick={onCancel}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-black transition-all duration-150 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'oklch(0.97 0.018 28)', color: CORAL }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = CORAL; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'oklch(0.97 0.018 28)'; e.currentTarget.style.color = CORAL }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
