"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { countryNameToIso2 } from "@/lib/country-codes"
import { AFRICAN_COUNTRIES } from "@/lib/countries"

const WORLD_GEOJSON_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

type CountsByIso2 = Record<string, number>

interface AfricaMapProps {
  countsByIso2: CountsByIso2
  className?: string
}

const africanIso2Set: Set<string> = new Set(
  AFRICAN_COUNTRIES.map((name) => countryNameToIso2(name)).filter(Boolean) as string[],
)

export function AfricaMap({ countsByIso2, className }: AfricaMapProps) {
  return (
    <div className={className}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 350, center: [20, 5] }} // Centered roughly on Africa
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={WORLD_GEOJSON_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              // Many datasets expose the country name at different keys; this one uses "name"
              const name: string | undefined = (geo.properties as any)?.name
              if (!name) return null
              const iso2 = countryNameToIso2(name)
              if (!iso2 || !africanIso2Set.has(iso2)) return null

              const count = countsByIso2[iso2] || 0

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  tabIndex={0}
                  style={{
                    default: { fill: "var(--muted)", outline: "none", stroke: "var(--border)", strokeWidth: 0.5 },
                    hover: { fill: "var(--primary-50, #dbeafe)", outline: "none" },
                    pressed: { fill: "var(--primary-100, #bfdbfe)", outline: "none" },
                  }}
                >
                  {/* Native tooltip for accessibility and simplicity */}
                  <title>{`${name}: ${count} ${count === 1 ? "designer" : "designers"}`}</title>
                </Geography>
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
