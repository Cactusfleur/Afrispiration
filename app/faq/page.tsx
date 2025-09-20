import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { getPageContentWithFallback, getNestedContent } from "@/lib/page-content"

export default async function FAQPage() {
  const pageContent = await getPageContentWithFallback("faq", {
    header: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about joining our designer directory and using our platform.",
    },
    faqs: [
      {
        question: "Is there an application fee?",
        answer:
          "No, our platform is free for designers. We believe in supporting creative talent without financial barriers.",
      },
      {
        question: "What types of designers do you accept?",
        answer:
          "We welcome designers across all categories - fashion, accessories, jewelry, and more. We particularly value innovation, sustainability, and cultural authenticity.",
      },
      {
        question: "How long does the review process take?",
        answer:
          "Our curation team typically reviews applications within 2-3 weeks. We'll keep you updated throughout the process via email.",
      },
      {
        question: "What are the requirements to join?",
        answer:
          "You'll need a portfolio showcasing your design work, professional biography, high-quality images of your collections, information about sustainable practices, and contact details.",
      },
      {
        question: "Can I update my profile after being accepted?",
        answer:
          "Yes! Once accepted, you'll have access to update your profile, add new collections, and manage your presence on the platform.",
      },
      {
        question: "How do you promote featured designers?",
        answer:
          "Featured designers are highlighted in our editorial content, social media, newsletters, and special events. We also prioritize them in search results and recommendations.",
      },
      {
        question: "Do you work with emerging designers?",
        answer:
          "We're committed to supporting both emerging and established designers. We look for talent, innovation, and commitment to quality regardless of career stage.",
      },
      {
        question: "What countries do you cover?",
        answer:
          "We showcase designers from 54+ countries and diaspora communities worldwide. Our platform celebrates global fashion talent and cultural diversity.",
      },
      {
        question: "How can buyers connect with designers?",
        answer:
          "Buyers can browse our directory, view designer profiles, and contact designers directly through our platform. We facilitate connections while respecting designer preferences.",
      },
    ],
    contact: {
      title: "Still have questions?",
      description: "Can't find what you're looking for? We're here to help.",
      buttonText: "Join Our Directory",
      buttonUrl: "/submit",
    },
  })

  const headerContent = getNestedContent(pageContent, "hero", {})
  const faqsContent = getNestedContent(pageContent, "questions", [])
  const contactContent = getNestedContent(pageContent, "stillHaveQuestions", {})

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
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">
              {headerContent.title || "Frequently Asked Questions"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {headerContent.description ||
                "Find answers to common questions about joining our designer directory and using our platform."}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqsContent.map((faq: any, index: number) => (
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
              <h2 className="font-serif text-2xl font-semibold mb-4">
                {contactContent.title || "Still have questions?"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {contactContent.description || "Can't find what you're looking for? We're here to help."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href={contactContent.buttonUrl || "/submit"}>
                    {contactContent.buttonText || "Join Our Directory"}
                  </a>
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
