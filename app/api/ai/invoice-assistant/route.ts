import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { prompt, invoiceData } = await request.json()

    const systemPrompt = `You are a helpful assistant for an invoice generator application. 
You help users write professional invoice content including:
- Item descriptions
- Payment terms
- Thank you notes
- Professional email copy

Keep responses concise and professional. Format the response as plain text that can be directly used in an invoice.

Current invoice context:
- Company: ${invoiceData.companyName || "Not specified"}
- Client: ${invoiceData.clientName || "Not specified"}
- Items: ${invoiceData.items?.map((i: { name: string }) => i.name).join(", ") || "Not specified"}
- Total: ${invoiceData.currency} ${invoiceData.total || 0}`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      prompt: prompt,
      maxTokens: 500,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("AI Assistant error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
