import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  return (
    <AppShell
      locale="uk"
      user={{
        name: 'Оксана Мельник',
        email: 'oksana@example.com',
        role: 'admin',
      }}
      onLocaleChange={(locale) => console.log('Locale:', locale)}
      onNavigateHome={() => console.log('Navigate home')}
      onNavigateAdmin={() => console.log('Navigate to admin')}
      onLogout={() => console.log('Logout')}
    >
      <div className="rounded-xl border border-zinc-200 bg-white p-10 text-center">
        <p className="text-sm text-zinc-400" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
          Section content renders here
        </p>
      </div>
    </AppShell>
  )
}
