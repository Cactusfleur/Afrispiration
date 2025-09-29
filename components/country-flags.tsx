"use client"
import { countryNameToIso2 } from "@/lib/country-codes"

interface CountryFlagsProps {
  countries: string[] | undefined | null
  size?: 16 | 20 | 24 // pixel width of each flag
  className?: string
}

/**
 * Renders inline country flags from a list of country names.
 * Uses flagcdn.com with ISO-2 codes. Unknown names are skipped (text should still be shown by caller).
 */
export function CountryFlags({ countries, size = 20, className }: CountryFlagsProps) {
  if (!countries || countries.length === 0) return null

  const width = size // e.g. w20 assets on flagcdn
  const retina = size * 2

  return (
    <div className={`flex items-center gap-1 ${className || ""}`} aria-label="Country flags">
      {countries.map((name, idx) => {
        const code = countryNameToIso2(name)
        if (!code) return null
        const codeLower = code.toLowerCase()

        return (
          <img
            key={`${name}-${idx}`}
            src={`https://flagcdn.com/w${width}/${codeLower}.png`}
            srcSet={`https://flagcdn.com/w${retina}/${codeLower}.png 2x`}
            width={width}
            height={Math.round((2 / 3) * width)} // flags are 3:2, so height = 2/3 width
            alt={`Flag of ${name}`}
            className="rounded-[2px] shadow-sm ml-0.5"
            loading="lazy"
          />
        )
      })}
    </div>
  )
}
