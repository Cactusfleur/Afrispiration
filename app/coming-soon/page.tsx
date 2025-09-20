import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"

export default async function ComingSoonPage() {
  const pageContent = await getPageContentWithFallback("coming_soon", {
    header: {
      title: "Shop Opening Soon",
      description:
        "We're working hard to bring you an amazing shopping experience. Stay tuned for the launch of our designer marketplace.",
    },
    features: [
      {
        emoji: "🎨",
        title: "Curated Designs",
        description: "Handpicked pieces from talented designers worldwide",
      },
      {
        emoji: "🌍",
        title: "Global Marketplace",
        description: "Connect with designers from every corner of the world",
      },
      {
        emoji: "♻️",
        title: "Sustainable Fashion",
        description: "Supporting eco-friendly and ethical fashion practices",
      },
    ],
  })

  const headerContent = getNestedContent(pageContent, "header", {})
  const featuresContent = getNestedContent(pageContent, "features", [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Button variant="ghost" asChild className="gap-2">
              <Link href="/designers">
                <ArrowLeft className="h-4 w-4" />
                Back to Designers
              </Link>
            </Button>
          </div>

          {/* Coming Soon Badge */}
          <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
            <Clock className="h-4 w-4 mr-2" />
            Coming Soon
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
              {headerContent.title || "Shop Opening Soon"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {headerContent.description ||
                "We're working hard to bring you an amazing shopping experience. Stay tuned for the launch of our designer marketplace."}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {featuresContent.map((feature: any, index: number) => (
              <div key={index} className="space-y-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">{feature.emoji}</span>
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
