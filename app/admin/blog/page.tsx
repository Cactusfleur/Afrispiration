import { requireAdmin } from "@/lib/auth"
import { AdminLayout } from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types"
import { Plus, Edit, Eye, Trash2, Calendar } from "lucide-react"
import Link from "next/link"

async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  return data || []
}

export default async function AdminBlogPage() {
  await requireAdmin()
  const posts = await getBlogPosts()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold">Blog Posts</h1>
            <p className="text-muted-foreground">Manage articles and editorial content</p>
          </div>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-serif text-lg font-semibold">{post.title}</h3>
                      <div className="flex gap-2">
                        <Badge variant={post.published ? "default" : "secondary"}>
                          {post.published ? "Published" : "Draft"}
                        </Badge>
                        {post.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">By {post.author_name}</p>

                    {post.excerpt && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString()
                            : new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {post.tags && (
                        <div className="flex gap-1">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="font-serif text-xl font-semibold mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">Start creating editorial content for your audience.</p>
              <Button asChild>
                <Link href="/admin/blog/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Write First Article
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
