import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AppShell } from '../shell/components/AppShell'
import { useAuth } from '../hooks/useAuth'
import { FamilyRegistrationAndProfiles } from '../sections/family-registration-and-profiles/components/FamilyRegistrationAndProfiles'
import type { FamilyDashboardSubmitData } from '@/../product/sections/family-registration-and-profiles/types'
import type { Locale } from '@/../product/sections/family-registration-and-profiles/types'
import data from '@/../product/sections/family-registration-and-profiles/data.json'

export function FamilyRegistrationRoute() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [locale, setLocale] = useState<Locale>('uk')
  const [profileId, setProfileId] = useState<string | null>(null)

  async function handleSignIn(email: string, uvrCode: string, categoryId: string) {
    const { data: row } = await supabase
      .from('family_profiles')
      .insert({ email, uvr_code: uvrCode, category_id: categoryId })
      .select('id')
      .single()
    if (row) setProfileId(row.id)
  }

  async function handleSubmit(formData: FamilyDashboardSubmitData) {
    if (!profileId) return

    let photoUrl: string | null = null
    if (formData.photoFile) {
      const ext = formData.photoFile.name.split('.').pop() ?? 'jpg'
      const path = `${profileId}.${ext}`
      const { error } = await supabase.storage
        .from('family-photos')
        .upload(path, formData.photoFile, { upsert: true })
      if (!error) {
        const { data: pub } = supabase.storage.from('family-photos').getPublicUrl(path)
        photoUrl = pub.publicUrl
      }
    }

    await supabase.from('family_profiles').update({
      family_name: formData.familyName,
      photo_url: photoUrl,
      story: formData.story,
      member_name: formData.memberName,
      member_rank: formData.memberRank,
      front_line_confirmed: formData.frontLineConfirmed,
      children: formData.children,
      selected_needs: formData.selectedNeeds,
      custom_need: formData.customNeed,
      cv_submitted: true,
      updated_at: new Date().toISOString(),
    }).eq('id', profileId)
  }

  return (
    <AppShell
      locale={locale}
      onLocaleChange={setLocale}
      onNavigateHome={() => navigate('/')}
      user={user ?? undefined}
      onLogout={signOut}
    >
      <FamilyRegistrationAndProfiles
        categories={data.categories}
        uvrInfo={data.uvrInfo}
        content={data.content}
        locale={locale}
        onSignIn={handleSignIn}
        onNavigateToUVR={() => window.open(data.uvrInfo.url, '_blank')}
        onLocaleChange={setLocale}
        onSubmit={handleSubmit}
      />
    </AppShell>
  )
}
