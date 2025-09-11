import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import type { Designer } from "@/lib/types"
import { MapPin, ExternalLink, Instagram, Mail, Phone, Star } from "lucide-react"

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
        {/* Hero Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Designer Image */}
              <div className="aspect-[4/5] bg-muted rounded-lg overflow-hidden">
                {designer.image_url ? (
                  <img
                    src={designer.image_url || "/placeholder.svg"}
                    alt={designer.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/10 flex items-center justify-center">
                    <span className="text-muted-foreground font-serif text-6xl">{designer.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* Designer Info */}
              <div className="space-y-6">
                <div>
                  {designer.featured && (
                    <Badge className="mb-3 bg-primary text-primary-foreground">Featured Designer</Badge>
                  )}
                  <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{designer.name}</h1>

                  {designer.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{designer.location}</span>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                {designer.specialties && designer.specialties.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {designer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bio */}
                {designer.bio && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">About</h3>
                    <p className="text-foreground leading-relaxed">{designer.bio}</p>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {designer.years_experience && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Experience</h4>
                        <p className="font-semibold">{designer.years_experience} years</p>
                      </CardContent>
                    </Card>
                  )}

                  {designer.price_range && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Price Range</h4>
                        <p className="font-semibold">{designer.price_range}</p>
                      </CardContent>
                    </Card>
                  )}

                  {designer.sustainability_rating && (
                    <Card className="sm:col-span-2">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-sm text-muted-foreground mb-2">Sustainability Rating</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= designer.sustainability_rating!
                                    ? "fill-green-500 text-green-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">({designer.sustainability_rating}/5)</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Contact Links */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {designer.website_url && (
                      <Button asChild variant="outline">
                        <a href={designer.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Website
                        </a>
                      </Button>
                    )}

                    {designer.instagram_url && (
                      <Button asChild variant="outline">
                        <a href={designer.instagram_url} target="_blank" rel="noopener noreferrer">
                          <Instagram className="h-4 w-4 mr-2" />
                          Instagram
                        </a>
                      </Button>
                    )}

                    {designer.email && (
                      <Button asChild variant="outline">
                        <a href={`mailto:${designer.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    )}

                    {designer.phone && (
                      <Button asChild variant="outline">
                        <a href={`tel:${designer.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
