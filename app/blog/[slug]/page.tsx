import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import type { BlogPost } from "@/lib/types"
import { Calendar, User, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("published", true).eq("slug", slug).single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  return data
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Back Button */}
        <section className="py-6 border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Journal
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">{post.title}</h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 text-pretty max-w-3xl mx-auto">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author_name}</span>
                </div>
                {publishedDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{publishedDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_image_url && (
              <div className="aspect-[16/9] bg-muted rounded-lg overflow-hidden mb-12">
                <img
                  src={post.featured_image_url || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed text-foreground">{post.content}</div>
            </div>
          </div>
        </section>

        {/* Author Bio */}
        {post.author_bio && (
          <section className="py-12 bg-muted/30">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4">
                {post.author_image_url && (
                  <div className="w-16 h-16 bg-muted rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={post.author_image_url || "/placeholder.svg"}
                      alt={post.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-serif text-xl font-semibold mb-2">About {post.author_name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{post.author_bio}</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
