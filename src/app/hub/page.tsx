import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data: In a real app, we'd fetch this from Supabase filtered by user's college_id
const mockProjects = [
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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Hub</h1>
          <p className="text-muted-foreground">Find teams and ideas within your college network.</p>
        </div>
        <Button>Post a Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map(project => (
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
                <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Open Roles</h4>
                <div className="flex flex-wrap gap-2">
                  {project.openRoles.map(role => (
                    <span key={role} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-200">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply to Join</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
