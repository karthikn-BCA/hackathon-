"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialProjects = [
  {
    id: "1",
    title: "Campus Lost & Found",
    description: "A centralized portal for reporting and claiming lost items on campus.",
    creator: "Bob (IT 2nd Year)",
    endorsed: false
  },
  {
    id: "2",
    title: "AI Study Group Matcher",
    description: "Matches students with similar study habits and goals.",
    creator: "Sarah (CS 4th Year)",
    endorsed: true
  }
]

export default function FacultyPortal() {
  const [projects, setProjects] = useState(initialProjects)

  const toggleEndorsement = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, endorsed: !p.endorsed } : p
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Faculty Dashboard</h1>
        <p className="text-muted-foreground">Review and endorse student projects from your college.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {projects.map(project => (
          <Card key={project.id} className={`transition-all ${project.endorsed ? 'border-green-200 bg-green-50/30' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                {project.endorsed && (
                  <span className="bg-green-500 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded font-bold shadow-sm">
                    Verified ✓
                  </span>
                )}
              </div>
              <CardDescription>Submitted by {project.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{project.description}</p>
              <div className="bg-slate-50 border rounded-lg p-3 text-xs">
                <div className="font-bold mb-1 uppercase tracking-wider text-[10px] text-slate-400">Verification Checklist</div>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-2"><span>{project.endorsed ? '✅' : '⏳'}</span> Code repository analyzed</li>
                  <li className="flex items-center gap-2"><span>{project.endorsed ? '✅' : '⏳'}</span> Student contributions validated</li>
                  <li className="flex items-center gap-2"><span>{project.endorsed ? '✅' : '⏳'}</span> Live demo reviewed</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant={project.endorsed ? "outline" : "default"} 
                className={`w-full font-bold ${project.endorsed ? 'text-slate-500 hover:text-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                onClick={() => toggleEndorsement(project.id)}
              >
                {project.endorsed ? "Revoke Verification" : "Verify & Add to Student Portfolio"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
