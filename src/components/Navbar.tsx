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
        <div className="flex items-center bg-slate-100 p-1 rounded-full border shadow-sm">
          {(["student", "faculty", "recruiter"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all
                ${role === r 
                  ? "bg-white text-blue-600 shadow-sm border border-slate-200" 
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                }
              `}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
