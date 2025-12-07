"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Wand2, FileText, Mail, AlertCircle } from "lucide-react"
import type { InvoiceFormData } from "@/lib/types"

interface AiAssistantProps {
  invoiceData: InvoiceFormData
  onApplySuggestion: (updates: Partial<InvoiceFormData>) => void
}

const quickActions = [
  {
    id: "description",
    icon: FileText,
    label: "Suggest Item Descriptions",
    prompt: "Suggest professional descriptions for my invoice items",
  },
  {
    id: "terms",
    icon: Wand2,
    label: "Generate Payment Terms",
    prompt: "Generate professional payment terms for my invoice",
  },
  {
    id: "notes",
    icon: Mail,
    label: "Write Thank You Note",
    prompt: "Write a professional thank you note for the invoice",
  },
]

export default function AiAssistant({ invoiceData, onApplySuggestion }: AiAssistantProps) {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt
    if (!finalPrompt.trim()) return

    setIsLoading(true)
    setError("")
    setResponse("")

    try {
      const res = await fetch("/api/ai/invoice-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: finalPrompt,
          invoiceData: {
            companyName: invoiceData.companyName,
            clientName: invoiceData.clientName,
            items: invoiceData.items.map((item) => ({
              name: item.name,
              description: item.description,
            })),
            total: invoiceData.total,
            currency: invoiceData.currency,
          },
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to get AI response")
      }

      const data = await res.json()
      setResponse(data.response)
    } catch (err) {
      setError("Failed to get AI suggestion. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const applyAsNotes = () => {
    if (response) {
      onApplySuggestion({ notes: response })
      setResponse("")
    }
  }

  const applyAsTerms = () => {
    if (response) {
      onApplySuggestion({ terms: response })
      setResponse("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Assistant
        </CardTitle>
        <CardDescription>Get AI-powered suggestions for your invoice content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Quick Actions</p>
          <div className="grid gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto justify-start gap-3 px-4 py-3 bg-transparent"
                onClick={() => handleSubmit(action.prompt)}
                disabled={isLoading}
              >
                <action.icon className="h-4 w-4 text-primary" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Prompt */}
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">Or ask anything</p>
          <Textarea
            placeholder="E.g., Write a professional email to send with this invoice..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
          <Button className="mt-3 w-full gap-2" onClick={() => handleSubmit()} disabled={isLoading || !prompt.trim()}>
            <Sparkles className="h-4 w-4" />
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Response */}
        {response && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">AI Suggestion</p>
            <div className="rounded-lg bg-muted p-4 text-sm text-foreground">{response}</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={applyAsNotes}>
                Apply as Notes
              </Button>
              <Button variant="outline" size="sm" onClick={applyAsTerms}>
                Apply as Terms
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
