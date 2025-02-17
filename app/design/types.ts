import type { ReactNode } from "react"

export interface LogoSettings {
  brandName: string
  fontFamily: string
  fontSize: number
  letterSpacing: number
  icon: ReactNode | null
  iconRotation: number
  textColor: string
  iconColor: string
  backgroundColor: string | "transparent"
}

export type ExportFormat = "svg" | "png"

export interface IconCategory {
  name: string
  icons: Array<{
    name: string
    component: ReactNode
  }>
}

