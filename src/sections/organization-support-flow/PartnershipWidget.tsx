import data from '@/../product/sections/organization-support-flow/data.json'
import type { WidgetContent } from '@/../product/sections/organization-support-flow/types'
import { PartnershipWidget } from './components/PartnershipWidget'

const BLUE = 'oklch(0.42 0.175 260)'
const NAVY = 'oklch(0.18 0.055 261)'

export default function PartnershipWidgetPreview() {
  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: 'oklch(0.985 0.012 75)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Mock page content behind the widget */}
      <div className="max-w-4xl mx-auto px-6 py-16 select-none pointer-events-none">
        <div className="flex items-center gap-2.5 mb-10">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: BLUE }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5C4.8 1.5 3 3.5 3 5.8C3 8.5 5.2 11 7 12.5C8.8 11 11 8.5 11 5.8C11 3.5 9.2 1.5 7 1.5Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-black" style={{ color: NAVY }}>Family to Family</span>
        </div>

        <div className="mb-8">
          <div className="h-3 rounded-full w-32 mb-3" style={{ backgroundColor: 'oklch(0.90 0.025 258)' }} />
          <div className="h-8 rounded-xl w-2/3 mb-4" style={{ backgroundColor: 'oklch(0.88 0.025 258)' }} />
          <div className="h-4 rounded-full w-full mb-2" style={{ backgroundColor: 'oklch(0.92 0.02 258)' }} />
          <div className="h-4 rounded-full w-4/5" style={{ backgroundColor: 'oklch(0.92 0.02 258)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: 'white', boxShadow: '0 2px 12px rgba(15,30,61,0.07)' }}>
              <div className="h-32 rounded-xl mb-4" style={{ backgroundColor: 'oklch(0.94 0.02 258)' }} />
              <div className="h-4 rounded-full w-3/4 mb-2" style={{ backgroundColor: 'oklch(0.90 0.025 258)' }} />
              <div className="h-3 rounded-full w-full mb-1.5" style={{ backgroundColor: 'oklch(0.93 0.02 258)' }} />
              <div className="h-3 rounded-full w-5/6" style={{ backgroundColor: 'oklch(0.93 0.02 258)' }} />
            </div>
          ))}
        </div>

        <p
          className="text-center text-sm font-semibold opacity-40"
          style={{ color: NAVY }}
        >
          ↘ Partnership button floats in the bottom-right corner
        </p>
      </div>

      {/* The actual widget */}
      <PartnershipWidget
        supportTypes={data.supportTypes}
        content={data.widgetContent as WidgetContent}
        locale="en"
        onSubmit={inquiry => console.log('Partnership inquiry submitted:', inquiry)}
      />
    </div>
  )
}
