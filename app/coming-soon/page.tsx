import { getPageContent } from "@/lib/content"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
  const content = await getPageContent('coming_soon')
  
  // Fallback content if not found
  const badge = content?.badge || "Coming Soon"
  const title = content?.title || "Shop Opening Soon"
  const description = content?.description || "We're working hard to bring you an amazing shopping experience. Stay tuned for the launch of our designer marketplace."
  const features = content?.features || [
    {
      emoji: "🎨",
      title: "Curated Designs",
      description: "Handpicked pieces from talented designers worldwide"
    },
    {
      emoji: "🌍", 
      title: "Global Marketplace",
      description: "Connect with designers from every corner of the world"
    },
    {
      emoji: "♻️",
      title: "Sustainable Fashion",
      description: "Supporting eco-friendly and ethical fashion practices"
    }
  ]

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
            {badge}
          </Badge>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {features.map((feature: any, index: number) => (
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
