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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{project.title}</CardTitle>
                {project.endorsed && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                    Endorsed
                  </span>
                )}
              </div>
              <CardDescription>Created by {project.creator}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={project.endorsed ? "outline" : "default"} 
                className="w-full"
                onClick={() => toggleEndorsement(project.id)}
              >
                {project.endorsed ? "Remove Endorsement" : "Endorse Project"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
