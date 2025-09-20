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
  }

  return JSON.stringify(templates[pageKey] || {}, null, 2)
}
