import data from '@/../product/sections/admin-and-verification/data.json'
import { AdminPortal } from './components/AdminPortal'
import type { DonationRecord, FamilyRecord } from '@/../product/sections/admin-and-verification/types'

export default function AdminPortalPreview() {
  return (
    <AdminPortal
      adminUser={{ ...data.adminUser, role: 'admin' as const }}
      dashboardStats={data.dashboardStats}
      families={data.families as FamilyRecord[]}
      donations={data.donations as DonationRecord[]}
      categories={data.categories}
      onLogin={(email, password) => console.log('Admin login:', email, password)}
      onApproveDonation={id => console.log('Approved donation:', id)}
      onCancelDonation={id => console.log('Cancelled donation:', id)}
      onApproveFamily={id => console.log('Approved family:', id)}
      onRejectFamily={(id, note) => console.log('Rejected family:', id, note)}
      onArchiveFamily={id => console.log('Archived family:', id)}
      onDeleteFamily={id => console.log('Deleted family:', id)}
    />
  )
}
