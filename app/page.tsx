import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, Users, Calendar, BookOpen } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6">
                Discover Exceptional
                <span className="block text-muted-foreground">Fashion Talent</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-pretty">
                A curated platform showcasing emerging and established fashion designers from around the world. Explore
                sustainable, innovative, and culturally rich design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-base">
                  <Link href="/designers">
                    Explore Designers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                  <Link href="/submit">Submit Your Profile</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Stats */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">200+</h3>
                <p className="text-muted-foreground">Curated Designers</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">50+</h3>
                <p className="text-muted-foreground">Fashion Events</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Editorial Articles</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Designers Preview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Featured Designers</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Meet the innovative minds shaping the future of fashion with sustainable practices and cultural
                authenticity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Sample designer cards */}
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted rounded-t-lg">
                    <img
                      src="/african-fashion-designer-portrait.jpg"
                      alt="Amara Okafor"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Sustainable
                      </Badge>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">Amara Okafor</h3>
                    <p className="text-muted-foreground text-sm mb-3">Lagos, Nigeria</p>
                    <p className="text-sm leading-relaxed">
                      Sustainable fashion designer specializing in African-inspired contemporary wear.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted rounded-t-lg">
                    <img
                      src="/luxury-menswear-designer-portrait.jpg"
                      alt="Kofi Asante"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Luxury</Badge>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">Kofi Asante</h3>
                    <p className="text-muted-foreground text-sm mb-3">Accra, Ghana</p>
                    <p className="text-sm leading-relaxed">
                      Luxury menswear designer known for innovative tailoring and modern aesthetics.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[4/5] bg-muted rounded-t-lg">
                    <img
                      src="/accessories-designer-portrait.jpg"
                      alt="Zara Mbeki"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">Handcrafted</Badge>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-2">Zara Mbeki</h3>
                    <p className="text-muted-foreground text-sm mb-3">Cape Town, South Africa</p>
                    <p className="text-sm leading-relaxed">
                      Accessories designer creating handcrafted jewelry using traditional techniques.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/designers">
                  View All Designers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest from Journal */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Latest from the Journal</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
                Insights, trends, and stories from the world of sustainable and innovative fashion design.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[16/10] bg-muted rounded-t-lg">
                    <img
                      src="/sustainable-fashion-workshop.jpg"
                      alt="Sustainable Fashion"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      Sustainability
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold mb-3 text-balance">
                      The Rise of Sustainable Fashion in Africa
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Exploring how African designers are leading the global sustainable fashion movement with
                      innovative approaches to eco-friendly design.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-[16/10] bg-muted rounded-t-lg">
                    <img
                      src="/emerging-fashion-designers.jpg"
                      alt="Emerging Designers"
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      Spotlight
                    </Badge>
                    <h3 className="font-serif text-xl font-semibold mb-3 text-balance">Emerging Designers to Watch</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Meet the next generation of fashion innovators who are reshaping the industry with fresh
                      perspectives and bold creativity.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Read More Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
