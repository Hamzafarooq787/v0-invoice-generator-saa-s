"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelect: (template: "classic" | "modern" | "minimal") => void
}

const templates = [
  {
    id: "classic" as const,
    name: "Classic",
    description: "Traditional business invoice layout",
    preview: (
      <div className="space-y-2 p-3">
        <div className="flex justify-between">
          <div className="h-4 w-16 rounded bg-foreground/80" />
          <div className="h-3 w-12 rounded bg-muted-foreground/40" />
        </div>
        <div className="h-px bg-border" />
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-muted-foreground/20" />
          <div className="h-2 w-full rounded bg-muted-foreground/20" />
          <div className="h-2 w-3/4 rounded bg-muted-foreground/20" />
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-end">
          <div className="h-3 w-16 rounded bg-foreground/80" />
        </div>
      </div>
    ),
  },
  {
    id: "modern" as const,
    name: "Modern",
    description: "Clean, contemporary design",
    preview: (
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary" />
          <div className="h-3 w-20 rounded bg-foreground/80" />
        </div>
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-primary/20" />
          <div className="h-2 w-full rounded bg-muted-foreground/10" />
          <div className="h-2 w-full rounded bg-primary/20" />
        </div>
        <div className="flex justify-end">
          <div className="h-4 w-20 rounded bg-primary" />
        </div>
      </div>
    ),
  },
  {
    id: "minimal" as const,
    name: "Minimal",
    description: "Simple and elegant",
    preview: (
      <div className="space-y-3 p-3">
        <div className="text-center">
          <div className="mx-auto h-3 w-20 rounded bg-foreground/80" />
        </div>
        <div className="space-y-1">
          <div className="h-2 w-full rounded bg-muted-foreground/10" />
          <div className="h-2 w-full rounded bg-muted-foreground/10" />
        </div>
        <div className="text-right">
          <div className="ml-auto h-3 w-16 rounded bg-foreground/60" />
        </div>
      </div>
    ),
  },
]

export default function TemplateSelector({ selectedTemplate, onSelect }: TemplateSelectorProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Choose a Template</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-md",
              selectedTemplate === template.id && "ring-2 ring-primary",
            )}
            onClick={() => onSelect(template.id)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg border-b border-border bg-white">
                {template.preview}
                {selectedTemplate === template.id && (
                  <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="font-medium text-foreground">{template.name}</h4>
                <p className="text-xs text-muted-foreground">{template.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
