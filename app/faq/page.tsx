import { getPageContent } from "@/lib/content"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  const content = await getPageContent('faq')
  
  // Fallback content if not found
  const hero = content?.hero || {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about joining our designer directory and using our platform."
  }
  
  const faqs = content?.questions || []
  
  const stillHaveQuestions = content?.stillHaveQuestions || {
    title: "Still have questions?",
    description: "Can't find what you're looking for? We're here to help.",
    buttonText: "Join Our Directory",
    buttonUrl: ""
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <HelpCircle className="h-12 w-12 text-primary" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{hero.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {hero.description}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border-b border-border last:border-b-0"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="mt-12 text-center">
              <h2 className="font-serif text-2xl font-semibold mb-4">{stillHaveQuestions.title}</h2>
              <p className="text-muted-foreground mb-6">{stillHaveQuestions.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href={stillHaveQuestions.buttonUrl}>{stillHaveQuestions.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
