"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AfricaMap } from "@/components/africa-map"
import { WorldMap } from "@/components/world-map"

type CountsByIso2 = Record<string, number>

interface MapExplorerProps {
  designerCountsByIso2: CountsByIso2
  productionCountsByIso2: CountsByIso2
  className?: string
}

export function MapExplorer({ designerCountsByIso2, productionCountsByIso2, className }: MapExplorerProps) {
  const [productionMode, setProductionMode] = useState(false)

  return (
    <div className={className}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <Label htmlFor="map-mode" className="text-sm text-muted-foreground">
          Designer Location
        </Label>
        <Switch
          id="map-mode"
          checked={productionMode}
          onCheckedChange={(checked) => setProductionMode(Boolean(checked))}
          aria-label="Toggle map mode"
        />
        <Label htmlFor="map-mode" className="text-sm text-muted-foreground">
          Production Location
        </Label>
      </div>

      <div className="rounded-lg border bg-background p-4">
        {productionMode ? (
          <WorldMap countsByIso2={productionCountsByIso2} />
        ) : (
          <AfricaMap countsByIso2={designerCountsByIso2} />
        )}
      </div>
    </div>
  )
}
