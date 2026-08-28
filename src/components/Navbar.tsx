"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  
  // For the hackathon demo, we use a simple state to switch roles
  const [role, setRole] = useState<"student" | "faculty" | "recruiter">("student")

  return (
    <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl text-blue-600">
        <Link href="/">Co-Lab</Link>
      </div>
      <div className="flex gap-6 items-center">
        {role === "student" && (
          <>
            <Link href="/hub" className={pathname === "/hub" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Project Hub</Link>
            <Link href="/roadmaps" className={pathname === "/roadmaps" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Roadmaps</Link>
            <Link href="/industry" className={pathname === "/industry" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Industry Projects</Link>
          </>
        )}
        {role === "faculty" && (
          <>
            <Link href="/faculty" className={pathname === "/faculty" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Faculty Portal</Link>
          </>
        )}
        {role === "recruiter" && (
          <>
            <Link href="/recruiter" className={pathname === "/recruiter" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Talent Search</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm flex items-center gap-2 bg-slate-50 border px-3 py-1 rounded">
          <span className="font-semibold text-slate-500">Demo Role:</span>
          <select 
            className="bg-transparent font-bold outline-none cursor-pointer"
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
      </div>
    </nav>
  )
}
