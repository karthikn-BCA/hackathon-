"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="text-center md:text-left">
            <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto md:mx-0 mb-4 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-4xl font-bold text-slate-400">
              AS
            </div>
            <h1 className="text-2xl font-extrabold">Alex Student</h1>
            <p className="text-muted-foreground">Computer Science, 3rd Year</p>
            <div className="inline-flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 mt-3">
              <span>★</span> Top 5% in College
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-500">Verified Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Python</span>
                <span className="text-green-600 font-bold text-xs">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">React</span>
                <span className="text-green-600 font-bold text-xs">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">UI/UX</span>
                <span className="text-green-600 font-bold text-xs">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between opacity-50">
                <span className="font-semibold">Node.js</span>
                <span className="text-xs">Pending</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
            </div>
            <h2 className="text-3xl font-extrabold mb-2 relative z-10">Verified Co-Lab Profile</h2>
            <p className="text-blue-100 max-w-md relative z-10">This portfolio is cryptographically signed by MIT Institute of Technology. All projects and assessments are verified.</p>
            <Button variant="secondary" className="mt-6 font-bold shadow-sm relative z-10">Download PDF Report</Button>
          </div>

          <h3 className="text-xl font-bold mt-8 mb-4 border-b pb-2">Verified Projects</h3>
          <div className="space-y-4">
            <Card className="border-green-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                Faculty Endorsed
              </div>
              <CardContent className="p-6">
                <h4 className="text-lg font-bold">AI-Powered Study Planner</h4>
                <p className="text-sm text-slate-600 mt-2 mb-4">Developed the frontend UI using React and Tailwind CSS. Implemented drag-and-drop calendar scheduling.</p>
                <div className="text-xs text-slate-500 flex gap-4">
                  <span>Role: Frontend Developer</span>
                  <span>•</span>
                  <span>Duration: 2 months</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-bold">Campus Lost & Found</h4>
                <p className="text-sm text-slate-600 mt-2 mb-4">Designed the complete Figma prototype and conducted user testing with 50+ students.</p>
                <div className="text-xs text-slate-500 flex gap-4">
                  <span>Role: UI/UX Designer</span>
                  <span>•</span>
                  <span>Duration: 3 weeks</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
