"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Search, X } from "lucide-react"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [allTags, setAllTags] = useState<string[]>([])

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, selectedTag])

  const fetchBlogPosts = async () => {
    const supabase = createClient()

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("featured", { ascending: false })
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Error fetching blog posts:", error)
    } else {
      setPosts(data || [])

      // Extract all unique tags
      const tags = new Set<string>()
      data?.forEach((post) => {
        post.tags?.forEach((tag) => tags.add(tag))
      })
      setAllTags(Array.from(tags).sort())
    }

    setLoading(false)
  }

  const filterPosts = () => {
    let filtered = [...posts]

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.excerpt?.toLowerCase().includes(search) ||
          post.author_name.toLowerCase().includes(search) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(search)),
      )
    }

    // Tag filter
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTag("")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Fashion Journal</h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Insights, trends, and stories from the world of sustainable and innovative fashion design. Discover the
                latest in fashion culture, designer spotlights, and industry analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedTag === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("")}
                >
                  All Topics
                </Button>
                {allTags.slice(0, 6).map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedTag) && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-semibold mb-2">
                {filteredPosts.length} Article{filteredPosts.length !== 1 ? "s" : ""}
              </h2>
              {(searchTerm || selectedTag) && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Filtered by:</span>
                  {searchTerm && <Badge variant="secondary">"{searchTerm}"</Badge>}
                  {selectedTag && <Badge variant="secondary">{selectedTag}</Badge>}
                </div>
              )}
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} featured={index === 0 && !searchTerm && !selectedTag} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="font-serif text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or browse all topics.</p>
                <Button onClick={clearFilters}>View All Articles</Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
