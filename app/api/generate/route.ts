import { generateText } from "ai"
import { replicate } from "@ai-sdk/replicate"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    const { text } = await generateText({
      model: replicate.languageModel("recraft-ai/recraft-v3-text"),
      prompt,
    })

    return Response.json({
      success: true,
      svg: text.replace('width="1024"', "").replace('height="1024"', ""),
    })
  } catch (error) {
    console.error(error)
    return Response.json(
      {
        success: false,
        error: "Failed to generate logo",
      },
      {
        status: 500,
      },
    )
  }
}

