"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { countryNameToIso2 } from "@/lib/country-codes"
import { AFRICAN_COUNTRIES } from "@/lib/countries"
import { useRouter } from "next/navigation"

const WORLD_GEOJSON_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

type CountsByIso2 = Record<string, number>

interface AfricaMapProps {
  countsByIso2: CountsByIso2
  className?: string
}

const africanIso2Set: Set<string> = new Set(
  AFRICAN_COUNTRIES.map((name) => countryNameToIso2(name)).filter(Boolean) as string[],
)

function getChoropleth(count: number) {
  if (count <= 0) {
    return {
      fill: "var(--muted)",
      fillOpacity: 1,
    }
  }
  // Use primary with stepped opacity to keep brand scheme intact
  if (count <= 2) {
    return { fill: "var(--primary)", fillOpacity: 0.3 }
  }
  if (count <= 5) {
    return { fill: "var(--primary)", fillOpacity: 0.5 }
  }
  if (count <= 10) {
    return { fill: "var(--primary)", fillOpacity: 0.7 }
  }
  return { fill: "var(--primary)", fillOpacity: 0.9 }
}

type TooltipState = {
  visible: boolean
  x: number
  y: number
  name: string
  count: number
}

export function AfricaMap({ countsByIso2, className }: AfricaMapProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    name: "",
    count: 0,
  })
  const router = useRouter()

  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 350, center: [20, 5] }} // Centered on Africa
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_GEOJSON_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name: string | undefined = (geo.properties as any)?.name
              if (!name) return null
              const iso2 = countryNameToIso2(name)
              if (!iso2 || !africanIso2Set.has(iso2)) return null

              const count = countsByIso2[iso2] || 0
              const { fill, fillOpacity } = getChoropleth(count)
              const isClickable = count > 0

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  tabIndex={0}
                  style={{
                    default: {
                      fill,
                      fillOpacity,
                      outline: "none",
                      stroke: "var(--border)",
                      strokeWidth: 0.5,
                      transition: "fill 150ms ease, fill-opacity 150ms ease",
                      cursor: isClickable ? "pointer" : "default",
                    },
                    hover: {
                      fill: "var(--primary)",
                      fillOpacity: 1,
                      outline: "none",
                      stroke: "var(--border)",
                      strokeWidth: 0.6,
                      cursor: isClickable ? "pointer" : "default",
                    },
                    pressed: {
                      fill: "var(--primary)",
                      fillOpacity: 1,
                      outline: "none",
                    },
                  }}
                  onMouseEnter={(e) => {
                    const { clientX, clientY } = e as unknown as MouseEvent
                    setTooltip({
                      visible: true,
                      x: clientX,
                      y: clientY,
                      name,
                      count,
                    })
                  }}
                  onMouseMove={(e) => {
                    const { clientX, clientY } = e as unknown as MouseEvent
                    setTooltip((t) => ({ ...t, x: clientX, y: clientY }))
                  }}
                  onMouseLeave={() => setTooltip((t) => ({ ...t, visible: false }))}
                  onClick={() => {
                    if (isClickable && iso2) {
                      router.push(`/designers?designerIso2=${iso2}`)
                    }
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && isClickable && iso2) {
                      e.preventDefault()
                      router.push(`/designers?designerIso2=${iso2}`)
                    }
                  }}
                >
                  {/* Keep native tooltip for accessibility/fallback */}
                  <title>{`${name}: ${count} ${count === 1 ? "designer" : "designers"}`}</title>
                </Geography>
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip.visible && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
          style={{
            top: tooltip.y + 12,
            left: tooltip.x + 12,
          }}
          role="status"
          aria-live="polite"
        >
          <span className="font-medium">{tooltip.name}</span>
          <span className="mx-1 text-muted-foreground">•</span>
          <span>
            {tooltip.count} {tooltip.count === 1 ? "designer" : "designers"}
          </span>
          {tooltip.count > 0 && <span className="ml-1 text-muted-foreground">(click to view)</span>}
        </div>
      )}
    </div>
  )
}
