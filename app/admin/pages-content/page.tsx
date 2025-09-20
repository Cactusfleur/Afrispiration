import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Settings } from "lucide-react"
import Link from "next/link"
import { DeletePageContentButton } from "./components/DeletePageContentButton"

export default async function PagesContentPage() {
  await requireAdmin()

  const supabase = await createClient()
  const { data: pageContents, error } = await supabase
    .from("page_content")
    .select("*")
    .order("page_key", { ascending: true })

  if (error) {
    console.error("Error fetching page contents:", error)
    return <div>Error loading page contents</div>
  }

  const getPageDisplayName = (pageKey: string) => {
    const displayNames: Record<string, string> = {
      faq: "FAQ Page",
      about: "About Page",
      coming_soon: "Coming Soon Page",
      submit: "Submit Page",
      events: "Events Page",
      blog: "Blog Page",
      designers: "Designers Page",
      footer: "Footer Content",
    }
    return displayNames[pageKey] || pageKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getPageUrl = (pageKey: string) => {
    if (pageKey === "footer") return "/"
    if (pageKey === "coming_soon") return "/shop"
    return `/${pageKey}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pages Content</h1>
          <p className="text-muted-foreground">Manage content for different pages across your website</p>
        </div>
        <Button asChild>
          <Link href="/admin/pages-content/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Page Content
          </Link>
        </Button>
      </div>

      {pageContents && pageContents.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pageContents.map((content) => (
            <Card key={content.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{getPageDisplayName(content.page_key)}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {content.page_key}
                  </Badge>
                </div>
                <CardDescription>Last updated: {new Date(content.updated_at).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Content sections: {Object.keys(content.content || {}).length}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={getPageUrl(content.page_key)} target="_blank">
                        <Eye className="h-3 w-3 mr-1" />
                        View Page
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/pages-content/${content.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <DeletePageContentButton id={content.id} pageKey={content.page_key} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="text-muted-foreground">
                <Settings className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">No page content found</h3>
                <p>Get started by creating your first page content.</p>
              </div>
              <Button asChild>
                <Link href="/admin/pages-content/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Page Content
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
