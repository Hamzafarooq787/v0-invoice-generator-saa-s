"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false)

  // SEO Settings
  const [seoTitle, setSeoTitle] = useState("Airanko Invoice - Free Online Invoice Generator")
  const [seoDescription, setSeoDescription] = useState(
    "Create professional invoices in minutes with Airanko's free online invoice generator. Download PDFs, customize templates, and upgrade for powerful tracking features.",
  )
  const [canonicalBase, setCanonicalBase] = useState("https://invoice.airanko.com")

  // Captcha Settings
  const [captchaEnabled, setCaptchaEnabled] = useState(false)
  const [captchaSiteKey, setCaptchaSiteKey] = useState("")
  const [captchaSecretKey, setCaptchaSecretKey] = useState("")
  const [captchaOnSignup, setCaptchaOnSignup] = useState(true)
  const [captchaOnSignin, setCaptchaOnSignin] = useState(true)

  // Brand Settings
  const [brandLogoUrl, setBrandLogoUrl] = useState("")
  const [brandPrimaryColor, setBrandPrimaryColor] = useState("#0066FF")
  const [brandFooterText, setBrandFooterText] = useState("© 2025 Airanko. All rights reserved.")

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real implementation, this would save to the database
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("Settings saved successfully")
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* SEO Settings */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Settings</CardTitle>
          <CardDescription>Configure default SEO metadata for your platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">Default Meta Title</Label>
            <Input id="seoTitle" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">Default Meta Description</Label>
            <Textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="canonicalBase">Canonical Base URL</Label>
            <Input
              id="canonicalBase"
              placeholder="https://invoice.airanko.com"
              value={canonicalBase}
              onChange={(e) => setCanonicalBase(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Captcha Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Captcha Settings</CardTitle>
          <CardDescription>Configure Google reCAPTCHA for form protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="captchaEnabled">Enable Captcha</Label>
              <p className="text-sm text-muted-foreground">Protect forms with Google reCAPTCHA</p>
            </div>
            <Switch id="captchaEnabled" checked={captchaEnabled} onCheckedChange={setCaptchaEnabled} />
          </div>

          {captchaEnabled && (
            <>
              <div className="space-y-2">
                <Label htmlFor="captchaSiteKey">Site Key</Label>
                <Input
                  id="captchaSiteKey"
                  placeholder="Your reCAPTCHA site key"
                  value={captchaSiteKey}
                  onChange={(e) => setCaptchaSiteKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="captchaSecretKey">Secret Key</Label>
                <Input
                  id="captchaSecretKey"
                  type="password"
                  placeholder="Your reCAPTCHA secret key"
                  value={captchaSecretKey}
                  onChange={(e) => setCaptchaSecretKey(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <Label>Enable Captcha On</Label>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Sign Up Form</span>
                  <Switch checked={captchaOnSignup} onCheckedChange={setCaptchaOnSignup} />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-sm">Sign In Form</span>
                  <Switch checked={captchaOnSignin} onCheckedChange={setCaptchaOnSignin} />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Brand Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Brand Settings</CardTitle>
          <CardDescription>Customize your platform's appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brandLogoUrl">Logo URL</Label>
            <Input
              id="brandLogoUrl"
              placeholder="https://..."
              value={brandLogoUrl}
              onChange={(e) => setBrandLogoUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandPrimaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="brandPrimaryColor"
                type="color"
                value={brandPrimaryColor}
                onChange={(e) => setBrandPrimaryColor(e.target.value)}
                className="h-10 w-20 p-1"
              />
              <Input value={brandPrimaryColor} onChange={(e) => setBrandPrimaryColor(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brandFooterText">Footer Text</Label>
            <Input id="brandFooterText" value={brandFooterText} onChange={(e) => setBrandFooterText(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
