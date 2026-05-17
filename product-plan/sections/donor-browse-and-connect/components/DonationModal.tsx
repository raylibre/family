import { useState, useRef } from 'react'
import type { Family } from '@/../product/sections/donor-browse-and-connect/types'

const BLUE       = 'oklch(0.42 0.175 260)'
const CORAL      = 'oklch(0.68 0.20 24)'
const CORAL_DEEP = 'oklch(0.55 0.20 24)'
const NAVY       = 'oklch(0.18 0.055 261)'
const CREAM      = 'oklch(0.985 0.012 75)'
const BORDER     = 'oklch(0.91 0.025 258)'

// Shown as a placeholder — real card number comes from backend per family
const DEMO_CARD = '4149 6501 0001 2345'

interface DonationModalProps {
  family: Family
  amount: number
  onClose: () => void
  onConfirm?: (familyId: string, amount: number, note?: string) => void
}

type Step = 'instructions' | 'confirm' | 'success'

export function DonationModal({
  family, amount, onClose, onConfirm,
}: DonationModalProps) {
  const [step, setStep] = useState<Step>('instructions')
  const [confirmAmount, setConfirmAmount] = useState(String(amount))
  const [note, setNote] = useState('')
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function copyCard() {
    navigator.clipboard.writeText(DEMO_CARD).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  function handleConfirm() {
    onConfirm?.(family.id, Number(confirmAmount) || amount, note || undefined)
    setStep('success')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(15,30,61,0.60)', backdropFilter: 'blur(5px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: 'white',
          maxHeight: '92vh',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-start justify-between px-6 pt-6 pb-5"
          style={{ borderBottom: `1.5px solid ${BORDER}` }}
        >
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-0.5"
              style={{ color: 'oklch(0.55 0.07 258)' }}
            >
              {step === 'success' ? '✓ Done' : 'Donate to'}
            </p>
            <h2 className="text-lg font-black" style={{ color: NAVY }}>
              {family.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-3"
            style={{ backgroundColor: 'oklch(0.94 0.02 258)', color: 'oklch(0.48 0.07 258)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.88 0.03 258)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'oklch(0.94 0.02 258)' }}
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">

          {/* ── SUCCESS ── */}
          {step === 'success' && (
            <div className="flex flex-col items-center text-center gap-5 py-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'oklch(0.93 0.10 155)' }}
              >
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5 13l6 6 10-10" stroke="oklch(0.42 0.14 155)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-lg font-black" style={{ color: NAVY }}>Thank you for your support!</p>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: 'oklch(0.48 0.07 258)' }}>
                  Your donation is recorded and pending admin review. The jar will update once approved — usually within 24 hours.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 1: Card + Instructions ── */}
          {step === 'instructions' && (
            <>
              {/* Amount badge */}
              <div
                className="self-start px-4 py-1.5 rounded-full text-base font-black"
                style={{ backgroundColor: 'oklch(0.95 0.025 258)', color: NAVY }}
              >
                ${amount}
              </div>

              <div className="flex flex-col gap-4">
                {/* Step 1 */}
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: BLUE }}
                  >
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>Copy the card number</p>
                    <p className="text-xs mt-0.5" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      Use it in your banking app to send the money directly to the family
                    </p>
                  </div>
                </div>

                {/* Card number box */}
                <div
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5"
                  style={{ backgroundColor: CREAM, border: `1.5px solid ${BORDER}` }}
                >
                  <span
                    className="text-xl font-black tracking-widest"
                    style={{ color: NAVY, letterSpacing: '0.12em' }}
                  >
                    {DEMO_CARD}
                  </span>
                  <button
                    onClick={copyCard}
                    className="ml-3 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex-shrink-0"
                    style={{
                      backgroundColor: copied ? 'oklch(0.93 0.10 155)' : 'oklch(0.95 0.025 258)',
                      color: copied ? 'oklch(0.42 0.14 155)' : BLUE,
                    }}
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: BLUE }}
                  >
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>
                      Transfer ${amount} via your banking app
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      We never handle funds — this is a direct card-to-card transfer to the family
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 items-start">
                  <div
                    className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: BLUE }}
                  >
                    3
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>Come back and confirm below</p>
                    <p className="text-xs mt-0.5" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      Your donation is logged and reviewed — the jar updates once approved
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2: Confirmation form ── */}
          {step === 'confirm' && (
            <>
              {/* Amount field */}
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: NAVY }}>
                  Amount you sent (USD)
                </label>
                <div
                  className="flex items-center rounded-xl px-4 py-3 transition-colors"
                  style={{ border: `1.5px solid ${BORDER}` }}
                >
                  <span className="text-sm mr-2" style={{ color: 'oklch(0.55 0.07 258)' }}>$</span>
                  <input
                    type="number"
                    value={confirmAmount}
                    onChange={e => setConfirmAmount(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-sm font-bold"
                    style={{ color: NAVY, fontFamily: "'DM Sans', sans-serif" }}
                    min="1"
                  />
                </div>
              </div>

              {/* Screenshot upload */}
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: NAVY }}>
                  Screenshot{' '}
                  <span className="font-normal" style={{ color: 'oklch(0.55 0.07 258)' }}>(optional)</span>
                </label>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full rounded-xl px-4 py-3.5 text-sm font-medium text-left transition-colors"
                  style={{
                    border: `1.5px dashed oklch(0.87 0.03 258)`,
                    color: 'oklch(0.55 0.07 258)',
                    backgroundColor: 'oklch(0.985 0.012 75)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'oklch(0.87 0.03 258)'; e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
                >
                  + Upload transfer screenshot
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" />
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: NAVY }}>
                  Note{' '}
                  <span className="font-normal" style={{ color: 'oklch(0.55 0.07 258)' }}>(optional)</span>
                </label>
                <textarea
                  placeholder="Add a note about your transfer…"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 text-sm resize-none outline-none"
                  style={{
                    border: `1.5px solid ${BORDER}`,
                    color: NAVY,
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: 'white',
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* ── Footer actions ── */}
        <div
          className="px-6 pb-6 pt-4 flex flex-col gap-2.5"
          style={{ borderTop: `1.5px solid ${BORDER}` }}
        >
          {step === 'success' ? (
            <button
              onClick={onClose}
              className="w-full py-4 rounded-full font-black text-base text-white transition-all"
              style={{ backgroundColor: BLUE }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.30 0.14 260)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE }}
            >
              Close
            </button>
          ) : step === 'instructions' ? (
            <button
              onClick={() => setStep('confirm')}
              className="w-full py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: CORAL, boxShadow: `0 6px 22px -4px ${CORAL}55` }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = CORAL_DEEP }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = CORAL }}
            >
              I've sent the money →
            </button>
          ) : (
            <>
              <button
                onClick={handleConfirm}
                className="w-full py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: CORAL, boxShadow: `0 6px 22px -4px ${CORAL}55` }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = CORAL_DEEP }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = CORAL }}
              >
                Submit confirmation
              </button>
              <button
                onClick={() => setStep('instructions')}
                className="text-sm font-semibold text-center transition-colors"
                style={{ color: 'oklch(0.55 0.07 258)' }}
                onMouseEnter={e => { e.currentTarget.style.color = BLUE }}
                onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
              >
                ← Back
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
