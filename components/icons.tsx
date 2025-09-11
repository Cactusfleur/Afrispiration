import { Leaf, Flag, Factory } from "lucide-react"

interface CountryFlagProps {
  country: string
  className?: string
}

export function CountryFlag({ country, className = "w-4 h-4" }: CountryFlagProps) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <Flag className="w-3 h-3" />
      <span className="text-xs font-medium">{country}</span>
    </div>
  )
}

interface MadeInIconProps {
  country: string
  className?: string
}

export function MadeInIcon({ country, className = "w-4 h-4" }: MadeInIconProps) {
  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      <Factory className="w-3 h-3" />
      <span className="text-xs font-medium">Made in {country}</span>
    </div>
  )
}

interface SustainabilityIconProps {
  className?: string
}

export function SustainabilityIcon({ className = "w-4 h-4" }: SustainabilityIconProps) {
  return <Leaf className={`text-green-600 ${className}`} />
}
