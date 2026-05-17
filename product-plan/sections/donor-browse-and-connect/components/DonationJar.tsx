import { useId } from 'react'

interface DonationJarProps {
  pct: number
  label: string
  sublabel?: string
  width?: number
  height?: number
}

// Jar body path — narrow neck top, wide body
const JAR_PATH =
  'M 16,8 L 36,8 Q 42,8 48,18 L 48,66 Q 48,74 40,74 L 12,74 Q 4,74 4,66 L 4,18 Q 10,8 16,8 Z'

const BODY_TOP = 8
const BODY_BOTTOM = 74
const BODY_H = BODY_BOTTOM - BODY_TOP
const CX = 26
const CY = (BODY_TOP + BODY_BOTTOM) / 2

function getLiquidColor(pct: number): string {
  if (pct >= 100) return 'oklch(0.52 0.14 155)'   // emerald — full
  if (pct >= 60)  return 'oklch(0.42 0.175 260)'  // Ukrainian blue
  if (pct >= 25)  return 'oklch(0.78 0.17 88)'    // sunflower gold
  return 'oklch(0.87 0.03 258)'                    // faint blue — near empty
}

export function DonationJar({ pct, label, sublabel, width = 52, height = 76 }: DonationJarProps) {
  const uid = useId()
  const clamped = Math.min(100, Math.max(0, pct))
  const color = getLiquidColor(clamped)
  const clipId = `jar-${uid.replace(/:/g, '')}`
  const translateY = (1 - clamped / 100) * BODY_H
  const useLightText = clamped > 48

  return (
    <svg width={width} height={height} viewBox="0 0 52 76">
      <defs>
        <clipPath id={clipId}>
          <path d={JAR_PATH} />
        </clipPath>
      </defs>

      {/* Lid — Ukrainian blue */}
      <rect x="14" y="0" width="24" height="10" rx="4" fill="oklch(0.42 0.175 260)" />

      {/* Empty jar body */}
      <path d={JAR_PATH} fill="oklch(0.94 0.025 258)" />

      {/* Liquid fill — slides up from bottom */}
      <g clipPath={`url(#${clipId})`}>
        <rect
          x="0" y={BODY_TOP} width="52" height={BODY_H}
          fill={color}
          style={{
            transform: `translateY(${translateY}px)`,
            transition: 'transform 0.75s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s ease',
          }}
        />
      </g>

      {/* Jar outline */}
      <path d={JAR_PATH} fill="none" stroke="oklch(0.87 0.03 258)" strokeWidth="1.5" />

      {/* Glass shine highlight */}
      <line
        x1="12" y1="22" x2="11" y2="58"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Percentage label */}
      <text
        x={CX} y={CY + 5}
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
        fill={useLightText ? 'rgba(255,255,255,0.95)' : 'oklch(0.18 0.055 261)'}
        fontFamily="'DM Sans', sans-serif"
        style={{ transition: 'fill 0.3s ease' }}
      >
        {label}
      </text>

      {sublabel && (
        <text
          x={CX} y={CY + 17}
          textAnchor="middle"
          fontSize="7.5"
          fill={useLightText ? 'rgba(255,255,255,0.65)' : 'oklch(0.55 0.07 258)'}
          fontFamily="'DM Sans', sans-serif"
          style={{ transition: 'fill 0.3s ease' }}
        >
          {sublabel}
        </text>
      )}
    </svg>
  )
}
