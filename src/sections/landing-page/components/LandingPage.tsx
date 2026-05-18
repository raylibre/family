import { useState } from 'react'
import type { LandingPageProps, Locale, Partner } from '@/../product/sections/landing-page/types'

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const BLUE        = 'oklch(0.42 0.175 260)'
const BLUE_DEEP   = 'oklch(0.30 0.14 260)'
const BLUE_FAINT  = 'oklch(0.95 0.025 258)'
const GOLD        = 'oklch(0.83 0.18 88)'
const GOLD_DEEP   = 'oklch(0.62 0.15 88)'
const CORAL       = 'oklch(0.68 0.20 24)'
const CORAL_DEEP  = 'oklch(0.55 0.20 24)'
const CREAM       = 'oklch(0.985 0.012 75)'
const NAVY        = 'oklch(0.18 0.055 261)'

// ─── Decorative SVGs ───────────────────────────────────────────────────────────
function SunflowerDecor({
  size = 120,
  color = 'currentColor',
  opacity = 0.12,
  className = '',
}: {
  size?: number
  color?: string
  opacity?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{ color, opacity }}
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="13" />
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={i}
          cx="60"
          cy="18"
          rx="7"
          ry="18"
          transform={`rotate(${i * 30} 60 60)`}
        />
      ))}
    </svg>
  )
}

function DotGrid({
  cols = 6,
  rows = 5,
  gap = 14,
  dotSize = 2.5,
  color = 'white',
  opacity = 0.2,
  className = '',
}: {
  cols?: number
  rows?: number
  gap?: number
  dotSize?: number
  color?: string
  opacity?: number
  className?: string
}) {
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }).flatMap((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={c * gap + gap / 2}
            cy={r * gap + gap / 2}
            r={dotSize}
            fill={color}
          />
        ))
      )}
    </svg>
  )
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="w-full leading-none pointer-events-none select-none"
      aria-hidden="true"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full" style={{ height: 56, display: 'block' }}>
        <path
          d="M0,28 C240,0 480,56 720,28 C960,0 1200,56 1440,28 L1440,56 L0,56 Z"
          fill={CREAM}
        />
      </svg>
    </div>
  )
}

// ─── Partner column ─────────────────────────────────────────────────────────────
function PartnerColumn({
  partner,
  locale,
  bgColor,
  textColor,
  accentColor,
  dotsColor,
  sunflowerColor,
  emojiPlaceholder,
}: {
  partner: Partner
  locale: Locale
  bgColor: string
  textColor: string
  accentColor: string
  dotsColor: string
  sunflowerColor: string
  emojiPlaceholder: string
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex flex-col items-center justify-center gap-4 h-full overflow-hidden px-4 py-8 transition-opacity duration-150 hover:opacity-90"
      style={{ backgroundColor: bgColor, textDecoration: 'none' }}
    >
      {/* Background sunflower */}
      <div className="absolute -bottom-6 -right-6 pointer-events-none">
        <SunflowerDecor size={170} color={sunflowerColor} opacity={0.12} />
      </div>
      {/* Dot grid corner */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <DotGrid cols={4} rows={4} gap={13} dotSize={2} color={dotsColor} opacity={0.18} />
      </div>

      {/* Section label */}
      <p
        className="relative z-10 text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 text-center"
        style={{ color: textColor }}
      >
        Партнери проєкту
      </p>

      {/* Logo container */}
      <div
        className="relative z-10 w-[100px] h-[100px] md:w-[128px] md:h-[128px] rounded-2xl flex items-center justify-center overflow-hidden shadow-md"
        style={{ backgroundColor: accentColor }}
      >
        {imgError ? (
          <span className="text-3xl">{emojiPlaceholder}</span>
        ) : (
          <img
            src={partner.logo}
            alt={partner.name[locale]}
            className="w-full h-full object-contain p-3"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Org name */}
      <p
        className="relative z-10 text-center text-xs md:text-sm font-semibold leading-snug max-w-[160px]"
        style={{ color: textColor, whiteSpace: 'pre-line' }}
      >
        {partner.name[locale]}
      </p>
    </a>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────────
export function LandingPage({
  hero,
  partners,
  content,
  locale: initialLocale = 'uk',
  onFamilyRegister,
  onDonorBrowse,
}: LandingPageProps) {
  const locale = initialLocale
  const [heroImgError, setHeroImgError] = useState(false)
  const t = content[locale]

  const [partner1, partner2] = partners

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ─── HERO ROW ─────────────────────────────────────────────────────────── */}
      {/*   Desktop  : 3fr  1fr  1fr  (grid-cols-5: photo=col-span-3, each partner=col-span-1) */}
      {/*   Mobile   : photo full-width, partners side-by-side below                          */}
      <div className="flex-none">
        <div
          className="grid grid-cols-2 md:grid-cols-5"
          style={{ height: 'min(92vh, 700px)' }}
        >
          {/* ── Photo column ── */}
          <div className="col-span-2 md:col-span-3 relative overflow-hidden" style={{ backgroundColor: BLUE_DEEP }}>
            {heroImgError ? (
              /* Fallback: illustrated blue placeholder */
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-4 relative"
                style={{ backgroundColor: BLUE_DEEP }}
              >
                <div className="absolute inset-0 pointer-events-none">
                  <DotGrid cols={14} rows={10} gap={28} dotSize={3} color="white" opacity={0.07} className="absolute inset-0 m-auto" />
                </div>
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-white/15 flex items-center justify-center border-4 border-white/20">
                  <span
                    className="text-4xl md:text-6xl font-black text-white/60 select-none"
                  >
                    {hero.name[locale].split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </span>
                </div>
                <p className="text-white/50 text-sm font-medium">{hero.name[locale]}</p>
              </div>
            ) : (
              <>
                <img
                  src={hero.photo}
                  alt={hero.name[locale]}
                  className="w-full h-full object-cover object-top"
                  onError={() => setHeroImgError(true)}
                />
              </>
            )}

            {/* Dot grid — top-right decorative */}
            <div className="absolute top-5 right-5 pointer-events-none">
              <DotGrid cols={8} rows={7} gap={15} dotSize={2.5} color="white" opacity={0.15} />
            </div>

            {/* Sunflower petal — top-left */}
            <div className="absolute -top-8 -left-8 pointer-events-none">
              <SunflowerDecor size={180} color={GOLD} opacity={0.14} />
            </div>

            {/* Gradient overlay — bottom half */}
            <div
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '60%',
                background: `linear-gradient(to top, ${NAVY}dd 0%, ${NAVY}88 45%, transparent 100%)`,
              }}
            />

            {/* Name / title overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-20 flex flex-col gap-1">
              {/* Gold accent pill */}
              <div
                className="mb-2 self-start px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide"
                style={{ backgroundColor: GOLD, color: NAVY }}
              >
                {hero.title[locale]}
              </div>
              <h1
                className="text-white text-xl md:text-3xl font-black leading-tight"
              >
                {hero.name[locale]}
              </h1>
              {hero.subtitle?.[locale] && (
                <p className="text-white/80 text-xs md:text-sm font-medium leading-snug mt-1">
                  {hero.subtitle[locale]}
                </p>
              )}
            </div>
          </div>

          {/* ── Partner 1 column — sunflower gold (Фонд) ── */}
          {partner1 && (
            <div className="col-span-1 h-full">
              <PartnerColumn
                partner={partner1}
                locale={locale}
                bgColor={GOLD}
                textColor={NAVY}
                accentColor="rgba(255,255,255,0.5)"
                dotsColor={NAVY}
                sunflowerColor={GOLD_DEEP}
                emojiPlaceholder="🕊️"
              />
            </div>
          )}

          {/* ── Partner 2 column — Ukrainian blue (Рух) ── */}
          {partner2 && (
            <div className="col-span-1 h-full">
              <PartnerColumn
                partner={partner2}
                locale={locale}
                bgColor={BLUE}
                textColor="white"
                accentColor="rgba(255,255,255,0.15)"
                dotsColor="white"
                sunflowerColor="white"
                emojiPlaceholder="🛡️"
              />
            </div>
          )}
        </div>
      </div>

      {/* ─── WAVE TRANSITION ──────────────────────────────────────────────────── */}
      <div className="relative -mt-1" style={{ backgroundColor: BLUE_FAINT }}>
        <WaveDivider />
      </div>

      {/* ─── MISSION + CTAs ───────────────────────────────────────────────────── */}
      <section
        className="relative py-16 md:py-24 px-4 text-center overflow-hidden"
        style={{ backgroundColor: CREAM }}
      >
        {/* Decorative sunflowers — far sides */}
        <div className="absolute -left-10 top-1/2 -translate-y-1/2 pointer-events-none">
          <SunflowerDecor size={220} color={GOLD} opacity={0.09} />
        </div>
        <div className="absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none">
          <SunflowerDecor size={220} color={BLUE} opacity={0.07} />
        </div>
        {/* Small dot cluster — center-top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <DotGrid cols={9} rows={2} gap={16} dotSize={2} color={GOLD} opacity={0.3} />
        </div>

        {/* ── Emblem-style ornament ── */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: GOLD }} />
          <SunflowerDecor size={28} color={GOLD} opacity={0.9} />
          <div className="h-px flex-1 max-w-[80px] rounded-full" style={{ backgroundColor: GOLD }} />
        </div>

        {/* Mission statement */}
        <div className="relative z-10 max-w-2xl mx-auto">
          <p
            className="text-lg md:text-xl font-medium leading-relaxed"
            style={{ color: NAVY }}
          >
            {t.missionLine1}
          </p>
          <p
            className="text-lg md:text-xl font-medium leading-relaxed mt-1.5"
            style={{ color: NAVY }}
          >
            {t.missionLine2}
          </p>
        </div>

        {/* ── CTA buttons ── */}
        <div className="relative z-10 mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* "I Want to Help" — gold (first) */}
          <button
            onClick={onDonorBrowse}
            className="w-full sm:w-auto px-10 py-4 text-base font-black rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
            style={{ backgroundColor: GOLD, color: NAVY, minWidth: 220 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = GOLD_DEEP }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = GOLD }}
          >
            {t.ctaDonor}
          </button>

          {/* "We Need Help" — Ukrainian blue (second) */}
          <button
            onClick={onFamilyRegister}
            className="w-full sm:w-auto px-10 py-4 text-base font-black text-white rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
            style={{ backgroundColor: BLUE, minWidth: 220 }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE_DEEP }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE }}
          >
            {t.ctaFamily}
          </button>
        </div>

        {/* Bottom ornament */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
          <div className="h-px w-16 rounded-full" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD, opacity: 0.5 }} />
        </div>
      </section>

    </div>
  )
}
