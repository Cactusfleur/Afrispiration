"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Mail, Check, X } from "lucide-react"

interface ComingSoonSignupProps {
  title?: string
  description?: string
  interests?: string[]
  className?: string
}

export function ComingSoonSignup({
  title = "Get Early Access",
  description = "Be the first to know when we launch new features and designer collections.",
  interests = ["Fashion Design", "Sustainable Fashion", "Luxury Brands", "Emerging Designers", "Fashion Events"],
  className = "",
}: ComingSoonSignupProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [referralSource, setReferralSource] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("coming_soon_signups").insert([
        {
          email,
          name: name || null,
          interests: selectedInterests.length > 0 ? selectedInterests : null,
          referral_source: referralSource || null,
        },
      ])

      if (insertError) throw insertError

      setIsSuccess(true)
      setEmail("")
      setName("")
      setSelectedInterests([])
      setReferralSource("")
    } catch (error: any) {
      if (error.code === "23505") {
        setError("This email is already registered for updates.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">You're on the list!</h3>
          <p className="text-muted-foreground">
            Thank you for signing up. We'll keep you updated on our latest features and designer collections.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <Label>Interests (Optional)</Label>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Referral Source */}
          <div className="space-y-2">
            <Label htmlFor="referral">How did you hear about us? (Optional)</Label>
            <select
              id="referral"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select source</option>
              <option value="Social Media">Social Media</option>
              <option value="Google Search">Google Search</option>
              <option value="Friend Referral">Friend Referral</option>
              <option value="Fashion Blog">Fashion Blog</option>
              <option value="Industry Event">Industry Event</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
              <X className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Get Early Access"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  )
}
