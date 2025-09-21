import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Palette, Award, Target } from "lucide-react"
import Link from "next/link"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"

export default async function AboutPage() {
  const pageContent = await getPageContentWithFallback("about", {
    hero: {
      title: "Celebrating African Design Excellence",
      description:
        "We are a vibrant community platform dedicated to showcasing the incredible talent, creativity, and cultural richness of African designers across the continent and diaspora.",
      primaryButtonText: "Join Our Community",
      primaryButtonUrl: "/submit",
      secondaryButtonText: "Explore Designers",
      secondaryButtonUrl: "/designers",
    },
    mission: {
      badge: "Our Mission",
      title: "Empowering African Creativity Worldwide",
      description1:
        "Afrispiration was born from a vision to create a unified platform where African designers can showcase their work, connect with peers, and access opportunities that celebrate their unique perspectives and cultural heritage.",
      description2:
        "We believe that African design has the power to inspire global conversations about creativity, innovation, and cultural expression. Our platform serves as a bridge connecting talent across borders and generations.",
    },
    values: [
      {
        title: "Cultural Pride",
        description: "Celebrating the rich heritage and diverse traditions that shape African design excellence.",
      },
      {
        title: "Community First",
        description: "Building bridges between designers across Africa and the diaspora to foster collaboration.",
      },
      {
        title: "Global Impact",
        description: "Amplifying African voices and creativity on the world stage through meaningful connections.",
      },
      {
        title: "Creative Excellence",
        description: "Showcasing the highest standards of design innovation and artistic expression.",
      },
    ],
    cta: {
      title: "Ready to Join Our Community?",
      description:
        "Whether you're a designer looking to showcase your work or someone passionate about African creativity, there's a place for you in our growing community.",
      buttonText: "Join as Designer",
      buttonUrl: "/submit",
    },
  })

  const heroContent = getNestedContent(pageContent, "hero", {})
  const missionContent = getNestedContent(pageContent, "mission", {})
  const valuesContent = getNestedContent(pageContent, "values", [])
  const ctaContent = getNestedContent(pageContent, "cta", {})

  const values = [
    {
      icon: Heart,
      title: valuesContent[0]?.title || "Cultural Pride",
      description:
        valuesContent[0]?.description ||
        "Celebrating the rich heritage and diverse traditions that shape African design excellence.",
    },
    {
      icon: Users,
      title: valuesContent[1]?.title || "Community First",
      description:
        valuesContent[1]?.description ||
        "Building bridges between designers across Africa and the diaspora to foster collaboration.",
    },
    {
      icon: Globe,
      title: valuesContent[2]?.title || "Global Impact",
      description:
        valuesContent[2]?.description ||
        "Amplifying African voices and creativity on the world stage through meaningful connections.",
    },
    {
      icon: Palette,
      title: valuesContent[3]?.title || "Creative Excellence",
      description:
        valuesContent[3]?.description ||
        "Showcasing the highest standards of design innovation and artistic expression.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-secondary to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              About Afrispiration
            </Badge>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-balance">
              {heroContent.title || "Celebrating African Design Excellence"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty mb-8">
              {heroContent.description ||
                "We are a vibrant community platform dedicated to showcasing the incredible talent, creativity, and cultural richness of African designers across the continent and diaspora."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={heroContent.primaryButtonUrl || "/submit"}>
                <Button size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  {heroContent.primaryButtonText || "Join Our Community"}
                </Button>
              </Link>
              <Link href={heroContent.secondaryButtonUrl || "/designers"}>
                <Button variant="outline" size="lg">
                  <Palette className="mr-2 h-5 w-5" />
                  {heroContent.secondaryButtonText || "Explore Designers"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-primary" />
                <Badge variant="outline">{missionContent.badge || "Our Mission"}</Badge>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">
                {missionContent.title || "Empowering African Creativity Worldwide"}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {missionContent.description1 ||
                  "Afrispiration was born from a vision to create a unified platform where African designers can showcase their work, connect with peers, and access opportunities that celebrate their unique perspectives and cultural heritage."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {missionContent.description2 ||
                  "We believe that African design has the power to inspire global conversations about creativity, innovation, and cultural expression. Our platform serves as a bridge connecting talent across borders and generations."}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary to-muted p-8 flex items-center justify-center">
                <div className="text-center">
                  <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="font-serif text-2xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">Celebrating the highest standards of African design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Our Values
            </Badge>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">What Drives Us Forward</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our core values shape everything we do, from how we build our community to how we celebrate African design
              excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-balance">
            {ctaContent.title || "Ready to Join Our Community?"}
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-pretty">
            {ctaContent.description ||
              "Whether you're a designer looking to showcase your work or someone passionate about African creativity, there's a place for you in our growing community."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={ctaContent.buttonUrl || "/submit"}>
              <Button size="lg" variant="secondary">
                <Users className="mr-2 h-5 w-5" />
                {ctaContent.buttonText || "Join as Designer"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
