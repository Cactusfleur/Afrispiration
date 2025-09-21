import type React from "react"
import { AdminNav } from "@/components/admin-nav"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">{children}</div>
      </main>
    </div>
  )
}

export default AdminLayout
