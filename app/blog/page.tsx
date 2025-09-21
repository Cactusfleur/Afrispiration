import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"
import BlogClient from "./BlogClient" // 👈 new client component

export default async function BlogPage() {
  const pageContent = await getPageContentWithFallback("blog", {
    hero: {
      title: "Fashion Journal",
      description:
        "Insights, trends, and stories from the world of sustainable and innovative fashion design.",
    },
  })

  const heroContent = getNestedContent(pageContent, "hero", {})

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
            {heroContent.title || "Fashion Journal"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            {heroContent.description ||
              "Discover the latest in fashion culture, designer spotlights, and industry analysis."}
          </p>
        </div>
      </section>

      {/* Blog posts list */}
      <BlogClient />

      <Footer />
    </div>
  )
}
