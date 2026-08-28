"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  
  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Fake authentication for hackathon demo
    if (selectedRole === "student") router.push("/dashboard")
    else if (selectedRole === "faculty") router.push("/faculty")
    else if (selectedRole === "recruiter") router.push("/recruiter")
    else if (selectedRole === "alumni") router.push("/alumni")
  }

  if (!selectedRole) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Welcome to Co-Lab</h1>
          <p className="text-muted-foreground text-lg">To get started, please tell us who you are.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl px-4">
          <Card 
            className="cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group"
            onClick={() => setSelectedRole("student")}
          >
            <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🎓
              </div>
              <div>
                <h3 className="text-xl font-bold">Student</h3>
                <p className="text-sm text-muted-foreground mt-2">Build your verified portfolio, join projects, and take assessments.</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-green-500 hover:shadow-lg transition-all group"
            onClick={() => setSelectedRole("faculty")}
          >
            <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                👨‍🏫
              </div>
              <div>
                <h3 className="text-xl font-bold">Faculty</h3>
                <p className="text-sm text-muted-foreground mt-2">Verify student projects and endorse top talent from your college.</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-purple-500 hover:shadow-lg transition-all group"
            onClick={() => setSelectedRole("recruiter")}
          >
            <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                💼
              </div>
              <div>
                <h3 className="text-xl font-bold">Recruiter</h3>
                <p className="text-sm text-muted-foreground mt-2">Discover and hire students based on verified skills and projects.</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:border-orange-500 hover:shadow-lg transition-all group"
            onClick={() => setSelectedRole("alumni")}
          >
            <CardContent className="p-8 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                🌟
              </div>
              <div>
                <h3 className="text-xl font-bold">Alumni</h3>
                <p className="text-sm text-muted-foreground mt-2">Share industry insights and mentor the next generation of students.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Card className="w-full max-w-md p-8 shadow-xl border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-2xl mb-4">
            {selectedRole === "student" ? "🎓" : selectedRole === "faculty" ? "👨‍🏫" : selectedRole === "recruiter" ? "💼" : "🌟"}
          </div>
          <h2 className="text-2xl font-extrabold capitalize">{selectedRole} Sign In</h2>
          <p className="text-sm text-muted-foreground mt-1">Enter your credentials to access your portal.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
            <input 
              required 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
              placeholder="you@university.edu" 
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <input 
              required 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
              placeholder="••••••••" 
            />
          </div>
          
          <Button type="submit" className="w-full font-bold py-5 mt-4 text-md">
            Sign In Securely
          </Button>

          <button 
            type="button" 
            onClick={() => setSelectedRole(null)}
            className="w-full text-center text-sm text-slate-500 hover:text-slate-800 font-semibold mt-4"
          >
            ← Back to Role Selection
          </button>
        </form>
      </Card>
    </div>
  )
}
