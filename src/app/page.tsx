import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto space-y-8">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Bridge the Gap Between <span className="text-blue-600">Classroom & Industry</span>
      </h1>
      <p className="text-2xl font-semibold text-slate-800">
        Learn. Build. Prove. Get Discovered.
      </p>
      <p className="text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 flex items-center justify-center gap-2 flex-wrap">
        <span>Assess your skills</span>
        <span className="text-slate-300">→</span>
        <span>Get matched to projects</span>
        <span className="text-slate-300">→</span>
        <span>Build real experience</span>
        <span className="text-slate-300">→</span>
        <span>Earn verified proof</span>
        <span className="text-slate-300">→</span>
        <span>Get discovered</span>
      </p>
      <p className="text-lg text-muted-foreground">
        Co-Lab helps students build evidence-based portfolios through interactive roadmaps, college-verified team projects, and industry-level assessments.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/hub">Student: Project Hub</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/roadmaps">Explore Roadmaps</Link>
          </Button>
        </div>
        <div className="flex gap-4 mt-2">
          <Button asChild variant="secondary" size="sm">
            <Link href="/faculty">Faculty Portal</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href="/recruiter">Recruiter Talent Search</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left w-full">
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-bold text-lg mb-2">College Silos</h3>
          <p className="text-muted-foreground text-sm">Find teammates and collaborate safely within your own college network.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-bold text-lg mb-2">Skill Roadmaps</h3>
          <p className="text-muted-foreground text-sm">Follow interactive learning paths and validate your skills systematically.</p>
        </div>
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-bold text-lg mb-2">Verified Proof</h3>
          <p className="text-muted-foreground text-sm">Replace resumes with verified project completion and assessment metrics.</p>
        </div>
      </div>
    </div>
  );
}
