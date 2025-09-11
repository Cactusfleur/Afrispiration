import type React from "react"
import { AdminNav } from "@/components/admin-nav"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <main className="lg:ml-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
