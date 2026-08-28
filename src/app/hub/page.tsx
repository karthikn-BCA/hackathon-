"use client"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

// Hardcoded user skills for the "Smart Matching" feature demo
const STUDENT_SKILLS = ["React", "Python", "UI/UX Designer", "Node.js"]

interface Project {
  id: string
  title: string
  description: string
  open_roles: string[]
  endorsed_by_faculty: boolean
  applied?: boolean
  isNew?: boolean
}

export default function ProjectHub() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Form State
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [teamSize, setTeamSize] = useState("2")
  const [skills, setSkills] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error("Error fetching projects:", error)
      alert("Error fetching from database. Check Netlify Environment Variables!")
    }

    if (data) {
      setProjects(data.map(p => ({ ...p, applied: false })))
    }
    setLoading(false)
  }

  const handlePostProject = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const openRoles = skills.split(",").map(s => s.trim()).filter(s => s)
    
    // Insert into live Supabase
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title,
          description,
          open_roles: openRoles,
          endorsed_by_faculty: false
        }
      ])
      .select()

    if (error) {
      console.error("Error inserting project:", error)
      alert("Failed to save to database. Make sure you triggered a new Netlify deploy after adding your keys!")
      return
    }

    if (data && data[0]) {
      setProjects([{ ...data[0], applied: false, isNew: true }, ...projects])
    }
    
    setIsModalOpen(false)
    setTitle("")
    setDescription("")
    setTeamSize("2")
    setSkills("")
  }

  const handleDeleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert("Failed to delete project.")
    } else {
      setProjects(projects.filter(p => p.id !== id))
    }
  }

  const handleApply = (id: string) => {
    setProjects(projects.map(p => 
      p.id === id ? { ...p, applied: !p.applied } : p
    ))
  }

  // Calculate match percentage
  const calculateMatch = (openRoles: string[]) => {
    if (!openRoles || openRoles.length === 0) return 0
    const matched = openRoles.filter(role => 
      STUDENT_SKILLS.some(skill => role.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(role.toLowerCase()))
    )
    return Math.round((matched.length / openRoles.length) * 100)
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Project Matching Hub</h1>
          <p className="text-muted-foreground mt-1">We analyzed your verified skills. Here are the best teams for you.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Your Profile</div>
            <div className="text-sm font-semibold text-blue-600">Python, React, UI/UX</div>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shadow-md">Post a Project</Button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse text-slate-400 font-semibold">Syncing with database...</div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed rounded-xl text-slate-400">
          No projects yet. Be the first to post one!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => {
            const matchScore = calculateMatch(project.open_roles)
            const isHighMatch = matchScore >= 75
            
            return (
              <Card key={project.id} className={`flex flex-col relative overflow-hidden transition-all hover:shadow-lg ${project.isNew ? 'ring-2 ring-blue-500' : ''}`}>
                {/* Match Score Badge */}
                {matchScore > 0 && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white rounded-bl-lg shadow-sm
                    ${isHighMatch ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-amber-500 to-orange-500'}
                  `}>
                    {matchScore}% Match
                  </div>
                )}
                
                <CardHeader className="pt-8">
                  <div className="flex justify-between items-start">
                    <CardTitle className="leading-tight">{project.title}</CardTitle>
                    <button 
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-slate-400 hover:text-red-500 text-xs font-bold bg-slate-100 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                      title="Delete Project"
                    >
                      Delete
                    </button>
                  </div>
                  <CardDescription className="mt-1">
                    {project.endorsed_by_faculty ? (
                      <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 px-2 py-0.5 rounded text-xs font-bold border border-green-200">
                        ✓ Faculty Verified
                      </span>
                    ) : (
                      "Student Project"
                    )}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-sm mb-6 text-slate-600 line-clamp-3">{project.description}</p>
                  
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.open_roles && project.open_roles.length > 0 ? project.open_roles.map((role: string) => {
                        const isMatched = STUDENT_SKILLS.some(skill => role.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(role.toLowerCase()))
                        return (
                          <span key={role} className={`text-[11px] px-2 py-1 rounded border font-medium
                            ${isMatched ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200'}
                          `}>
                            {isMatched && "✓ "} {role}
                          </span>
                        )
                      }) : (
                        <span className="text-xs text-slate-400 italic">No specific skills listed</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-slate-50 pt-4 border-t mt-4">
                  <Button 
                    className={`w-full transition-all font-bold ${project.applied ? 'bg-green-600 hover:bg-green-700 shadow-inner' : 'shadow-sm'}`}
                    onClick={() => handleApply(project.id)}
                  >
                    {project.applied ? "Request Sent ✓" : "Apply to Join"}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b bg-slate-50">
              <h2 className="text-2xl font-extrabold tracking-tight">Post a New Project</h2>
              <p className="text-slate-500 text-sm mt-1">It will instantly sync to the live Supabase database.</p>
            </div>
            
            <form onSubmit={handlePostProject} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Project Topic / Title</label>
                <input 
                  required 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
                  placeholder="e.g. Smart Campus Parking App" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Description</label>
                <textarea 
                  required 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-lg p-2.5 text-sm h-28 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none" 
                  placeholder="What problem does it solve? Who is it for?" 
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Team Size</label>
                  <select 
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
                  >
                    <option value="2">2 Members</option>
                    <option value="3">3 Members</option>
                    <option value="4">4 Members</option>
                    <option value="5+">5+ Members</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Skills Needed</label>
                  <input 
                    required 
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
                    placeholder="e.g. React, Python" 
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t mt-6 pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Post to Live Database</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
