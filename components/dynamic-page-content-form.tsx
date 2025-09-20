"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DynamicPageContentFormProps {
  initialData?: {
    page_key: string
    content: any
  }
  onSubmit: (data: { page_key: string; content: any }) => void
  isLoading?: boolean
}

export function DynamicPageContentForm({ initialData, onSubmit, isLoading }: DynamicPageContentFormProps) {
  const [pageKey, setPageKey] = useState(initialData?.page_key || "")
  const [content, setContent] = useState(initialData?.content || {})

  const pageOptions = [
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
  ]

  const renderFormFields = () => {
    switch (pageKey) {
      case "faq":
        return renderFAQForm()
      case "about":
        return renderAboutForm()
      case "coming_soon":
        return renderComingSoonForm()
      case "submit":
        return renderSubmitForm()
      case "footer":
        return renderFooterForm()
      default:
        return renderGenericForm()
    }
  }

  const renderFAQForm = () => {
    const hero = content.hero || {}
    const questions = content.questions || []
    const stillHaveQuestions = content.stillHaveQuestions || {}

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={hero.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, title: e.target.value },
                  })
                }
                placeholder="Frequently Asked Questions"
              />
            </div>
            <div>
              <Label htmlFor="hero-description">Description</Label>
              <Textarea
                id="hero-description"
                value={hero.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, description: e.target.value },
                  })
                }
                placeholder="Find answers to common questions..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>FAQ Questions</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newQuestions = [...questions, { question: "", answer: "" }]
                setContent({ ...content, questions: newQuestions })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant="secondary">Question {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newQuestions = questions.filter((_: any, i: number) => i !== index)
                      setContent({ ...content, questions: newQuestions })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Question</Label>
                    <Input
                      value={q.question || ""}
                      onChange={(e) => {
                        const newQuestions = [...questions]
                        newQuestions[index] = { ...q, question: e.target.value }
                        setContent({ ...content, questions: newQuestions })
                      }}
                      placeholder="Enter your question..."
                    />
                  </div>
                  <div>
                    <Label>Answer</Label>
                    <Textarea
                      value={q.answer || ""}
                      onChange={(e) => {
                        const newQuestions = [...questions]
                        newQuestions[index] = { ...q, answer: e.target.value }
                        setContent({ ...content, questions: newQuestions })
                      }}
                      placeholder="Enter the answer..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Still Have Questions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Still Have Questions Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={stillHaveQuestions.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stillHaveQuestions: { ...stillHaveQuestions, title: e.target.value },
                  })
                }
                placeholder="Still have questions?"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={stillHaveQuestions.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stillHaveQuestions: { ...stillHaveQuestions, description: e.target.value },
                  })
                }
                placeholder="Can't find what you're looking for?"
              />
            </div>
            <div>
              <Label>Button Text</Label>
              <Input
                value={stillHaveQuestions.buttonText || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stillHaveQuestions: { ...stillHaveQuestions, buttonText: e.target.value },
                  })
                }
                placeholder="Contact Us"
              />
            </div>
            <div>
              <Label>Button URL</Label>
              <Input
                value={stillHaveQuestions.buttonUrl || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stillHaveQuestions: { ...stillHaveQuestions, buttonUrl: e.target.value },
                  })
                }
                placeholder="/contact"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderAboutForm = () => {
    const hero = content.hero || {}
    const mission = content.mission || {}
    const values = content.values || []
    const cta = content.cta || {}

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={hero.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, title: e.target.value },
                  })
                }
                placeholder="About Us"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={hero.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, description: e.target.value },
                  })
                }
                placeholder="Tell your story..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary Button Text</Label>
                <Input
                  value={hero.primaryButtonText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...hero, primaryButtonText: e.target.value },
                    })
                  }
                  placeholder="Get Started"
                />
              </div>
              <div>
                <Label>Primary Button URL</Label>
                <Input
                  value={hero.primaryButtonUrl || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...hero, primaryButtonUrl: e.target.value },
                    })
                  }
                  placeholder="/submit"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Secondary Button Text</Label>
                <Input
                  value={hero.secondaryButtonText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...hero, secondaryButtonText: e.target.value },
                    })
                  }
                  placeholder="Learn More"
                />
              </div>
              <div>
                <Label>Secondary Button URL</Label>
                <Input
                  value={hero.secondaryButtonUrl || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...hero, secondaryButtonUrl: e.target.value },
                    })
                  }
                  placeholder="/about"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission Section */}
        <Card>
          <CardHeader>
            <CardTitle>Mission Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Badge Text</Label>
              <Input
                value={mission.badge || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...mission, badge: e.target.value },
                  })
                }
                placeholder="Our Mission"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={mission.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...mission, title: e.target.value },
                  })
                }
                placeholder="Mission Title"
              />
            </div>
            <div>
              <Label>Description 1</Label>
              <Textarea
                value={mission.description1 || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...mission, description1: e.target.value },
                  })
                }
                placeholder="First paragraph..."
                rows={3}
              />
            </div>
            <div>
              <Label>Description 2</Label>
              <Textarea
                value={mission.description2 || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    mission: { ...mission, description2: e.target.value },
                  })
                }
                placeholder="Second paragraph..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Values</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newValues = [...values, { title: "", description: "" }]
                setContent({ ...content, values: newValues })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {values.map((value: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant="secondary">Value {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newValues = values.filter((_: any, i: number) => i !== index)
                      setContent({ ...content, values: newValues })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={value.title || ""}
                      onChange={(e) => {
                        const newValues = [...values]
                        newValues[index] = { ...value, title: e.target.value }
                        setContent({ ...content, values: newValues })
                      }}
                      placeholder="Value title..."
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={value.description || ""}
                      onChange={(e) => {
                        const newValues = [...values]
                        newValues[index] = { ...value, description: e.target.value }
                        setContent({ ...content, values: newValues })
                      }}
                      placeholder="Value description..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card>
          <CardHeader>
            <CardTitle>Call to Action Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={cta.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    cta: { ...cta, title: e.target.value },
                  })
                }
                placeholder="Ready to get started?"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={cta.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    cta: { ...cta, description: e.target.value },
                  })
                }
                placeholder="Join our community today..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={cta.buttonText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...cta, buttonText: e.target.value },
                    })
                  }
                  placeholder="Get Started"
                />
              </div>
              <div>
                <Label>Button URL</Label>
                <Input
                  value={cta.buttonUrl || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      cta: { ...cta, buttonUrl: e.target.value },
                    })
                  }
                  placeholder="/submit"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderComingSoonForm = () => {
    const features = content.features || []

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Badge</Label>
              <Input
                value={content.badge || ""}
                onChange={(e) => setContent({ ...content, badge: e.target.value })}
                placeholder="Coming Soon"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                value={content.title || ""}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
                placeholder="Something Amazing is Coming"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={content.description || ""}
                onChange={(e) => setContent({ ...content, description: e.target.value })}
                placeholder="We're working hard to bring you something special..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Features</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newFeatures = [...features, { emoji: "", title: "", description: "" }]
                setContent({ ...content, features: newFeatures })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant="secondary">Feature {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newFeatures = features.filter((_: any, i: number) => i !== index)
                      setContent({ ...content, features: newFeatures })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Emoji</Label>
                    <Input
                      value={feature.emoji || ""}
                      onChange={(e) => {
                        const newFeatures = [...features]
                        newFeatures[index] = { ...feature, emoji: e.target.value }
                        setContent({ ...content, features: newFeatures })
                      }}
                      placeholder="🎨"
                    />
                  </div>
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={feature.title || ""}
                      onChange={(e) => {
                        const newFeatures = [...features]
                        newFeatures[index] = { ...feature, title: e.target.value }
                        setContent({ ...content, features: newFeatures })
                      }}
                      placeholder="Feature title..."
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={feature.description || ""}
                      onChange={(e) => {
                        const newFeatures = [...features]
                        newFeatures[index] = { ...feature, description: e.target.value }
                        setContent({ ...content, features: newFeatures })
                      }}
                      placeholder="Feature description..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderSubmitForm = () => {
    const hero = content.hero || {}
    const submitCard = content.submitCard || {}
    const whatToExpect = content.whatToExpect || []
    const requirements = content.requirements || {}
    const faq = content.faq || []

    return (
      <div className="space-y-6">
        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={hero.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, title: e.target.value },
                  })
                }
                placeholder="Join Our Directory"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={hero.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, description: e.target.value },
                  })
                }
                placeholder="Submit your application..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Card */}
        <Card>
          <CardHeader>
            <CardTitle>Submit Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={submitCard.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    submitCard: { ...submitCard, title: e.target.value },
                  })
                }
                placeholder="Submit Your Application"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={submitCard.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    submitCard: { ...submitCard, description: e.target.value },
                  })
                }
                placeholder="Share your work and philosophy..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Button Text</Label>
                <Input
                  value={submitCard.buttonText || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      submitCard: { ...submitCard, buttonText: e.target.value },
                    })
                  }
                  placeholder="Submit Application"
                />
              </div>
              <div>
                <Label>Button URL</Label>
                <Input
                  value={submitCard.buttonUrl || ""}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      submitCard: { ...submitCard, buttonUrl: e.target.value },
                    })
                  }
                  placeholder="https://forms.gle/..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What to Expect */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>What to Expect</CardTitle>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const newExpectations = [...whatToExpect, { title: "", description: "" }]
                setContent({ ...content, whatToExpect: newExpectations })
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {whatToExpect.map((item: any, index: number) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Badge variant="secondary">Item {index + 1}</Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const newExpectations = whatToExpect.filter((_: any, i: number) => i !== index)
                      setContent({ ...content, whatToExpect: newExpectations })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={item.title || ""}
                      onChange={(e) => {
                        const newExpectations = [...whatToExpect]
                        newExpectations[index] = { ...item, title: e.target.value }
                        setContent({ ...content, whatToExpect: newExpectations })
                      }}
                      placeholder="Expectation title..."
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={item.description || ""}
                      onChange={(e) => {
                        const newExpectations = [...whatToExpect]
                        newExpectations[index] = { ...item, description: e.target.value }
                        setContent({ ...content, whatToExpect: newExpectations })
                      }}
                      placeholder="Expectation description..."
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={requirements.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    requirements: { ...requirements, title: e.target.value },
                  })
                }
                placeholder="Application Requirements"
              />
            </div>
            <div>
              <Label>Items (one per line)</Label>
              <Textarea
                value={(requirements.items || []).join("\n")}
                onChange={(e) =>
                  setContent({
                    ...content,
                    requirements: {
                      ...requirements,
                      items: e.target.value.split("\n").filter((item) => item.trim()),
                    },
                  })
                }
                placeholder="Portfolio showcasing your design work&#10;Professional biography and design philosophy&#10;High-quality images of your collections"
                rows={5}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderFooterForm = () => {
    const brand = content.brand || {}
    const company = content.company || {}
    const social = content.social || {}
    const newsletter = content.newsletter || {}

    return (
      <div className="space-y-6">
        {/* Brand Section */}
        <Card>
          <CardHeader>
            <CardTitle>Brand Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Brand Name</Label>
              <Input
                value={brand.name || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    brand: { ...brand, name: e.target.value },
                  })
                }
                placeholder="Your Brand Name"
              />
            </div>
            <div>
              <Label>Brand Description</Label>
              <Textarea
                value={brand.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    brand: { ...brand, description: e.target.value },
                  })
                }
                placeholder="Brief description of your brand..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Company Links */}
        <Card>
          <CardHeader>
            <CardTitle>Company Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Section Title</Label>
              <Input
                value={company.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    company: { ...company, title: e.target.value },
                  })
                }
                placeholder="Company"
              />
            </div>
            <div>
              <Label>Links (JSON format)</Label>
              <Textarea
                value={JSON.stringify(company.links || [], null, 2)}
                onChange={(e) => {
                  try {
                    const links = JSON.parse(e.target.value)
                    setContent({
                      ...content,
                      company: { ...company, links },
                    })
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                placeholder='[{"label": "About Us", "url": "/about"}]'
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Instagram URL</Label>
              <Input
                value={social.instagram || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...social, instagram: e.target.value },
                  })
                }
                placeholder="https://instagram.com/yourhandle"
              />
            </div>
            <div>
              <Label>Facebook URL</Label>
              <Input
                value={social.facebook || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...social, facebook: e.target.value },
                  })
                }
                placeholder="https://facebook.com/yourpage"
              />
            </div>
            <div>
              <Label>WhatsApp URL</Label>
              <Input
                value={social.whatsapp || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    social: { ...social, whatsapp: e.target.value },
                  })
                }
                placeholder="https://whatsapp.com/channel/..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Newsletter */}
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newsletter.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...newsletter, title: e.target.value },
                  })
                }
                placeholder="Stay Updated"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={newsletter.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    newsletter: { ...newsletter, description: e.target.value },
                  })
                }
                placeholder="Get the latest updates..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Copyright */}
        <Card>
          <CardHeader>
            <CardTitle>Copyright</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Copyright Text</Label>
              <Input
                value={content.copyright || ""}
                onChange={(e) => setContent({ ...content, copyright: e.target.value })}
                placeholder="© 2025 Your Company. All rights reserved."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderGenericForm = () => {
    const hero = content.hero || {}

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={hero.title || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, title: e.target.value },
                  })
                }
                placeholder="Page Title"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={hero.description || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...hero, description: e.target.value },
                  })
                }
                placeholder="Page description..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Raw JSON (Advanced)</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Content JSON</Label>
              <Textarea
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    const newContent = JSON.parse(e.target.value)
                    setContent(newContent)
                  } catch (error) {
                    // Invalid JSON, don't update
                  }
                }}
                rows={10}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ page_key: pageKey, content })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Page Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="page-key">Page Key</Label>
            <Select value={pageKey} onValueChange={setPageKey}>
              <SelectTrigger>
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pageOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option.replace("_", " ").toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {pageKey && renderFormFields()}

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isLoading || !pageKey}>
          {isLoading ? "Saving..." : "Save Content"}
        </Button>
      </div>
    </form>
  )
}
