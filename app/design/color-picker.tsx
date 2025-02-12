"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const presetColors = [
  "#1a1a1a",
  "#4338ca",
  "#2563eb",
  "#0891b2",
  "#059669",
  "#84cc16",
  "#ca8a04",
  "#dc2626",
  "#e11d48",
  "#9333ea",
]

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

export default function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((presetColor) => (
          <Button
            key={presetColor}
            variant="outline"
            className={`h-8 w-8 rounded-full p-0 ${color === presetColor ? "ring-2 ring-primary ring-offset-2" : ""}`}
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input type="text" value={color} onChange={(e) => onChange(e.target.value)} className="w-full pr-10" />
          <div
            className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border shadow-sm"
            style={{ backgroundColor: color }}
          />
        </div>
        <Input type="color" value={color} onChange={(e) => onChange(e.target.value)} className="w-12 p-1" />
      </div>
    </div>
  )
}

