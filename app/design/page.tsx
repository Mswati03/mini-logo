"use client"

import { Suspense, useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "sonner"
import ColorPicker from "./color-picker"
import IconSelector from "./icon-selector"
import { fonts, defaultSettings } from "./constants"
import type { LogoSettings, ExportFormat } from "./types"
import Image from "next/image"

export default function LogoDesigner() {
  const [settings, setSettings] = useState<LogoSettings>(defaultSettings)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: ExportFormat) => {
    try {
      setIsExporting(true)
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings, format }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to export logo")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `logo.${format}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success(`Logo exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to export logo")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Preview Section */}
        <div className="flex-1 p-4 md:p-8 md:w-2/3">
          <div className="sticky top-8">
            <div className="mb-6 flex items-center justify-between flex-wrap">
               <Image src="https://kokonutui.com/logo.svg" alt="Kokonut UI" width={20} height={20} />
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <Button variant="outline" onClick={() => handleExport("svg")} disabled={isExporting} className="whitespace-nowrap">
                  <Download className="mr-2 h-4 w-4" />
                  Export SVG
                </Button>
                <Button
                  onClick={() => handleExport("png")}
                  disabled={isExporting}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export PNG
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white/50 p-4 md:p-8 shadow-lg backdrop-blur-sm">
              <div
                className="aspect-video rounded-lg"
                style={{
                  backgroundColor:
                    settings.backgroundColor === "transparent"
                      ? "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat"
                      : settings.backgroundColor,
                }}
              >
                <div className="flex h-full items-center justify-center">
                  <div
                    className="flex items-center gap-4"
                    style={{
                      color: settings.textColor,
                      fontFamily: settings.fontFamily,
                    }}
                  >
                    {settings.icon && (
                      <div
                        style={{
                          transform: `rotate(${settings.iconRotation}deg)`,
                          color: settings.iconColor,
                          fontSize: `${settings.fontSize * 1.2}px`,
                        }}
                      >
                        {settings.icon}
                      </div>
                    )}
                    <span
                      style={{
                        fontSize: `${settings.fontSize}px`,
                        letterSpacing: `${settings.letterSpacing}px`,
                      }}
                    >
                      {settings.brandName || "Your Brand"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="w-full md:w-[400px] border-t md:border-l border-gray-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <Label htmlFor="brandName" className="text-sm font-medium text-gray-700">
                Brand Name
              </Label>
              <Input
                id="brandName"
                value={settings.brandName}
                onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                placeholder="Enter your brand name"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700">Typography</Label>
              <Select
                value={settings.fontFamily}
                onValueChange={(value: string) => setSettings({ ...settings, fontFamily: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Font Size</Label>
                    <span className="text-sm text-gray-500">{settings.fontSize}px</span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]: [number]) => setSettings({ ...settings, fontSize: value })}
                    min={12}
                    max={120}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Letter Spacing</Label>
                    <span className="text-sm text-gray-500">{settings.letterSpacing}px</span>
                  </div>
                  <Slider
                    value={[settings.letterSpacing]}
                    onValueChange={([value]: [number]) => setSettings({ ...settings, letterSpacing: value })}
                    min={-5}
                    max={20}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <IconSelector
              selectedIcon={settings.icon}
              onSelect={(icon) => setSettings({ ...settings, icon })}
              rotation={settings.iconRotation}
              onRotationChange={(rotation) => setSettings({ ...settings, iconRotation: rotation })}
            />

            <Tabs defaultValue="colors">
              <TabsList className="w-full">
                <TabsTrigger value="colors" className="flex-1">
                  Colors
                </TabsTrigger>
                <TabsTrigger value="background" className="flex-1">
                  Background
                </TabsTrigger>
              </TabsList>
              <TabsContent value="colors" className="space-y-4">
                <ColorPicker
                  color={settings.textColor}
                  onChange={(color) => setSettings({ ...settings, textColor: color })}
                  label="Text Color"
                />
                {settings.icon && (
                  <ColorPicker
                    color={settings.iconColor}
                    onChange={(color) => setSettings({ ...settings, iconColor: color })}
                    label="Icon Color"
                  />
                )}
              </TabsContent>
              <TabsContent value="background" className="space-y-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className={`flex-1 ${settings.backgroundColor === "transparent" ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSettings({ ...settings, backgroundColor: "transparent" })}
                  >
                    Transparent
                  </Button>
                  <Button
                    variant="outline"
                    className={`flex-1 ${settings.backgroundColor !== "transparent" ? "ring-2 ring-primary" : ""}`}
                    onClick={() => setSettings({ ...settings, backgroundColor: "#ffffff" })}
                  >
                    Colored
                  </Button>
                </div>
                {settings.backgroundColor !== "transparent" && (
                  <ColorPicker
                    color={settings.backgroundColor}
                    onChange={(color) => setSettings({ ...settings, backgroundColor: color })}
                    label="Background Color"
                  />
                )}
              </TabsContent>
            </Tabs>

            <Button variant="outline" onClick={() => setSettings(defaultSettings)} className="mt-auto">
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}