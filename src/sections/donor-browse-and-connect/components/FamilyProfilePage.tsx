import { useState } from 'react'
import type { Family, DonorCategory, Locale } from '@/../product/sections/donor-browse-and-connect/types'
import { DonationJar } from './DonationJar'
import { DonationModal } from './DonationModal'

const PALETTES: Record<string, { solid: string; faint: string; tagText: string; textOnSolid: string }> = {
  disability: { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.95 0.022 258)', tagText: 'oklch(0.30 0.14 260)', textOnSolid: 'white' },
  died:       { solid: 'oklch(0.68 0.20 24)',   faint: 'oklch(0.97 0.018 28)',  tagText: 'oklch(0.42 0.18 24)',  textOnSolid: 'white' },
  missing:    { solid: 'oklch(0.50 0.13 205)',  faint: 'oklch(0.95 0.022 200)', tagText: 'oklch(0.32 0.11 200)', textOnSolid: 'white' },
  prisoner:   { solid: 'oklch(0.50 0.15 65)',   faint: 'oklch(0.96 0.022 65)',  tagText: 'oklch(0.32 0.12 65)',  textOnSolid: 'white' },
  active:     { solid: 'oklch(0.83 0.18 88)',   faint: 'oklch(0.97 0.025 85)',  tagText: 'oklch(0.45 0.14 88)',  textOnSolid: 'oklch(0.18 0.055 261)' },
}
const FALLBACK = { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.95 0.022 258)', tagText: 'oklch(0.30 0.14 260)', textOnSolid: 'white' }

const NAVY  = 'oklch(0.18 0.055 261)'
const CORAL = 'oklch(0.68 0.20 24)'

function ageLabel(age: number, locale: Locale): string {
  if (locale === 'uk') {
    if (age === 1) return 'рік'
    if (age >= 2 && age <= 4) return 'роки'
    return 'років'
  }
  return age === 1 ? 'year old' : 'years old'
}

interface Props {
  family: Family
  categories: DonorCategory[]
  locale: Locale
  onBack: () => void
  onDonate?: (familyId: string, amount: number, note?: string) => void
}

export function FamilyProfilePage({ family, categories, locale, onBack, onDonate }: Props) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [imgError, setImgError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const p = PALETTES[family.categoryId] ?? FALLBACK
  const category = categories.find(c => c.id === family.categoryId)
  const remaining = Math.max(0, family.monthlyTarget - family.currentlyFunded)
  const fullyFunded = remaining === 0
  const pct = Math.min(100, Math.round((family.currentlyFunded / family.monthlyTarget) * 100))

  const displayTitle = family.childName
    ? `${family.childName}${family.childAge != null ? `, ${family.childAge} ${ageLabel(family.childAge, locale)}` : ''}`
    : family.name

  const categoryTitle = category ? category.title[locale] : null

  const paragraphs = family.story[locale]
    .split('\n\n')
    .map(s => s.trim())
    .filter(Boolean)

  const hasMessenger = family.whatsapp || family.signal || family.viber

  return (
    <div
      className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="self-start flex items-center gap-1.5 text-sm font-semibold transition-colors"
        style={{ color: 'oklch(0.55 0.07 258)' }}
        onMouseEnter={e => { e.currentTarget.style.color = p.solid }}
        onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
      >
        ← {locale === 'uk' ? 'Назад до переліку сімей' : 'Back to families'}
      </button>

      {/* Hero image */}
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
        {imgError ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${p.faint} 0%, ${p.solid}18 100%)` }}
          >
            <span className="text-8xl font-black select-none" style={{ color: `${p.solid}18` }}>
              {family.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        ) : (
          <img
            src={family.photo}
            alt={displayTitle}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}

        {/* Gradient overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,20,50,0.72) 0%, rgba(10,20,50,0.15) 55%, transparent 100%)' }}
        />

        {/* Category badge */}
        {categoryTitle && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: p.solid, color: p.textOnSolid }}
          >
            {categoryTitle}
          </div>
        )}

        {/* Name overlay */}
        <div className="absolute bottom-5 left-5 right-5">
          <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-lg">
            {displayTitle}
          </h1>
        </div>
      </div>

      {/* Need tags */}
      {family.needs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {family.needs.map(need => (
            <span
              key={need.id}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{ backgroundColor: p.faint, color: p.tagText }}
            >
              {need.label[locale]}
            </span>
          ))}
        </div>
      )}

      {/* Story */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-black" style={{ color: NAVY }}>
          {locale === 'uk' ? 'Наша історія' : 'Our story'}
        </h2>
        <div className="flex flex-col gap-4">
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: 'oklch(0.35 0.055 261)' }}>
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ backgroundColor: 'oklch(0.91 0.02 258)' }} />

      {/* Donation section */}
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-lg font-black" style={{ color: NAVY }}>
          {locale === 'uk' ? 'Підтримати родину' : 'Support this family'}
        </h2>

        <div className="flex flex-col items-center gap-2">
          <DonationJar pct={pct} label={`${pct}%`} sublabel={locale === 'uk' ? 'покрито' : 'covered'} width={72} height={104} />
          <p className="text-sm font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>
            ${family.currentlyFunded}
            <span style={{ color: 'oklch(0.72 0.04 258)' }}> / ${family.monthlyTarget} {locale === 'uk' ? 'на місяць' : 'per month'}</span>
          </p>
        </div>

        {fullyFunded ? (
          <div
            className="px-8 py-3 rounded-full text-sm font-bold"
            style={{ backgroundColor: 'oklch(0.93 0.10 155)', color: 'oklch(0.35 0.14 155)' }}
          >
            ✓ {locale === 'uk' ? 'Повністю покрито цього місяця' : 'Fully covered this month'}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <div className="flex gap-2 flex-wrap justify-center">
              {[10, 25, 50].map(amt => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(selectedAmount === amt ? null : amt)}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-150"
                  style={{
                    backgroundColor: selectedAmount === amt ? NAVY : 'oklch(0.93 0.02 258)',
                    color: selectedAmount === amt ? 'white' : 'oklch(0.35 0.07 258)',
                  }}
                >
                  ${amt}
                </button>
              ))}
              <button
                onClick={() => setSelectedAmount(selectedAmount === remaining ? null : remaining)}
                className="px-5 py-2 rounded-full text-sm font-bold transition-all duration-150"
                style={{
                  backgroundColor: selectedAmount === remaining ? p.solid : p.faint,
                  color: selectedAmount === remaining ? p.textOnSolid : p.tagText,
                }}
              >
                {locale === 'uk' ? 'Заповнити' : 'Fill the jar'} (${remaining})
              </button>
            </div>

            <button
              onClick={() => { if (selectedAmount) setShowModal(true) }}
              disabled={!selectedAmount}
              className="w-full py-3.5 rounded-full font-black text-base transition-all duration-200 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selectedAmount ? CORAL : 'oklch(0.89 0.02 258)',
                color: selectedAmount ? 'white' : 'oklch(0.62 0.05 258)',
                boxShadow: selectedAmount ? `0 6px 20px -4px ${CORAL}55` : 'none',
              }}
              onMouseEnter={e => { if (selectedAmount) e.currentTarget.style.backgroundColor = 'oklch(0.55 0.20 24)' }}
              onMouseLeave={e => { if (selectedAmount) e.currentTarget.style.backgroundColor = CORAL }}
            >
              {locale === 'uk' ? 'Підтримати' : 'Donate'}{selectedAmount ? ` $${selectedAmount}` : ''}
            </button>
          </div>
        )}
      </div>

      {/* Messenger contact */}
      <div className="h-px" style={{ backgroundColor: 'oklch(0.91 0.02 258)' }} />

      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-black" style={{ color: NAVY }}>
            {locale === 'uk' ? 'Написати родині' : 'Contact the family'}
          </h2>
          <p className="text-sm mt-1" style={{ color: 'oklch(0.48 0.07 258)' }}>
            {locale === 'uk'
              ? 'Ви можете напряму звʼязатися з родиною через один із месенджерів.'
              : 'You can contact the family directly via one of the messengers below.'}
          </p>
        </div>

        {hasMessenger ? (
          <div className="flex flex-wrap gap-3">
            {family.whatsapp && (
              <a
                href={`https://wa.me/${family.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ backgroundColor: 'oklch(0.55 0.17 152)', color: 'white' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            )}
            {family.viber && (
              <a
                href={`viber://chat?number=${family.viber.replace(/\D/g, '')}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ backgroundColor: 'oklch(0.48 0.18 300)', color: 'white' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <ViberIcon /> Viber
              </a>
            )}
            {family.signal && (
              <a
                href={`https://signal.me/#p/${family.signal}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                style={{ backgroundColor: 'oklch(0.42 0.175 260)', color: 'white' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <SignalIcon /> Signal
              </a>
            )}
          </div>
        ) : (
          <div
            className="px-5 py-4 rounded-xl text-sm"
            style={{ backgroundColor: 'oklch(0.96 0.015 258)', color: 'oklch(0.55 0.07 258)' }}
          >
            {locale === 'uk'
              ? 'Контактні дані для звʼязку ще не вказані. Зверніться до адміністратора платформи.'
              : 'Contact details have not been added yet. Please reach out to the platform admin.'}
          </div>
        )}
      </div>

      {showModal && selectedAmount && (
        <DonationModal
          family={family}
          amount={selectedAmount}
          cardNumber={family.cardNumber}
          onClose={() => setShowModal(false)}
          onConfirm={(familyId, amount, note) => onDonate?.(familyId, amount, note)}
        />
      )}
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function ViberIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.03 4.453.36 7.34.285 10.3c-.074 2.963-.16 8.514 5.21 10.096h.005l-.004 2.31s-.036.97.6 1.166c.77.241 1.217-.498 1.95-1.293.402-.435.955-1.073 1.372-1.556 3.78.317 6.686-.41 7.017-.517.764-.249 5.089-.8 5.792-6.526.727-5.904-.352-9.632-2.852-11.318C17.373.293 13.323-.024 11.398.002zm.094 1.804c1.677-.024 5.21.218 7.126 1.957C20.53 5.306 21.39 8.516 20.77 13.48c-.569 4.643-4.04 4.894-4.678 5.1-.277.09-2.928.743-6.177.534 0 0-2.449 2.953-3.211 3.713-.12.12-.26.168-.355.145-.131-.035-.167-.19-.165-.418l.022-3.61C2.044 17.53 2.187 12.925 2.246 10.37c.06-2.555.617-5.04 2.303-6.62C6.353 2.114 9.818 1.83 11.492 1.806zm.35 3.238c-.341.014-.311.477.03.49 1.912.079 3.137 1.255 3.2 3.07.005.3.465.27.46-.03C15.455 6.374 14.006 5.12 11.842 5.044zm-.498 1.585c-.348.052-.295.542.054.49.85-.116 1.566.596 1.453 1.446-.05.349.44.403.49.055.156-1.11-.701-2.13-1.997-1.991zm5.47 1.195c-.037 0-.077.012-.113.038-.232.17-.143.38-.056.592.273.659.367 1.354.299 2.01-.093.892-.434 1.665-.972 2.243a.232.232 0 000 .332c.09.09.24.09.332 0 .623-.655 1.008-1.54 1.11-2.55.08-.758-.028-1.574-.34-2.342a.23.23 0 00-.26-.323zM9.25 9.05a1.33 1.33 0 00-.478.084c-.26.1-.497.265-.713.52-.234.27-.31.537-.26.806.232 1.19 1.072 2.367 2.145 3.165 1.09.81 2.383 1.282 3.407.997.25-.07.47-.198.663-.385.215-.21.374-.467.48-.745.145-.37-.028-.726-.354-.904l-1.22-.684c-.3-.169-.65-.128-.872.1l-.33.34c-.155.16-.362.2-.547.106-.53-.271-1.137-.883-1.522-1.604-.122-.23-.03-.472.118-.627l.282-.296a.636.636 0 00.1-.77l-.71-1.08c-.131-.197-.31-.306-.19-.323z"/>
    </svg>
  )
}

function SignalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 110 19.2A9.6 9.6 0 0112 2.4zm-1.127 3.676l-.34 1.98A5.603 5.603 0 0117.9 13.3l-2.063.34-.168-1.02a3.612 3.612 0 00-4.456-2.976l-.34 2.04-1.98-.34.34-2.04A5.603 5.603 0 006.1 13.3l2.063-.34.168 1.02a3.612 3.612 0 004.456 2.976l.34-2.04 1.98.34-.34 2.04A5.603 5.603 0 0117.9 10.7l-2.063.34z"/>
    </svg>
  )
}
