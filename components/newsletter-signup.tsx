"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { Mail, Check } from "lucide-react"

interface NewsletterSignupProps {
  placeholder?: string
  buttonText?: string
  className?: string
}

export function NewsletterSignup({
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
          referral_source: "Newsletter",
        },
      ])

      if (insertError) throw insertError

      setIsSuccess(true)
      setEmail("")
    } catch (error: any) {
      if (error.code === "23505") {
        setError("Already subscribed!")
      } else {
        setError("Failed to subscribe")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={`flex items-center gap-2 text-green-600 ${className}`}>
        <Check className="h-4 w-4" />
        <span className="text-sm">Subscribed successfully!</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background"
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <Mail className="h-4 w-4 animate-pulse" />
        ) : (
          <>
            <Mail className="h-4 w-4 mr-2" />
            {buttonText}
          </>
        )}
      </Button>
    </form>
  )
}
