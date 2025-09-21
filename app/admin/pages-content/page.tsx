import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, Settings } from "lucide-react"
import Link from "next/link"
import { DeletePageContentButton } from "./components/DeletePageContentButton"
import { AdminLayout } from "@/components/admin-layout"

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
      home: "Home Page",
    }
    return displayNames[pageKey] || pageKey.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getPageUrl = (pageKey: string) => {
    if (pageKey === "footer") return "/"
    if (pageKey === "coming_soon") return "/shop"
    if (pageKey === "home") return "/"
    return `/${pageKey}`
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Pages Content</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage content for different pages across your website
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/admin/pages-content/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Page Content
            </Link>
          </Button>
        </div>

        {pageContents && pageContents.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {pageContents.map((content) => (
              <Card key={content.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base sm:text-lg leading-tight">
                      {getPageDisplayName(content.page_key)}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {content.page_key}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs sm:text-sm">
                    Last updated: {new Date(content.updated_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Content sections: {Object.keys(content.content || {}).length}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button variant="outline" size="sm" asChild className="flex-1 min-h-[36px] bg-transparent">
                        <Link href={getPageUrl(content.page_key)} target="_blank">
                          <Eye className="h-3 w-3 mr-1" />
                          View Page
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1 min-h-[36px] bg-transparent">
                        <Link href={`/admin/pages-content/${content.id}/edit`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <div className="text-center space-y-4 max-w-md">
                <div className="text-muted-foreground">
                  <Settings className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-semibold">No page content found</h3>
                  <p className="text-sm sm:text-base">Get started by creating your first page content.</p>
                </div>
                <Button asChild className="w-full sm:w-auto">
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
    </AdminLayout>
  )
}
