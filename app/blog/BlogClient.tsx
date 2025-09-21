"use client"

import { useState, useEffect } from "react"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Search, X } from "lucide-react"

export default function BlogClient() {
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

    if (!error && data) {
      setPosts(data as BlogPost[])
      const tags = new Set<string>()
      ;(data as BlogPost[]).forEach((post) =>
        post.tags?.forEach((tag: string) => tags.add(tag))
      )
      setAllTags(Array.from(tags).sort())
    }
    setLoading(false)
  }

  const filterPosts = () => {
    let filtered = [...posts]
    if (searchTerm) {
      const s = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(s) ||
          p.excerpt?.toLowerCase().includes(s) ||
          p.author_name.toLowerCase().includes(s) ||
          p.tags?.some((t: string) => t.toLowerCase().includes(s))
      )
    }
    if (selectedTag) filtered = filtered.filter((p) => p.tags?.includes(selectedTag))
    setFilteredPosts(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedTag("")
  }

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </main>
    )
  }

  return (
    <main className="flex-1">
      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag("")}
            >
              All Topics
            </Button>
            {allTags.slice(0, 6).map((tag: string) => (
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
          {(searchTerm || selectedTag) && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" /> Clear
            </Button>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-serif text-2xl font-semibold mb-2">
              {filteredPosts.length} Article{filteredPosts.length !== 1 ? "s" : ""}
            </h2>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={i === 0 && !searchTerm && !selectedTag}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="font-serif text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or browse all topics.
              </p>
              <Button onClick={clearFilters}>View All Articles</Button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
