"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AlumniPortal() {
  const [advice, setAdvice] = useState("")
  const [posted, setPosted] = useState(false)

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault()
    setPosted(true)
    setAdvice("")
    setTimeout(() => setPosted(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Alumni Network</h1>
        <p className="text-muted-foreground mt-1">Pass down your industry experience to current students.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post a Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePost} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Your Advice / Industry Insight</label>
              <textarea 
                required 
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full border rounded-lg p-3 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none" 
                placeholder="What do you wish you knew when you were a student? What skills are hot in the market right now?" 
              />
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm text-green-600 font-bold">
                {posted && "✓ Successfully posted to Student Dashboards!"}
              </span>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Share with Students</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="pt-8">
        <h3 className="font-bold text-lg mb-4 text-slate-400 uppercase tracking-widest text-xs">Your Previous Advice</h3>
        <Card className="opacity-70">
          <CardContent className="p-4">
            <p className="text-sm italic text-slate-600">"Focus on building 1 solid end-to-end project rather than 10 half-finished ones. Recruiters want to see that you can deploy and maintain code."</p>
            <div className="text-xs font-bold text-slate-400 mt-3 flex justify-between">
              <span>Posted 2 months ago</span>
              <span>♥ 14 students liked this</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
