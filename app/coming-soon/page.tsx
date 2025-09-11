import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Mail, Bell, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
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
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">Shop Opening Soon</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
              We're working hard to bring you an amazing shopping experience. Stay tuned for the launch of our designer
              marketplace.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold">Curated Designs</h3>
              <p className="text-sm text-muted-foreground">Handpicked pieces from talented designers worldwide</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold">Global Marketplace</h3>
              <p className="text-sm text-muted-foreground">Connect with designers from every corner of the world</p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="font-semibold">Sustainable Fashion</h3>
              <p className="text-sm text-muted-foreground">Supporting eco-friendly and ethical fashion practices</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-muted/50 rounded-2xl p-8 space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Get Notified</h3>
            </div>
            <p className="text-muted-foreground">
              Be the first to know when we launch. We'll send you an exclusive early access invitation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Notify Me
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Expected Launch</p>
            <p className="font-semibold text-lg">Q2 2024</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
