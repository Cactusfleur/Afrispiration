import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"

export default async function SubmitPage() {
  const pageContent = await getPageContentWithFallback("submit", {
    hero: {
      title: "Join Our Designer Directory",
      description:
        "We're building the world's most comprehensive platform for discovering exceptional fashion talent. Be part of our curated community of innovative designers.",
    },
    application: {
      title: "Submit Your Application",
      description: "Share your work and philosophy to be part of our global directory.",
      buttonText: "Submit Application",
      buttonUrl: "https://forms.gle/PSoHZw5gV2sxP5MbA",
    },
    eventApplication: {
      title: "Submit an Event",
      description: "Share your upcoming fashion event details to be featured on our platform.",
      buttonText: "Submit Event",
      buttonUrl: "https://forms.gle/your-event-form",
    },
    features: [
      {
        title: "Curated Platform",
        description: "Join a selective community of designers focused on quality and sustainability.",
        icon: "check",
      },
      {
        title: "Global Exposure",
        description: "Reach fashion enthusiasts, buyers, and collaborators from around the world.",
        icon: "users",
      },
      {
        title: "Featured Opportunities",
        description: "Get highlighted in our editorial content, events, and designer spotlights.",
        icon: "star",
      },
    ],
    requirements: [
      "Portfolio showcasing your design work",
      "Professional biography and design philosophy",
      "High-quality images of your collections",
      "Information about your sustainable practices",
      "Contact details and social media presence",
    ],
    faqs: [
      {
        question: "Is there an application fee?",
        answer:
          "No, our platform is free for designers. We believe in supporting creative talent without financial barriers.",
      },
      {
        question: "What types of designers do you accept?",
        answer:
          "We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly value innovation and sustainability.",
      },
      {
        question: "How long does the review process take?",
        answer:
          "Our curation team typically reviews applications within 2-3 weeks. We'll keep you updated throughout the process.",
      },
    ],
  })

  const heroContent = getNestedContent(pageContent, "hero", {})
  const applicationContent = getNestedContent(pageContent, "application", {})
  const eventApplicationContent = getNestedContent(pageContent, "eventApplication", {})
  const featuresContent = getNestedContent(pageContent, "whatToExpect", [])
  const requirementsContent = getNestedContent(pageContent, "requirements", {})
  const faqsContent = getNestedContent(pageContent, "faq", [])

  const getFeatureIcon = (iconType: string) => {
    switch (iconType) {
      case "check":
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case "users":
        return <Users className="h-6 w-6 text-blue-600" />
      case "star":
        return <Star className="h-6 w-6 text-yellow-600" />
      default:
        return <CheckCircle className="h-6 w-6 text-green-600" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-muted/30 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              {heroContent.title || "Join Our Designer Directory"}
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              {heroContent.description ||
                "We're building the world's most comprehensive platform for discovering exceptional fashion talent. Be part of our curated community of innovative designers."}
            </p>
          </div>
        </section>

        {/* Submit Application + Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Application Cards Column */}
            <div className="space-y-8">
              {/* Designer Application Card (existing) */}
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-7 w-7 text-primary" />
                    <h2 className="font-serif text-2xl font-semibold">
                      {applicationContent.title || "Submit Your Application"}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {applicationContent.description ||
                      "Share your work and philosophy to be part of our global directory."}
                  </p>
                  <Link href={applicationContent.buttonUrl || "https://forms.gle/PSoHZw5gV2sxP5MbA"} target="_blank">
                    <Button size="lg" className="w-full">
                      {applicationContent.buttonText || "Submit Application"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Event Submission Card */}
              <Card className="shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="h-7 w-7 text-primary" />
                    <h2 className="font-serif text-2xl font-semibold">
                      {eventApplicationContent.title || "Submit an Event"}
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {eventApplicationContent.description ||
                      "Share your upcoming fashion event details to be featured on our platform."}
                  </p>
                  <Link href={eventApplicationContent.buttonUrl || "https://forms.gle/your-event-form"} target="_blank">
                    <Button size="lg" className="w-full">
                      {eventApplicationContent.buttonText || "Submit Event"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* What to Expect + Requirements Column (existing) */}
            <div className="space-y-12">
              {/* What to Expect */}
              <div className="space-y-6">
                <h3 className="font-serif text-3xl font-semibold">What to Expect</h3>
                <div className="space-y-6">
                  {featuresContent.map((feature: any, index: number) => (
                    <Feature
                      key={index}
                      icon={getFeatureIcon(feature.icon)}
                      title={feature.title}
                      desc={feature.description}
                    />
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">{requirementsContent.title}</h3>
                <ul className="text-muted-foreground text-base space-y-2 list-disc pl-5">
                  {requirementsContent.items.map((requirement: string, index: number) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {faqsContent.map((faq: any, index: number) => (
                <FAQ key={index} q={faq.question} a={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      {icon}
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{q}</h3>
      <p className="text-muted-foreground">{a}</p>
    </div>
  )
}
