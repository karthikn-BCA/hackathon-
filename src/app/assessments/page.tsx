"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ASSESSMENTS = [
  { id: 1, title: "Python Fundamentals", duration: "45 mins", level: "Beginner", status: "completed", score: "18/20", label: "Advanced" },
  { id: 2, title: "UI/UX Principles", duration: "30 mins", level: "Intermediate", status: "completed", score: "92%", label: "Proficient" },
  { id: 3, title: "Advanced React", duration: "60 mins", level: "Advanced", status: "available", score: null, label: null },
  { id: 4, title: "SQL & Databases", duration: "45 mins", level: "Intermediate", status: "available", score: null, label: null },
  { id: 5, title: "Data Structures", duration: "90 mins", level: "Advanced", status: "locked", score: null, label: "Pass Python First" },
]

export default function AssessmentsPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Industry Skill Assessments</h1>
        <p className="text-muted-foreground mt-1">Take standardized tests to earn verifiable proof of your skills for recruiters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASSESSMENTS.map(test => (
          <Card key={test.id} className={`flex flex-col relative overflow-hidden transition-all hover:shadow-md ${test.status === 'locked' ? 'opacity-70 bg-slate-50' : ''}`}>
            {test.status === 'completed' && (
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                Verified ✓
              </div>
            )}
            
            <CardHeader>
              <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-1">{test.level}</div>
              <CardTitle className="text-xl">{test.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                <span>⏱ {test.duration}</span>
                <span>•</span>
                <span>Proctored</span>
              </div>
              
              {test.status === 'completed' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-extrabold text-green-700">{test.score}</div>
                  <div className="text-xs font-bold text-green-600 uppercase mt-1">{test.label}</div>
                </div>
              ) : test.status === 'locked' ? (
                <Button disabled variant="outline" className="w-full">
                  Locked 🔒 ({test.label})
                </Button>
              ) : (
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Assessment
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
