import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"
import { Calendar, User } from "lucide-react"

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${featured ? "lg:col-span-2" : ""}`}>
      <CardContent className="p-0">
        <Link href={`/blog/${post.slug}`}>
          <div className={`${featured ? "aspect-[16/9]" : "aspect-[16/10]"} bg-muted relative overflow-hidden`}>
            {post.featured_image_url ? (
              <img
                src={post.featured_image_url || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                <span className="text-muted-foreground font-serif text-2xl">{post.title.charAt(0)}</span>
              </div>
            )}
            {post.featured && (
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
            )}
          </div>
        </Link>

        <div className={`p-6 ${featured ? "lg:p-8" : ""}`}>
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <Link href={`/blog/${post.slug}`}>
            <h3
              className={`font-serif font-semibold mb-3 group-hover:text-primary transition-colors text-balance ${
                featured ? "text-2xl lg:text-3xl" : "text-xl"
              }`}
            >
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {post.excerpt && (
            <p className={`text-muted-foreground leading-relaxed mb-4 ${featured ? "text-base" : "text-sm"}`}>
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author_name}</span>
            </div>
            {publishedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{publishedDate}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
