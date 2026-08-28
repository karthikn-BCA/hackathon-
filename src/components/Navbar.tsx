"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  // For the hackathon demo, we use a simple state to switch roles
  const [role, setRole] = useState<"student" | "faculty" | "recruiter" | "alumni">("student")

  const handleRoleChange = (newRole: "student" | "faculty" | "recruiter" | "alumni") => {
    setRole(newRole)
    if (newRole === "faculty") router.push("/faculty")
    else if (newRole === "recruiter") router.push("/recruiter")
    else if (newRole === "alumni") router.push("/alumni")
    else if (newRole === "student" && (pathname === "/faculty" || pathname === "/recruiter" || pathname === "/alumni")) router.push("/dashboard")
  }

  return (
    <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl text-blue-600">
        <Link href="/">Co-Lab</Link>
      </div>
      <div className="flex gap-6 items-center">
        {role === "student" && (
          <>
            <Link href="/dashboard" className={pathname === "/dashboard" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Dashboard</Link>
            <Link href="/hub" className={pathname === "/hub" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Project Hub</Link>
            <Link href="/roadmaps" className={pathname === "/roadmaps" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Roadmaps</Link>
            <Link href="/assessments" className={pathname === "/assessments" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Assessments</Link>
            <Link href="/portfolio" className={pathname === "/portfolio" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900 hidden lg:block"}>Portfolio</Link>
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
        {role === "alumni" && (
          <>
            <Link href="/alumni" className={pathname === "/alumni" ? "font-bold text-blue-600" : "text-muted-foreground hover:text-slate-900"}>Alumni Portal</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-full border shadow-sm">
          {(["student", "faculty", "recruiter", "alumni"] as const).map((r) => (
            <button
              key={r}
              onClick={() => handleRoleChange(r)}
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
