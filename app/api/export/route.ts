import type { NextRequest } from "next/server"
import sharp from "sharp"
import satori from "satori"
import { html } from "satori-html"

export async function POST(req: NextRequest) {
  try {
    const { settings, format } = await req.json()

    // Convert the React component to an SVG string
    const svg = await satori(
      html`
        <div style="display: flex; align-items: center; justify-content: center; width: 1200px; height: 630px; ${
          settings.backgroundColor !== "transparent" ? `background-color: ${settings.backgroundColor};` : ""
        }">
          <div style="display: flex; align-items: center; gap: 16px; color: ${settings.textColor}; font-family: ${settings.fontFamily};">
            ${
              settings.icon
                ? `
              <div style="transform: rotate(${settings.iconRotation}deg); color: ${settings.iconColor}; font-size: ${settings.fontSize * 1.2}px;">
                ${settings.icon}
              </div>
            `
                : ""
            }
            <span style="font-size: ${settings.fontSize}px; letter-spacing: ${settings.letterSpacing}px;">
              ${settings.brandName || "Your Brand"}
            </span>
          </div>
        </div>
      `.toString(),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: settings.fontFamily,
            data: await fetch(`/fonts/${settings.fontFamily}.ttf`).then((res) => res.arrayBuffer()),
            weight: 400,
            style: "normal",
          },
        ],
      },
    )

    if (format === "svg") {
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Content-Disposition": 'attachment; filename="logo.svg"',
        },
      })
    }

    // Convert SVG to PNG
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer()

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="logo.png"',
      },
    })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Failed to export logo" }, { status: 500 })
  }
}

