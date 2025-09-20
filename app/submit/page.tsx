import { getPageContent } from "@/lib/content"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubmitPage() {
  const content = await getPageContent('submit')
  
  // Fallback content if not found
  const hero = content?.hero || {
    title: "Join Our Designer Directory",
    description: "We're building the world's most comprehensive platform for discovering exceptional fashion talent. Be part of our curated community of innovative designers."
  }
  
  const submitCard = content?.submitCard || {
    title: "Submit Your Application",
    description: "Share your work and philosophy to be part of our global directory.",
    buttonText: "Submit Application",
    buttonUrl: "https://forms.gle/PSoHZw5gV2sxP5MbA"
  }
  
  const whatToExpect = content?.whatToExpect || []
  const requirements = content?.requirements || {
    title: "Application Requirements",
    items: []
  }
  const faq = content?.faq || []

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-muted/30 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">{hero.title}</h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              {hero.description}
            </p>
          </div>
        </section>

        {/* Submit Application + Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Application Card */}
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="h-7 w-7 text-primary" />
                  <h2 className="font-serif text-2xl font-semibold">{submitCard.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {submitCard.description}
                </p>
                <Link href={submitCard.buttonUrl} target="_blank">
                  <Button size="lg" className="w-full">
                    {submitCard.buttonText}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* What to Expect + Requirements */}
            <div className="space-y-12">
              {/* What to Expect */}
              <div className="space-y-6">
                <h3 className="font-serif text-3xl font-semibold">What to Expect</h3>
                <div className="space-y-6">
                  {whatToExpected.map((item: any, index: number) => {
                    const icons = [
                      <CheckCircle className="h-6 w-6 text-green-600" />,
                      <Users className="h-6 w-6 text-blue-600" />,
                      <Star className="h-6 w-6 text-yellow-600" />
                    ]
                    return (
                      <Feature
                        key={index}
                        icon={icons[index] || <CheckCircle className="h-6 w-6 text-green-600" />}
                        title={item.title}
                        desc={item.description}
                      />
                    )
                  })}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">{requirements.title}</h3>
                <ul className="text-muted-foreground text-base space-y-2 list-disc pl-5">
                  {requirements.items?.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-4xl font-bold text-center mb-16">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {faq.map((item: any, index: number) => (
                <FAQ key={index} q={item.question} a={item.answer} />
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
