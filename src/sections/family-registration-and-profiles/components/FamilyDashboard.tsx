import { useState, useRef, useId } from 'react'
import type { FamilyCategory, Locale } from '@/../product/sections/family-registration-and-profiles/types'

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const CORAL     = 'oklch(0.68 0.20 24)'
const GOLD      = 'oklch(0.83 0.18 88)'
const NAVY      = 'oklch(0.18 0.055 261)'
const CREAM     = 'oklch(0.985 0.012 75)'
const BORDER    = 'oklch(0.91 0.025 258)'
const MUTED     = 'oklch(0.48 0.07 258)'

const NEED_OPTIONS = [
  { id: 'housing',     uk: 'Оренда житла',           en: 'Housing rent' },
  { id: 'groceries',   uk: 'Продукти харчування',    en: 'Groceries' },
  { id: 'medical',     uk: 'Медична допомога',       en: 'Medical care' },
  { id: 'school',      uk: 'Шкільне приладдя',       en: 'School supplies' },
  { id: 'clothing',    uk: 'Дитячий одяг',           en: "Children's clothing" },
  { id: 'psychology',  uk: 'Психологічна підтримка', en: 'Psychological support' },
  { id: 'utilities',   uk: 'Комунальні послуги',     en: 'Utilities' },
  { id: 'rehab',       uk: 'Реабілітація / протез',  en: 'Rehabilitation / prosthetics' },
]

interface ChildEntry { id: string; age: string }

interface FamilyDashboardProps {
  categories: FamilyCategory[]
  selectedCategoryId: string
  locale: Locale
  userEmail: string
  onSubmit?: (data: {
    familyName: string
    story: string
    memberName: string
    memberRank: string
    frontLineConfirmed: boolean
    children: ChildEntry[]
    selectedNeeds: string[]
    customNeed: string
    categoryId: string
    photoFile: File | null
  }) => void
}

// ── Tiny section header ─────────────────────────────────────────────────────
function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white flex-shrink-0"
        style={{ backgroundColor: BLUE }}
      >
        {number}
      </div>
      <p className="font-black text-base" style={{ color: NAVY }}>
        {title}
      </p>
      <div className="flex-1 h-px" style={{ backgroundColor: BORDER }} />
    </div>
  )
}

// ── Styled input ─────────────────────────────────────────────────────────────
function Field({
  label, children, required
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: MUTED }}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
      style={{
        border: `1.5px solid ${BORDER}`,
        color: NAVY,
        fontFamily: "'DM Sans', sans-serif",
        backgroundColor: 'white',
        ...props.style,
      }}
      onFocus={e => {
        e.currentTarget.style.borderColor = BLUE
        e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15`
        props.onFocus?.(e)
      }}
      onBlur={e => {
        e.currentTarget.style.borderColor = BORDER
        e.currentTarget.style.boxShadow = 'none'
        props.onBlur?.(e)
      }}
    />
  )
}

// ── Card preview (how it looks on the donor page) ────────────────────────────
function CardPreview({
  familyName,
  story,
  photoUrl,
  selectedNeedIds,
  categoryId,
  locale,
}: {
  familyName: string
  story: string
  photoUrl: string | null
  selectedNeedIds: string[]
  categoryId: string
  locale: Locale
}) {
  const CAT_COLORS: Record<string, { solid: string; faint: string; text: string }> = {
    disability: { solid: BLUE,                        faint: 'oklch(0.95 0.022 258)', text: 'oklch(0.30 0.14 260)' },
    died:       { solid: CORAL,                       faint: 'oklch(0.97 0.018 28)',  text: 'oklch(0.45 0.18 24)' },
    missing:    { solid: 'oklch(0.50 0.13 205)',      faint: 'oklch(0.95 0.022 200)', text: 'oklch(0.32 0.11 200)' },
    active:     { solid: GOLD,                        faint: 'oklch(0.97 0.025 85)',  text: 'oklch(0.45 0.14 88)' },
  }
  const cp = CAT_COLORS[categoryId] ?? CAT_COLORS.disability
  const pct = 45 // preview shows a partial fill

  const JAR_PATH = 'M 16,8 L 36,8 Q 42,8 48,18 L 48,66 Q 48,74 40,74 L 12,74 Q 4,74 4,66 L 4,18 Q 10,8 16,8 Z'
  const BODY_H = 66

  const needs = selectedNeedIds
    .map(id => NEED_OPTIONS.find(n => n.id === id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: '0 4px 20px rgba(15,30,61,0.12)', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Photo area */}
      <div className="relative h-36 overflow-hidden" style={{ backgroundColor: cp.faint }}>
        {photoUrl ? (
          <img src={photoUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-black select-none" style={{ color: `${cp.solid}25` }}>
              {(familyName || '?').slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {/* Category badge */}
        <div
          className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: cp.solid, color: categoryId === 'active' ? NAVY : 'white' }}
        >
          Preview
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}>
          <div className="h-full" style={{ width: `${pct}%`, backgroundColor: cp.solid }} />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white p-4 flex flex-col gap-2.5">
        <p className="font-black text-sm" style={{ color: NAVY }}>{familyName || 'Family name'}</p>
        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: MUTED }}>
          {story || 'Your family story will appear here…'}
        </p>

        {/* Need tags */}
        {needs.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {needs.map(n => n && (
              <span
                key={n.id}
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: cp.faint, color: cp.text }}
              >
                {n[locale]}
              </span>
            ))}
          </div>
        )}

        {/* Mini jar + donation buttons */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <svg width="36" height="52" viewBox="0 0 52 76">
            <rect x="14" y="0" width="24" height="10" rx="4" fill={BLUE} />
            <path d={JAR_PATH} fill="oklch(0.94 0.025 258)" />
            <clipPath id="previewclip"><path d={JAR_PATH} /></clipPath>
            <g clipPath="url(#previewclip)">
              <rect x="0" y="8" width="52" height={BODY_H}
                fill={cp.solid}
                style={{ transform: `translateY(${(1 - pct / 100) * BODY_H}px)` }}
              />
            </g>
            <path d={JAR_PATH} fill="none" stroke="oklch(0.87 0.03 258)" strokeWidth="1.5" />
            <text x="26" y="47" textAnchor="middle" fontSize="10" fontWeight="800"
              fill={pct > 45 ? 'white' : NAVY} fontFamily="'DM Sans', sans-serif">{pct}%</text>
          </svg>
          <div className="flex gap-1 justify-center">
            {['$10', '$50'].map(a => (
              <span key={a} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: 'oklch(0.93 0.02 258)', color: MUTED }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────
export function FamilyDashboard({
  categories,
  selectedCategoryId,
  locale,
  userEmail,
  onSubmit,
}: FamilyDashboardProps) {
  const uid = useId()
  const photoRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [editing, setEditing] = useState(false)

  // Form state
  const [familyName, setFamilyName] = useState('')
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [story, setStory] = useState('')
  const [memberName, setMemberName] = useState('')
  const [memberRank, setMemberRank] = useState('')
  const [frontLine, setFrontLine] = useState(false)
  const [children, setChildren] = useState<ChildEntry[]>([{ id: `${uid}-0`, age: '' }])
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [customNeed, setCustomNeed] = useState('')

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoFile(file)
      setPhotoUrl(URL.createObjectURL(file))
    }
  }

  function addChild() {
    setChildren(prev => [...prev, { id: `${uid}-${prev.length}`, age: '' }])
  }

  function removeChild(id: string) {
    setChildren(prev => prev.filter(c => c.id !== id))
  }

  function updateChildAge(id: string, age: string) {
    setChildren(prev => prev.map(c => c.id === id ? { ...c, age } : c))
  }

  function toggleNeed(id: string) {
    setSelectedNeeds(prev =>
      prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ familyName, story, memberName, memberRank, frontLineConfirmed: frontLine, children, selectedNeeds, customNeed, categoryId: selectedCategoryId, photoFile })
    setSubmitted(true)
    setEditing(false)
  }

  const t = {
    uk: {
      greeting: 'Ласкаво просимо!',
      greetingSub: 'Заповніть форму нижче, щоб створити профіль вашої сім\'ї.',
      s1: 'Інформація про сім\'ю',
      s2: 'Інформація про військовослужбовця',
      s3: 'Діти',
      s4: 'Ваші потреби',
      preview: 'Перегляд профілю',
      previewSub: 'Так виглядатиме ваша картка на сайті',
      familyName: 'Назва сім\'ї',
      photo: 'Фото сім\'ї',
      uploadPhoto: 'Завантажити фото',
      story: 'Коротка історія',
      storyPlaceholder: 'Розкажіть кілька речень про вашу сім\'ю та ситуацію…',
      memberName: 'Ім\'я та прізвище',
      memberRank: 'Звання / посада',
      frontLine: 'Підтверджую: цей член сім\'ї служив на нульовій лінії фронту',
      addChild: '+ Додати дитину',
      childAge: 'Вік',
      years: 'р.',
      submit: 'Надіслати на перевірку',
      edit: 'Редагувати профіль',
      submittedTitle: 'Профіль відправлено!',
      submittedBody: 'Ваш профіль очікує перевірки нашою командою. Після затвердження він з\'явиться у списку сімей. Зазвичай це займає до 24 годин.',
      category: 'Категорія',
    },
    en: {
      greeting: 'Welcome!',
      greetingSub: 'Fill in the form below to create your family profile.',
      s1: 'Family Information',
      s2: 'Service Member Information',
      s3: 'Children',
      s4: 'Your Needs',
      preview: 'Profile Preview',
      previewSub: 'This is how your card will look on the site',
      familyName: 'Family name',
      photo: 'Family photo',
      uploadPhoto: 'Upload photo',
      story: 'Short story',
      storyPlaceholder: 'Share a few sentences about your family and situation…',
      memberName: 'Full name',
      memberRank: 'Rank / position',
      frontLine: 'I confirm: this family member served at the zero front line',
      addChild: '+ Add child',
      childAge: 'Age',
      years: 'yrs',
      submit: 'Submit for review',
      edit: 'Edit profile',
      submittedTitle: 'Profile submitted!',
      submittedBody: 'Your profile is pending review by our team. Once approved, it will appear in the family list — usually within 24 hours.',
      category: 'Category',
    },
  }[locale]

  const category = categories.find(c => c.id === selectedCategoryId)

  return (
    <div
      className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Welcome header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: GOLD }} />
          <p className="text-xs font-bold uppercase tracking-widest" style={{ color: MUTED }}>
            {userEmail}
          </p>
        </div>
        <h1 className="text-2xl md:text-3xl font-black" style={{ color: NAVY }}>
          {t.greeting}
        </h1>
        <p className="mt-1 text-sm" style={{ color: MUTED }}>{t.greetingSub}</p>

        {/* Selected category badge */}
        {category && (
          <div
            className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ backgroundColor: 'oklch(0.95 0.022 258)', color: 'oklch(0.30 0.14 260)' }}
          >
            <span style={{ color: MUTED }}>{t.category}:</span>
            {category.title[locale]}
          </div>
        )}
      </div>

      {/* ── Submitted state ── */}
      {submitted && !editing ? (
        <div
          className="rounded-3xl p-8 flex flex-col items-center text-center gap-4"
          style={{ backgroundColor: 'oklch(0.93 0.10 155)', border: `2px solid oklch(0.75 0.14 155)` }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'oklch(0.80 0.14 155)' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="text-xl font-black" style={{ color: 'oklch(0.22 0.10 155)' }}>{t.submittedTitle}</p>
            <p className="text-sm mt-2 leading-relaxed max-w-md" style={{ color: 'oklch(0.32 0.10 155)' }}>
              {t.submittedBody}
            </p>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="px-6 py-2.5 rounded-full text-sm font-bold transition-all"
            style={{ backgroundColor: 'white', color: 'oklch(0.32 0.10 155)' }}
          >
            {t.edit}
          </button>
        </div>
      ) : (
        /* ── Two-column layout: form + preview ── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-7">

            {/* Section 1: Family info */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 8px rgba(15,30,61,0.07)' }}>
              <SectionHeader number="1" title={t.s1} />
              <div className="flex flex-col gap-4">
                <Field label={t.familyName} required>
                  <Input
                    type="text"
                    value={familyName}
                    onChange={e => setFamilyName(e.target.value)}
                    placeholder="Родина Коваленко / Kovalenko Family"
                    required
                  />
                </Field>

                <Field label={t.photo}>
                  <div
                    className="flex items-center gap-4 rounded-xl p-4 cursor-pointer transition-colors"
                    style={{ border: `1.5px dashed ${BORDER}`, backgroundColor: CREAM }}
                    onClick={() => photoRef.current?.click()}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER }}
                  >
                    {photoUrl ? (
                      <img src={photoUrl} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'oklch(0.94 0.022 258)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="5" width="18" height="14" rx="3" stroke={BLUE} strokeWidth="1.5" />
                          <circle cx="12" cy="12" r="3" stroke={BLUE} strokeWidth="1.5" />
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold" style={{ color: BLUE }}>{t.uploadPhoto}</p>
                      <p className="text-xs mt-0.5" style={{ color: MUTED }}>JPG, PNG — max 5MB</p>
                    </div>
                  </div>
                  <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </Field>

                <Field label={t.story}>
                  <textarea
                    value={story}
                    onChange={e => setStory(e.target.value)}
                    rows={4}
                    placeholder={t.storyPlaceholder}
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-all"
                    style={{
                      border: `1.5px solid ${BORDER}`,
                      color: NAVY,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                    onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </Field>
              </div>
            </div>

            {/* Section 2: Service member */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 8px rgba(15,30,61,0.07)' }}>
              <SectionHeader number="2" title={t.s2} />
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={t.memberName} required>
                    <Input
                      type="text"
                      value={memberName}
                      onChange={e => setMemberName(e.target.value)}
                      placeholder={locale === 'uk' ? 'Іванець Олексій' : 'Oleksiy Ivanets'}
                    />
                  </Field>
                  <Field label={t.memberRank}>
                    <Input
                      type="text"
                      value={memberRank}
                      onChange={e => setMemberRank(e.target.value)}
                      placeholder={locale === 'uk' ? 'Сержант' : 'Sergeant'}
                    />
                  </Field>
                </div>

                <label
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <div
                    className="w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                    style={{
                      borderColor: frontLine ? BLUE : BORDER,
                      backgroundColor: frontLine ? BLUE : 'transparent',
                    }}
                    onClick={() => setFrontLine(!frontLine)}
                  >
                    {frontLine && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: frontLine ? NAVY : MUTED }}
                    onClick={() => setFrontLine(!frontLine)}
                  >
                    {t.frontLine}
                  </span>
                </label>
              </div>
            </div>

            {/* Section 3: Children */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 8px rgba(15,30,61,0.07)' }}>
              <SectionHeader number="3" title={t.s3} />
              <div className="flex flex-col gap-3">
                {children.map((child, i) => (
                  <div key={child.id} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{ backgroundColor: 'oklch(0.95 0.022 258)', color: MUTED }}
                    >
                      {i + 1}
                    </div>
                    <Input
                      type="number"
                      value={child.age}
                      onChange={e => updateChildAge(child.id, e.target.value)}
                      placeholder={`${t.childAge}…`}
                      min="0"
                      max="18"
                      style={{ width: 120 }}
                    />
                    <span className="text-xs" style={{ color: MUTED }}>{t.years}</span>
                    {children.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChild(child.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center transition-colors ml-auto"
                        style={{ backgroundColor: 'oklch(0.97 0.018 28)', color: 'oklch(0.55 0.18 24)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 5h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addChild}
                  className="text-sm font-bold text-left transition-colors mt-1"
                  style={{ color: BLUE }}
                  onMouseEnter={e => { e.currentTarget.style.color = BLUE_DEEP }}
                  onMouseLeave={e => { e.currentTarget.style.color = BLUE }}
                >
                  {t.addChild}
                </button>
              </div>
            </div>

            {/* Section 4: Needs */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 1px 8px rgba(15,30,61,0.07)' }}>
              <SectionHeader number="4" title={t.s4} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {NEED_OPTIONS.map(need => {
                  const checked = selectedNeeds.includes(need.id)
                  return (
                    <label
                      key={need.id}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                      style={{
                        backgroundColor: checked ? 'oklch(0.95 0.022 258)' : 'oklch(0.985 0.012 75)',
                        border: `1.5px solid ${checked ? BLUE + '40' : BORDER}`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all"
                        style={{
                          borderColor: checked ? BLUE : BORDER,
                          backgroundColor: checked ? BLUE : 'transparent',
                        }}
                      >
                        {checked && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4l1.5 1.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleNeed(need.id)}
                        className="hidden"
                      />
                      <span className="text-sm font-medium" style={{ color: checked ? NAVY : MUTED }}>
                        {need[locale]}
                      </span>
                    </label>
                  )
                })}
              </div>

              {/* Custom need */}
              <Input
                type="text"
                value={customNeed}
                onChange={e => setCustomNeed(e.target.value)}
                placeholder={locale === 'uk' ? 'Інша потреба (необов\'язково)…' : 'Other need (optional)…'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-1"
              style={{ backgroundColor: CORAL, boxShadow: `0 8px 28px -4px ${CORAL}55` }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.55 0.20 24)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = CORAL }}
            >
              {t.submit}
            </button>
          </form>

          {/* ── Preview panel (sticky sidebar) ── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-3">
            <div>
              <p className="font-black text-sm mb-1" style={{ color: NAVY }}>{t.preview}</p>
              <p className="text-xs" style={{ color: MUTED }}>{t.previewSub}</p>
            </div>
            <CardPreview
              familyName={familyName}
              story={story}
              photoUrl={photoUrl}
              selectedNeedIds={selectedNeeds}
              categoryId={selectedCategoryId}
              locale={locale}
            />
          </div>
        </div>
      )}
    </div>
  )
}
