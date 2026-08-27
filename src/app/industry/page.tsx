"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function IndustryProjects() {
  const [showAssessment, setShowAssessment] = useState(false)
  const [verified, setVerified] = useState(false)

  const handlePass = () => {
    setVerified(true)
    setShowAssessment(false)
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Industry Projects</h1>
        <p className="text-muted-foreground">High-level projects to build portfolio strength. Pass the assessment to unlock the brief.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>FinTech Dashboard (React + Node.js)</CardTitle>
              <CardDescription>Enterprise-level analytics dashboard with real-time sockets.</CardDescription>
            </div>
            {verified && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                Verified Skill Level
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!verified ? (
            <div className="bg-slate-100 p-6 rounded-lg text-center space-y-4">
              <p className="text-sm">You must pass a brief technical assessment to unlock this project brief and resources.</p>
              <Button onClick={() => setShowAssessment(true)}>Take Assessment</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold border-b pb-2">Project Brief</h3>
              <p className="text-sm">Build a real-time financial dashboard displaying stock movements using WebSockets, Redux Toolkit, and Recharts. The backend must be secured using JWT and handle at least 1000 concurrent socket connections.</p>
              <h3 className="font-semibold border-b pb-2 pt-4">Resources</h3>
              <ul className="list-disc list-inside text-sm text-blue-600">
                <li>Figma UI Mockup</li>
                <li>WebSocket Mock Server API Key</li>
                <li>Architecture Guidelines</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {showAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Technical Assessment</CardTitle>
              <CardDescription>React & Node.js Fundamentals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold">1. Which React hook is best used for subscribing to a WebSocket?</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="q1" /> useState
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="q1" /> useEffect
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="q1" /> useMemo
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAssessment(false)}>Cancel</Button>
              <Button onClick={handlePass}>Submit & Unlock</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
