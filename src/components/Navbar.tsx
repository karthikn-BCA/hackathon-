"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  
  const role = "student" // This would normally come from an auth context

  return (
    <nav className="border-b bg-white px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-xl text-blue-600">
        <Link href="/">Co-Lab</Link>
      </div>
      <div className="flex gap-6 items-center">
        {role === "student" && (
          <>
            <Link href="/hub" className={pathname === "/hub" ? "font-bold" : "text-muted-foreground"}>Project Hub</Link>
            <Link href="/roadmaps" className={pathname === "/roadmaps" ? "font-bold" : "text-muted-foreground"}>Roadmaps</Link>
            <Link href="/industry" className={pathname === "/industry" ? "font-bold" : "text-muted-foreground"}>Industry Projects</Link>
          </>
        )}
        {role === "faculty" && (
          <>
            <Link href="/faculty" className={pathname === "/faculty" ? "font-bold" : "text-muted-foreground"}>Faculty Portal</Link>
          </>
        )}
        {role === "recruiter" && (
          <>
            <Link href="/recruiter" className={pathname === "/recruiter" ? "font-bold" : "text-muted-foreground"}>Talent Search</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm border px-3 py-1 rounded bg-slate-50">Role: {role}</div>
      </div>
    </nav>
  )
}
