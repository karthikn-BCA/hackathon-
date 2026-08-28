"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const ALL_CANDIDATES = [
  { id: "1", name: "Alex Student", college: "MIT Institute of Technology", validatedSkills: ["React", "Python", "UI/UX", "Node.js"], completedProjects: 3, assessmentsPassed: 2, profilePic: "AS" },
  { id: "2", name: "Bob Smith", college: "Stanford University", validatedSkills: ["Python", "Machine Learning", "Data Structures"], completedProjects: 2, assessmentsPassed: 1, profilePic: "BS" },
  { id: "3", name: "Charlie Davis", college: "Global Engineering College", validatedSkills: ["React", "TypeScript", "Tailwind"], completedProjects: 4, assessmentsPassed: 3, profilePic: "CD" },
  { id: "4", name: "Diana Prince", college: "MIT Institute of Technology", validatedSkills: ["Python", "SQL", "Data Science"], completedProjects: 1, assessmentsPassed: 4, profilePic: "DP" },
]

export default function RecruiterPortal() {
  const [searchSkills, setSearchSkills] = useState<string>("React, Python")
  
  const targetSkills = searchSkills.split(",").map(s => s.trim().toLowerCase()).filter(s => s)

  const rankedCandidates = ALL_CANDIDATES.map(candidate => {
    let matchCount = 0
    if (targetSkills.length > 0) {
      candidate.validatedSkills.forEach(skill => {
        if (targetSkills.some(t => skill.toLowerCase().includes(t))) matchCount++
      })
    }
    const matchPercentage = targetSkills.length > 0 ? Math.round((matchCount / targetSkills.length) * 100) : 100
    
    return { ...candidate, matchPercentage }
  }).sort((a, b) => b.matchPercentage - a.matchPercentage)

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Talent Search (Evidence-Based)</h1>
        <p className="text-muted-foreground mt-1">Stop reading self-reported resumes. Query students based on verified project completions.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Required Skills (Comma separated)</label>
        <div className="flex gap-4">
          <input 
            value={searchSkills}
            onChange={(e) => setSearchSkills(e.target.value)}
            className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="e.g. React, Python, SQL"
          />
        </div>
      </div>

      <div className="grid gap-4 mt-8">
        <h3 className="font-bold text-lg mb-2">Ranked Candidates</h3>
        {rankedCandidates.map(candidate => (
          <Card key={candidate.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center">
                
                {/* Match Score Block */}
                <div className={`p-8 w-full md:w-48 flex flex-col items-center justify-center border-r
                  ${candidate.matchPercentage >= 80 ? 'bg-green-50' : candidate.matchPercentage >= 50 ? 'bg-amber-50' : 'bg-slate-50'}
                `}>
                  <div className={`text-4xl font-extrabold ${candidate.matchPercentage >= 80 ? 'text-green-600' : candidate.matchPercentage >= 50 ? 'text-amber-600' : 'text-slate-400'}`}>
                    {candidate.matchPercentage}%
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mt-1 text-slate-500">Match Score</div>
                </div>

                {/* Candidate Info */}
                <div className="p-6 flex-1 w-full">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                        {candidate.profilePic}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-xl">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{candidate.college}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="hidden md:flex">View Verified Portfolio</Button>
                  </div>
                  
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {candidate.validatedSkills.map(skill => {
                      const isMatched = targetSkills.some(t => skill.toLowerCase().includes(t))
                      return (
                        <span key={skill} className={`text-xs px-2.5 py-1 rounded font-bold border
                          ${isMatched ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-200'}
                        `}>
                          {isMatched && "✓ "} {skill}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-6 bg-slate-50 border-l w-full md:w-auto h-full flex md:flex-col justify-around text-center md:text-right gap-4 md:gap-2">
                  <div>
                    <div className="text-2xl font-black text-slate-800">{candidate.completedProjects}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-800">{candidate.assessmentsPassed}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Assessments</div>
                  </div>
                  <Button size="sm" variant="outline" className="md:hidden mt-2">Portfolio</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
