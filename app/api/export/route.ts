import type { NextRequest } from "next/server";
import sharp from "sharp";
import satori from "satori";
import { html as satoriHtml } from "satori-html";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { settings, format } = await req.json();

    // Convert the React component to an SVG string
    const svg = await satori(
      satoriHtml`
        <div style="display: flex; align-items: center; justify-content: center; width: 1200px; height: 630px; ${
          settings.backgroundColor !== "transparent" ? `background-color: ${settings.backgroundColor};` : ""
        }">
          <div style="display: flex; align-items: center; gap: 16px; color: ${settings.textColor}; font-family: ${settings.fontFamily};">
            ${
              settings.icon
                ? `
              <div style="transform: rotate(${settings.iconRotation}deg); color: ${settings.iconColor}; font-size: ${settings.fontSize * 1.2}px;">
                ${typeof settings.icon === 'string' ? settings.icon : ''}
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
            data: await fs.readFile(path.join(process.cwd(), 'public', 'font', `${settings.fontFamily}.ttf`)),
            weight: 400,
            style: "normal",
          },
        ],
      }
    );

    console.log('Generated SVG:', svg); // Log the generated SVG for debugging

    // Check if SVG is generated correctly
    if (typeof svg !== 'string') {
      throw new Error('SVG generation failed, the result is not a string');
    }

    if (format === "svg") {
      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Content-Disposition": 'attachment; filename="logo.svg"',
        },
      });
    }

    // Convert SVG to PNG
    const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="logo.png"',
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to export logo: "  }, { status: 500 });
  }
}