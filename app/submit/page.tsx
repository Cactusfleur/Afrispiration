import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ComingSoonSignup } from "@/components/coming-soon-signup"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Users, Star } from "lucide-react"

export default function SubmitPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Join Our Designer Directory</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              We're building the world's most comprehensive platform for discovering exceptional fashion talent. Be part
              of our curated community of innovative designers.
            </p>
          </div>
        </section>

        {/* Coming Soon Status */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Information */}
              <div className="space-y-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="h-6 w-6 text-primary" />
                      <h2 className="font-serif text-xl font-semibold">Designer Applications Coming Soon</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We're currently in beta and carefully curating our initial designer community. Our application
                      process will launch soon with a streamlined submission system.
                    </p>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Beta Phase
                    </Badge>
                  </CardContent>
                </Card>

                {/* What to Expect */}
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl font-semibold">What to Expect</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Curated Platform</h4>
                        <p className="text-sm text-muted-foreground">
                          Join a selective community of innovative designers focused on quality and sustainability.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Global Exposure</h4>
                        <p className="text-sm text-muted-foreground">
                          Reach fashion enthusiasts, buyers, and collaborators from around the world.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium mb-1">Featured Opportunities</h4>
                        <p className="text-sm text-muted-foreground">
                          Get highlighted in our editorial content, events, and designer spotlights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements Preview */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold">Application Requirements</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>• Portfolio showcasing your design work</p>
                    <p>• Professional biography and design philosophy</p>
                    <p>• High-quality images of your collections</p>
                    <p>• Information about your sustainable practices</p>
                    <p>• Contact details and social media presence</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Signup Form */}
              <div className="lg:sticky lg:top-8">
                <ComingSoonSignup
                  title="Get Notified When Applications Open"
                  description="Be among the first designers to join our platform when we launch the application process."
                  interests={[
                    "Fashion Design",
                    "Sustainable Fashion",
                    "Luxury Design",
                    "Contemporary Fashion",
                    "Accessories Design",
                    "Textile Innovation",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">When will applications open?</h3>
                <p className="text-sm text-muted-foreground">
                  We're planning to launch designer applications in early 2024. Sign up to be notified as soon as
                  they're available.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Is there an application fee?</h3>
                <p className="text-sm text-muted-foreground">
                  No, our platform is free for designers. We believe in supporting creative talent without financial
                  barriers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What types of designers do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly
                  value innovation and sustainability.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">How long does the review process take?</h3>
                <p className="text-sm text-muted-foreground">
                  Our curation team typically reviews applications within 2-3 weeks. We'll keep you updated throughout
                  the process.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
