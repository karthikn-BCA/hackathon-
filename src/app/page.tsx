import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-3xl mx-auto space-y-8">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Bridge the Gap Between <span className="text-blue-600">Classroom & Industry</span>
      </h1>
      <p className="text-xl text-muted-foreground">
        Co-Lab helps students build evidence-based portfolios through interactive roadmaps, college-verified team projects, and industry-level assessments.
      </p>
      
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/hub">Enter Project Hub</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/roadmaps">Explore Roadmaps</Link>
        </Button>
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
