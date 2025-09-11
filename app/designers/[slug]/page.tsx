import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"
import { MapPin, Instagram, Mail, Phone, Star, Calendar, Factory, Award, CheckCircle } from "lucide-react"
import Link from "next/link"

interface DesignerPageProps {
  params: Promise<{ slug: string }>
}

async function getDesignerBySlug(slug: string): Promise<Designer | null> {
  const supabase = await createClient()

  // Convert slug back to name format for search
  const searchName = slug.replace(/-/g, " ")

  const { data, error } = await supabase
    .from("designers")
    .select("*")
    .eq("status", "active")
    .ilike("name", `%${searchName}%`)
    .single()

  if (error) {
    console.error("Error fetching designer:", error)
    return null
  }

  return data
}

export default async function DesignerPage({ params }: DesignerPageProps) {
  const { slug } = await params
  const designer = await getDesignerBySlug(slug)

  if (!designer) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section with Cover Image */}
        <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={designer.cover_image || "/placeholder.svg?height=600&width=1200&query=fashion designer studio"}
              alt={`${designer.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Modern Card Overlay */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 opacity-80">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full shadow-2xl">


              {/* Designer Name */}
              <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4 text-center">{designer.name}</h1>

              {/* Verification and Award Icons */}
              <div className="flex items-center justify-center gap-4 mb-6">
                {designer.featured && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-5 w-5 text-blue-500" />
                    <span className="text-xs text-muted-foreground">Verified</span>
                  </div>
                )}
                {designer.is_sustainable && (
                  <div className="flex items-center gap-1">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-muted-foreground">Sustainable</span>
                  </div>
                )}
              </div>

              {/* Category and Subcategory */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground lowercase tracking-wide">
                  {designer.category}
                  {designer.subcategory && ` ${designer.subcategory}`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="py-4 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/designers" className="hover:text-foreground">
                Designers
              </Link>
              <span>›</span>
              <span className="text-foreground font-medium">{designer.name}</span>
            </nav>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Sidebar - Designer Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">
                    DESIGNED BY
                  </h2>
                  <h1 className="font-serif text-3xl font-bold mb-6">{designer.name}</h1>
                </div>

                {designer.made_in_country && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      PRODUCTION LOCATION
                    </h3>
                    <div className="flex items-center gap-2">
                      <Factory className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{designer.made_in_country}</span>
                    </div>
                  </div>
                )}

                {designer.location && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      DESIGNER LOCATION
                    </h3>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{designer.location}</span>
                    </div>
                  </div>
                )}

                {designer.category && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">CATEGORY</h3>
                    <Badge variant="secondary" className="text-sm">
                      {designer.category}
                    </Badge>
                  </div>
                )}

                {designer.subcategory && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      SUBCATEGORY
                    </h3>
                    <Badge variant="outline" className="text-sm">
                      {designer.subcategory}
                    </Badge>
                  </div>
                )}

                {designer.years_experience && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">
                      YEAR LAUNCHED
                    </h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">{new Date().getFullYear() - designer.years_experience}</span>
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-4">SOCIAL</h3>
                  <div className="flex gap-3">
                    {designer.instagram_url && (
                      <a
                        href={designer.instagram_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {designer.email && (
                      <a href={`mailto:${designer.email}`} className="text-muted-foreground hover:text-foreground">
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                    {designer.phone && (
                      <a href={`tel:${designer.phone}`} className="text-muted-foreground hover:text-foreground">
                        <Phone className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Website */}
                {designer.website_url && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-2">WEBSITE</h3>
                    <a
                      href={designer.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground break-all"
                    >
                      {designer.website_url}
                    </a>
                  </div>
                )}

                {/* Shop Now Button */}
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href="/coming-soon">SHOP NOW</Link>
                </Button>
              </div>

              {/* Right Content - Biography and Past Works */}
              <div className="lg:col-span-2 space-y-8">
                {/* Biography */}
                {designer.bio && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-6">
                      BIOGRAPHY
                    </h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-foreground leading-relaxed text-base">{designer.bio}</p>
                    </div>
                  </div>
                )}

                {designer.portfolio_images && designer.portfolio_images.length > 0 && (
                  <div>
                    <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wide mb-6">
                      PAST WORKS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {designer.portfolio_images.map((image, index) => (
                        <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg?height=400&width=400"}
                            alt={`${designer.name} work ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
