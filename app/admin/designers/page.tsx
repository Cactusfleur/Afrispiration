import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"
import { Plus, Edit, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { DeleteDesignerButton } from "./components/DeleteDesignerButton"

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Designers</h1>
            <p className="text-muted-foreground">Manage designer profiles and listings</p>
          </div>
          <Button asChild>
            <Link href="/admin/designers/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Designer
            </Link>
          </Button>
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {designers.map((designer) => (
            <Card key={designer.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{designer.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{designer.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={designer.status === "active" ? "default" : "secondary"}>{designer.status}</Badge>
                    {designer.is_featured && <Badge variant="outline">Featured</Badge>}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  
                  {designer.category && (
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {designer.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {designer.subcategory}
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/designers/${designer.slug}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Link href={`/admin/designers/${designer.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteDesignerButton id={designer.id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {designers.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="font-serif text-xl font-semibold mb-2">No designers yet</h3>
              <p className="text-muted-foreground mb-4">Start building your directory by adding the first designer.</p>
              <Button asChild>
                <Link href="/admin/designers/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Designer
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
