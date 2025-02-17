"use client"

import { useState } from "react"
import { Cloud, Star, Heart, Sun, Moon, Zap, Leaf, Diamond, Crown, Rocket } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ReactNode } from "react"

const icons = [
  { name: "Cloud", component: <Cloud /> },
  { name: "Star", component: <Star /> },
  { name: "Heart", component: <Heart /> },
  { name: "Sun", component: <Sun /> },
  { name: "Moon", component: <Moon /> },
  { name: "Zap", component: <Zap /> },
  { name: "Leaf", component: <Leaf /> },
  { name: "Diamond", component: <Diamond /> },
  { name: "Crown", component: <Crown /> },
  { name: "Rocket", component: <Rocket /> },
]

interface IconSelectorProps {
  selectedIcon: ReactNode | null
  onSelect: (icon: ReactNode | null) => void
  rotation: number
  onRotationChange: (rotation: number) => void
}

export default function IconSelector({ selectedIcon, onSelect, rotation, onRotationChange }: IconSelectorProps) {
  const filteredIcons = icons.filter((icon) => icon.name.toLowerCase().includes(""))

  return (
    <div className="space-y-4">
      <div>
        <Label>Icon</Label>
        <ScrollArea className="h-32 rounded-md border">
          <div className="grid grid-cols-5 gap-2 p-2">
            {filteredIcons.map((icon) => (
              <Button
                key={icon.name}
                variant="outline"
                size="icon"
                className={selectedIcon === icon.component ? "ring-2 ring-primary" : ""}
                onClick={() => onSelect(icon.component)}
              >
                {icon.component}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {selectedIcon && (
        <div>
          <Label>Rotation</Label>
          <div className="flex gap-2">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <Button
                key={deg}
                variant="outline"
                size="icon"
                className={rotation === deg ? "ring-2 ring-primary" : ""}
                onClick={() => onRotationChange(deg)}
              >
                <div style={{ transform: `rotate(${deg}deg)` }}>{selectedIcon}</div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

