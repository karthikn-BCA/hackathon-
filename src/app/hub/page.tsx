"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const initialProjects = [
  {
    id: "1",
    title: "AI-Powered Study Planner",
    description: "An app that generates daily study schedules based on syllabus and exam dates.",
    creator: "Alice (CS 3rd Year)",
    openRoles: ["Frontend Developer", "UI/UX Designer"],
    endorsed: true
  },
  {
    id: "2",
    title: "Campus Lost & Found",
    description: "A centralized portal for reporting and claiming lost items on campus.",
    creator: "Bob (IT 2nd Year)",
    openRoles: ["Backend Developer (Node.js)"],
    endorsed: false
  }
]

export default function ProjectHub() {
  const [projects, setProjects] = useState(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form State
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [teamSize, setTeamSize] = useState("2")
  const [skills, setSkills] = useState("")

  const handlePostProject = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newProject = {
      id: Date.now().toString(),
      title,
      description,
      creator: "You (Student)",
      openRoles: skills.split(",").map(s => s.trim()).filter(s => s),
      endorsed: false
    }

    setProjects([newProject, ...projects])
    setIsModalOpen(false)
    
    // Reset form
    setTitle("")
    setDescription("")
    setTeamSize("2")
    setSkills("")
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
          <p className="text-muted-foreground">Find teams and ideas within your college network.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Post a Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{project.title}</CardTitle>
                {project.endorsed && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">
                    Faculty Endorsed
                  </span>
                )}
              </div>
              <CardDescription>Created by {project.creator}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm mb-4">{project.description}</p>
              <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Open Roles ({project.openRoles.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {project.openRoles.length > 0 ? project.openRoles.map(role => (
                    <span key={role} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                      {role}
                    </span>
                  )) : (
                    <span className="text-xs text-slate-400">Team full / No roles specified</span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply to Join</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Post a New Project</h2>
              <p className="text-slate-500 text-sm">Fill in the details to find teammates.</p>
            </div>
            
            <form onSubmit={handlePostProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Project Topic / Title</label>
                <input 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g. Smart Campus Parking App" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea 
                  required 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm h-24 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="What problem does it solve?" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Team Size</label>
                  <select 
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                    <option value="5+">5+ Members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Skills Needed</label>
                  <input 
                    required 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    placeholder="e.g. React, Python (comma separated)" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit">Post Project</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
