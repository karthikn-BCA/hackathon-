"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StudentDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back. Your portfolio is looking strong.</p>
        </div>
        <Button asChild>
          <Link href="/portfolio">View Public Portfolio</Link>
        </Button>
      </div>

      {/* High level metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Profile Strength</div>
            <div className="text-4xl font-extrabold text-blue-600">85%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-blue-600 w-[85%] h-full rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Verified Skills</div>
            <div className="text-4xl font-extrabold text-slate-900">4</div>
            <p className="text-xs text-green-600 font-bold mt-2">↑ 2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Completed Projects</div>
            <div className="text-4xl font-extrabold text-slate-900">3</div>
            <p className="text-xs text-slate-500 font-medium mt-2">2 Faculty Endorsed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-lg">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
              <div className="text-sm font-bold text-blue-100 uppercase tracking-wider mb-2">Next Step</div>
              <div className="text-xl font-bold leading-tight">Take the Advanced React Assessment</div>
            </div>
            <Button variant="secondary" size="sm" className="w-fit mt-4" asChild>
              <Link href="/assessments">Start Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Skill Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
              <div>
                <div className="font-bold">Python Fundamentals</div>
                <div className="text-sm text-slate-500">Taken Oct 12 • Valid for 1 year</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-xl text-green-600">18/20</div>
                <div className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded uppercase tracking-wider mt-1">Advanced</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-xl bg-slate-50">
              <div>
                <div className="font-bold">UI/UX Principles</div>
                <div className="text-sm text-slate-500">Taken Sep 28 • Valid for 1 year</div>
              </div>
              <div className="text-right">
                <div className="font-extrabold text-xl text-blue-600">92%</div>
                <div className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase tracking-wider mt-1">Proficient</div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2" asChild>
              <Link href="/assessments">View All Assessments</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Smart Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Projects</CardTitle>
            <p className="text-sm text-slate-500">Based on your verified skills (Python, UI/UX)</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="group border rounded-xl p-4 transition-all hover:border-blue-300 hover:shadow-md">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold group-hover:text-blue-600 transition-colors">Campus Lost & Found App</h4>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">95% Match</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Looking for a UI/UX designer to revamp the reporting flow.</p>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/hub">View in Hub</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
