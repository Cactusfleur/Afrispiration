import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"
import { DesignersWithFilters } from "./components/designers-with-filters"

async function getDesigners(): Promise<Designer[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("designers").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching designers:", error)
    return []
  }

  return data || []
}

export default async function AdminDesignersPage() {
  await requireAdmin()
  const designers = await getDesigners()

  return (
    <AdminLayout>
      <DesignersWithFilters initialDesigners={designers} />
    </AdminLayout>
  )
}
