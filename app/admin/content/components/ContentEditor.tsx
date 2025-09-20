"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Trash2, GripVertical } from "lucide-react"

interface ContentEditorProps {
  pageKey: string
  content: any
  onSave: (content: any) => void
  isSaving: boolean
}

export function ContentEditor({ pageKey, content, onSave, isSaving }: ContentEditorProps) {
  const [editedContent, setEditedContent] = useState(content)

  useEffect(() => {
    setEditedContent(content)
  }, [content])

  const updateField = (path: string[], value: any) => {
    setEditedContent((prev: any) => {
      const newContent = JSON.parse(JSON.stringify(prev))
      let current = newContent
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) current[path[i]] = {}
        current = current[path[i]]
      }
      
      current[path[path.length - 1]] = value
      return newContent
    })
  }

  const addArrayItem = (path: string[], defaultItem: any) => {
    setEditedContent((prev: any) => {
      const newContent = JSON.parse(JSON.stringify(prev))
      let current = newContent
      
      for (const key of path) {
        if (!current[key]) current[key] = []
        current = current[key]
      }
      
      if (Array.isArray(current)) {
        current.push(defaultItem)
      }
      
      return newContent
    })
  }

  const removeArrayItem = (path: string[], index: number) => {
    setEditedContent((prev: any) => {
      const newContent = JSON.parse(JSON.stringify(prev))
      let current = newContent
      
      for (const key of path) {
        current = current[key]
      }
      
      if (Array.isArray(current)) {
        current.splice(index, 1)
      }
      
      return newContent
    })
  }

  const renderEditor = () => {
    switch (pageKey) {
      case 'faq':
        return renderFAQEditor()
      case 'about':
        return renderAboutEditor()
      case 'coming_soon':
        return renderComingSoonEditor()
      case 'submit':
        return renderSubmitEditor()
      case 'events':
      case 'blog':
      case 'designers':
        return renderSimpleHeroEditor()
      case 'footer':
        return renderFooterEditor()
      default:
        return renderJSONEditor()
    }
  }

  const renderFAQEditor = () => (
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
              value={editedContent.hero?.title || ""}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.hero?.description || ""}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Questions & Answers</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["questions"], { question: "", answer: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Question
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedContent.questions?.map((qa: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Question {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["questions"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <Label>Question</Label>
                  <Input
                    value={qa.question || ""}
                    onChange={(e) => updateField(["questions", index, "question"], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    value={qa.answer || ""}
                    onChange={(e) => updateField(["questions", index, "answer"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Still Have Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Still Have Questions Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.stillHaveQuestions?.title || ""}
              onChange={(e) => updateField(["stillHaveQuestions", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.stillHaveQuestions?.description || ""}
              onChange={(e) => updateField(["stillHaveQuestions", "description"], e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Button Text</Label>
            <Input
              value={editedContent.stillHaveQuestions?.buttonText || ""}
              onChange={(e) => updateField(["stillHaveQuestions", "buttonText"], e.target.value)}
            />
          </div>
          <div>
            <Label>Button URL</Label>
            <Input
              value={editedContent.stillHaveQuestions?.buttonUrl || ""}
              onChange={(e) => updateField(["stillHaveQuestions", "buttonUrl"], e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAboutEditor = () => (
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
              value={editedContent.hero?.title || ""}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.hero?.description || ""}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Primary Button Text</Label>
              <Input
                value={editedContent.hero?.primaryButtonText || ""}
                onChange={(e) => updateField(["hero", "primaryButtonText"], e.target.value)}
              />
            </div>
            <div>
              <Label>Primary Button URL</Label>
              <Input
                value={editedContent.hero?.primaryButtonUrl || ""}
                onChange={(e) => updateField(["hero", "primaryButtonUrl"], e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Secondary Button Text</Label>
              <Input
                value={editedContent.hero?.secondaryButtonText || ""}
                onChange={(e) => updateField(["hero", "secondaryButtonText"], e.target.value)}
              />
            </div>
            <div>
              <Label>Secondary Button URL</Label>
              <Input
                value={editedContent.hero?.secondaryButtonUrl || ""}
                onChange={(e) => updateField(["hero", "secondaryButtonUrl"], e.target.value)}
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
              value={editedContent.mission?.badge || ""}
              onChange={(e) => updateField(["mission", "badge"], e.target.value)}
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.mission?.title || ""}
              onChange={(e) => updateField(["mission", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description 1</Label>
            <Textarea
              value={editedContent.mission?.description1 || ""}
              onChange={(e) => updateField(["mission", "description1"], e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label>Description 2</Label>
            <Textarea
              value={editedContent.mission?.description2 || ""}
              onChange={(e) => updateField(["mission", "description2"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Values */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Values</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["values"], { title: "", description: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Value
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedContent.values?.map((value: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Value {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["values"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={value.title || ""}
                    onChange={(e) => updateField(["values", index, "title"], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={value.description || ""}
                    onChange={(e) => updateField(["values", index, "description"], e.target.value)}
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
          <CardTitle>Call-to-Action Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.cta?.title || ""}
              onChange={(e) => updateField(["cta", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.cta?.description || ""}
              onChange={(e) => updateField(["cta", "description"], e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Button Text</Label>
              <Input
                value={editedContent.cta?.buttonText || ""}
                onChange={(e) => updateField(["cta", "buttonText"], e.target.value)}
              />
            </div>
            <div>
              <Label>Button URL</Label>
              <Input
                value={editedContent.cta?.buttonUrl || ""}
                onChange={(e) => updateField(["cta", "buttonUrl"], e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderComingSoonEditor = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Badge Text</Label>
            <Input
              value={editedContent.badge || ""}
              onChange={(e) => updateField(["badge"], e.target.value)}
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.title || ""}
              onChange={(e) => updateField(["title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.description || ""}
              onChange={(e) => updateField(["description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Features</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["features"], { emoji: "", title: "", description: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Feature
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedContent.features?.map((feature: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Feature {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["features"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Emoji</Label>
                    <Input
                      value={feature.emoji || ""}
                      onChange={(e) => updateField(["features", index, "emoji"], e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Title</Label>
                    <Input
                      value={feature.title || ""}
                      onChange={(e) => updateField(["features", index, "title"], e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={feature.description || ""}
                    onChange={(e) => updateField(["features", index, "description"], e.target.value)}
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

  const renderSubmitEditor = () => (
    <div className="space-y-6">
      {/* Hero */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.hero?.title || ""}
              onChange={(e) => updateField(["hero", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.hero?.description || ""}
              onChange={(e) => updateField(["hero", "description"], e.target.value)}
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
              value={editedContent.submitCard?.title || ""}
              onChange={(e) => updateField(["submitCard", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.submitCard?.description || ""}
              onChange={(e) => updateField(["submitCard", "description"], e.target.value)}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Button Text</Label>
              <Input
                value={editedContent.submitCard?.buttonText || ""}
                onChange={(e) => updateField(["submitCard", "buttonText"], e.target.value)}
              />
            </div>
            <div>
              <Label>Button URL</Label>
              <Input
                value={editedContent.submitCard?.buttonUrl || ""}
                onChange={(e) => updateField(["submitCard", "buttonUrl"], e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What to Expect */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>What to Expect</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["whatToExpect"], { title: "", description: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedContent.whatToExpect?.map((item: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Item {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["whatToExpect"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={item.title || ""}
                    onChange={(e) => updateField(["whatToExpected", index, "title"], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={item.description || ""}
                    onChange={(e) => updateField(["whatToExpect", index, "description"], e.target.value)}
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
          <CardTitle>Application Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={editedContent.requirements?.title || ""}
              onChange={(e) => updateField(["requirements", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Requirements List</Label>
            <div className="space-y-2">
              {editedContent.requirements?.items?.map((item: string, index: number) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => updateField(["requirements", "items", index], e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["requirements", "items"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem(["requirements", "items"], "")}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Requirement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>FAQ Section</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["faq"], { question: "", answer: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add FAQ
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {editedContent.faq?.map((qa: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">FAQ {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["faq"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div>
                  <Label>Question</Label>
                  <Input
                    value={qa.question || ""}
                    onChange={(e) => updateField(["faq", index, "question"], e.target.value)}
                  />
                </div>
                <div>
                  <Label>Answer</Label>
                  <Textarea
                    value={qa.answer || ""}
                    onChange={(e) => updateField(["faq", index, "answer"], e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const renderSimpleHeroEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            value={editedContent.hero?.title || ""}
            onChange={(e) => updateField(["hero", "title"], e.target.value)}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={editedContent.hero?.description || ""}
            onChange={(e) => updateField(["hero", "description"], e.target.value)}
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderFooterEditor = () => (
    <div className="space-y-6">
      {/* Brand */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Site Name</Label>
            <Input
              value={editedContent.brand?.name || ""}
              onChange={(e) => updateField(["brand", "name"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.brand?.description || ""}
              onChange={(e) => updateField(["brand", "description"], e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Links */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Company Section</CardTitle>
            <Button
              size="sm"
              onClick={() => addArrayItem(["company", "links"], { label: "", url: "" })}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Section Title</Label>
            <Input
              value={editedContent.company?.title || ""}
              onChange={(e) => updateField(["company", "title"], e.target.value)}
            />
          </div>
          {editedContent.company?.links?.map((link: any, index: number) => (
            <Card key={index} className="border-l-4 border-l-primary">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">Link {index + 1}</Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                    onClick={() => removeArrayItem(["company", "links"], index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Label</Label>
                    <Input
                      value={link.label || ""}
                      onChange={(e) => updateField(["company", "links", index, "label"], e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input
                      value={link.url || ""}
                      onChange={(e) => updateField(["company", "links", index, "url"], e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Instagram URL</Label>
            <Input
              value={editedContent.social?.instagram || ""}
              onChange={(e) => updateField(["social", "instagram"], e.target.value)}
            />
          </div>
          <div>
            <Label>Facebook URL</Label>
            <Input
              value={editedContent.social?.facebook || ""}
              onChange={(e) => updateField(["social", "facebook"], e.target.value)}
            />
          </div>
          <div>
            <Label>WhatsApp URL</Label>
            <Input
              value={editedContent.social?.whatsapp || ""}
              onChange={(e) => updateField(["social", "whatsapp"], e.target.value)}
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
              value={editedContent.newsletter?.title || ""}
              onChange={(e) => updateField(["newsletter", "title"], e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={editedContent.newsletter?.description || ""}
              onChange={(e) => updateField(["newsletter", "description"], e.target.value)}
              rows={2}
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
              value={editedContent.copyright || ""}
              onChange={(e) => updateField(["copyright"], e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderJSONEditor = () => (
    <Card>
      <CardHeader>
        <CardTitle>Raw JSON Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={JSON.stringify(editedContent, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value)
              setEditedContent(parsed)
            } catch (error) {
              // Invalid JSON, don't update
            }
          }}
          rows={20}
          className="font-mono text-sm"
        />
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {renderEditor()}
      
      <div className="flex justify-end">
        <Button 
          onClick={() => onSave(editedContent)}
          disabled={isSaving}
          size="lg"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}