import type { FormField } from "@/components/form-builder"

export const pageContentFields: FormField[] = [
  {
    name: "page_key",
    label: "Page Key",
    type: "select",
    required: true,
    options: [
      "faq",
      "about",
      "coming_soon",
      "submit",
      "events",
      "blog",
      "designers",
      "footer",
      "home",
      "contact",
      "privacy",
      "terms",
    ] as const,
  },
  {
    name: "content",
    label: "Content (JSON Format)",
    type: "textarea",
    required: true,
    placeholder: `{
  "hero": {
    "title": "Page Title",
    "description": "Page description"
  },
  "sections": [
    {
      "title": "Section Title",
      "content": "Section content"
    }
  ]
}`,
  },
]

// Helper function to get default content templates
export const getDefaultContentTemplate = (pageKey: string): string => {
  const templates: Record<string, any> = {
    faq: {
      hero: {
        title: "Frequently Asked Questions",
        description: "Find answers to common questions",
      },
      questions: [
        {
          question: "Sample question?",
          answer: "Sample answer",
        },
      ],
    },
    about: {
      hero: {
        title: "About Us",
        description: "Learn more about our story",
      },
      mission: {
        title: "Our Mission",
        description: "What we stand for",
      },
    },
    home: {
      hero: {
        title: "Welcome",
        description: "Your homepage description",
      },
      features: [],
    },
    contact: {
      hero: {
        title: "Contact Us",
        description: "Get in touch with us",
      },
      form: {
        title: "Send us a message",
        fields: ["name", "email", "message"],
      },
    },
    submit: {
      hero: {
        title: "Join Our Platform",
        description: "Become part of our curated community and share your upcoming fashion events.",
      },
      application: {
        title: "Submit Your Designer Application",
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
      whatToExpect: [
        { title: "Curation", description: "We curate quality talent and events.", icon: "check" },
        { title: "Reach", description: "Get global visibility across our audience.", icon: "users" },
        { title: "Spotlights", description: "Opportunities for editorial and features.", icon: "star" },
      ],
      requirements: {
        title: "What You’ll Need",
        items: [
          "Accurate contact information",
          "Links to your portfolio or event page",
          "High-quality images and details",
        ],
      },
      faq: [
        { question: "Is there any cost?", answer: "No. Submissions are free." },
        { question: "When will I hear back?", answer: "We typically review within 2–3 weeks." },
      ],
    },
  }

  return JSON.stringify(templates[pageKey] || {}, null, 2)
}
