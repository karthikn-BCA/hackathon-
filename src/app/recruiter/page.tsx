import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const mockCandidates = [
  {
    id: "1",
    name: "Alice Wang",
    college: "MIT Institute of Technology",
    validatedSkills: ["React", "Node.js", "PostgreSQL"],
    completedProjects: 3,
    assessmentsPassed: 2,
    match: "98%"
  },
  {
    id: "2",
    name: "Bob Smith",
    college: "Stanford University",
    validatedSkills: ["Python", "Machine Learning", "Data Structures"],
    completedProjects: 2,
    assessmentsPassed: 1,
    match: "85%"
  }
]

export default function RecruiterPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Talent Search (Evidence-Based)</h1>
        <p className="text-muted-foreground">Filter candidates based on verified skills and completed industry projects, not self-reported resumes.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <select className="border rounded p-2 text-sm bg-white">
          <option>All Skills</option>
          <option>React</option>
          <option>Node.js</option>
          <option>Python</option>
        </select>
        <select className="border rounded p-2 text-sm bg-white">
          <option>Min Assessments Passed: 0</option>
          <option>Min Assessments Passed: 1</option>
          <option>Min Assessments Passed: 2</option>
        </select>
        <Button>Search Candidates</Button>
      </div>

      <div className="grid gap-4">
        {mockCandidates.map(candidate => (
          <Card key={candidate.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{candidate.name}</h3>
                <p className="text-sm text-muted-foreground">{candidate.college}</p>
                <div className="flex gap-2 mt-3">
                  {candidate.validatedSkills.map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-800 text-xs px-2 py-1 rounded">
                      {skill} (Verified)
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{candidate.match} Match</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {candidate.completedProjects} Projects | {candidate.assessmentsPassed} Assessments
                </p>
                <Button className="mt-4" size="sm">View Portfolio</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
