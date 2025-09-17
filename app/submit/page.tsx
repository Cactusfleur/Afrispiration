import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-muted/30 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              Join Our Designer Directory
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
              We're building the world’s most comprehensive platform for discovering
              exceptional fashion talent. Be part of our curated community of innovative
              designers.
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
                  <h2 className="font-serif text-2xl font-semibold">Submit Your Application</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Share your work and philosophy to be part of our global directory.
                </p>
                <Link href="https://forms.gle/PSoHZw5gV2sxP5MbA" target="_blank">
                  <Button size="lg" className="w-full">
                    Submit Application
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
                  <Feature
                    icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                    title="Curated Platform"
                    desc="Join a selective community of designers focused on quality and sustainability."
                  />
                  <Feature
                    icon={<Users className="h-6 w-6 text-blue-600" />}
                    title="Global Exposure"
                    desc="Reach fashion enthusiasts, buyers, and collaborators from around the world."
                  />
                  <Feature
                    icon={<Star className="h-6 w-6 text-yellow-600" />}
                    title="Featured Opportunities"
                    desc="Get highlighted in our editorial content, events, and designer spotlights."
                  />
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="font-serif text-2xl font-semibold">Application Requirements</h3>
                <ul className="text-muted-foreground text-base space-y-2 list-disc pl-5">
                  <li>Portfolio showcasing your design work</li>
                  <li>Professional biography and design philosophy</li>
                  <li>High-quality images of your collections</li>
                  <li>Information about your sustainable practices</li>
                  <li>Contact details and social media presence</li>
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
              <FAQ
                q="Is there an application fee?"
                a="No, our platform is free for designers. We believe in supporting creative talent without financial barriers."
              />
              <FAQ
                q="What types of designers do you accept?"
                a="We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly value innovation and sustainability."
              />
              <FAQ
                q="How long does the review process take?"
                a="Our curation team typically reviews applications within 2-3 weeks. We'll keep you updated throughout the process."
              />
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
