/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useRouter } from "next/navigation"
import { countryNameToIso2 } from "@/lib/country-codes"

const WORLD_GEOJSON_URL =
  "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

type CountsByIso2 = Record<string, number>

interface WorldMapProps {
  countsByIso2: CountsByIso2
  className?: string
}

function getChoropleth(count: number) {
  if (count <= 0) return { fill: "var(--muted)", fillOpacity: 1 }
  if (count <= 2) return { fill: "var(--primary)", fillOpacity: 0.3 }
  if (count <= 5) return { fill: "var(--primary)", fillOpacity: 0.5 }
  if (count <= 10) return { fill: "var(--primary)", fillOpacity: 0.7 }
  return { fill: "var(--primary)", fillOpacity: 0.9 }
}

export function WorldMap({ countsByIso2, className }: WorldMapProps) {
  const router = useRouter()
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    name: string
    count: number
  }>({ visible: false, x: 0, y: 0, name: "", count: 0 })

  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120 }}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_GEOJSON_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = (geo.properties as any)?.name
              if (!name) return null
              const iso2 = countryNameToIso2(name)
              if (!iso2) return null

              const count = countsByIso2[iso2] || 0
              const { fill, fillOpacity } = getChoropleth(count)
              const isRoutable = count > 0

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
                      cursor: isRoutable ? "pointer" : "default",
                    },
                    hover: {
                      fill: "var(--primary)",
                      fillOpacity: 1,
                      outline: "none",
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
                  onMouseLeave={() =>
                    setTooltip((t) => ({ ...t, visible: false }))
                  }
                  onClick={() => {
                    if (isRoutable && iso2)
                      router.push(`/designers?productionIso2=${iso2}`)
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === "Enter" || e.key === " ") && isRoutable && iso2) {
                      e.preventDefault()
                      router.push(`/designers?productionIso2=${iso2}`)
                    }
                  }}
                >
                  <title>{`${name}: ${count} ${
                    count === 1 ? "designer" : "designers"
                  }`}</title>
                </Geography>
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip.visible && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md"
          style={{ top: tooltip.y + 12, left: tooltip.x + 12 }}
        >
          <span className="font-medium">{tooltip.name}</span>
          <span className="mx-1 text-muted-foreground">•</span>
          <span>
            {tooltip.count} {tooltip.count === 1 ? "designer" : "designers"}
          </span>
        </div>
      )}
    </div>
  )
}
