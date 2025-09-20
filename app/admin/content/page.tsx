import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { ContentManager } from "./components/ContentManager"

export default async function AdminContentPage() {
  await requireAdmin()

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground">Edit page content and sections across the website</p>
        </div>

        <ContentManager />
      </div>
    </AdminLayout>
  )
}