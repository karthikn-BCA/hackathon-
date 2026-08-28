"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const initialNodes = [
  { id: "1", label: "HTML/CSS Basics", status: "completed", type: "core" },
  { id: "2", label: "JavaScript Fundamentals", status: "current", type: "core" },
  { id: "3", label: "React & Frameworks", status: "locked", type: "core" },
  { id: "4", label: "Backend Basics (Node)", status: "locked", type: "branch" },
]

export default function RoadmapsPage() {
  const [nodes, setNodes] = useState(initialNodes)
  const [selectedNode, setSelectedNode] = useState<any>(initialNodes[1])

  const markCompleted = () => {
    if (!selectedNode) return
    setNodes(nds => nds.map(n => {
      if (n.id === selectedNode.id) {
        return { ...n, status: "completed" }
      }
      return n
    }))
  }

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6">
      <div className="flex-1 border rounded-lg bg-white shadow-sm p-8 relative overflow-y-auto">
        <div className="absolute top-4 left-4 bg-slate-100 p-2 rounded shadow-sm text-sm font-semibold">
          Web Development Roadmap
        </div>
        
        <div className="mt-16 flex flex-col items-center space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute w-1 bg-slate-200 h-full left-1/2 -translate-x-1/2 z-0"></div>

          {nodes.map((node, idx) => (
            <div key={node.id} className="relative z-10 w-full flex justify-center">
              <button 
                onClick={() => setSelectedNode(node)}
                className={`
                  w-64 p-4 rounded-lg font-bold border-2 transition-all shadow-sm
                  ${node.status === "completed" ? "bg-green-100 border-green-500 text-green-900" : ""}
                  ${node.status === "current" ? "bg-yellow-100 border-yellow-500 text-yellow-900 ring-4 ring-yellow-200" : ""}
                  ${node.status === "locked" ? "bg-white border-slate-300 text-slate-400" : ""}
                `}
              >
                {node.label}
                <div className="text-xs font-normal mt-1 opacity-80 uppercase tracking-wider">
                  {node.status}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {selectedNode && (
        <div className="w-80 border rounded-lg bg-white p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-xl mb-2">{selectedNode.label}</h3>
          <div className="inline-block px-2 py-1 bg-slate-100 rounded text-xs mb-4 font-semibold uppercase">
            Status: {selectedNode.status}
          </div>
          <p className="text-sm text-slate-500 mb-6">
            Learn the core concepts and build practical projects to master this topic.
          </p>
          
          <div className="space-y-4 flex-1">
            <h4 className="font-semibold text-sm">Resources:</h4>
            <ul className="list-disc list-inside text-sm text-blue-600 space-y-2">
              <li><a href="#" className="hover:underline">MDN Web Docs</a></li>
              <li><a href="#" className="hover:underline">FreeCodeCamp Course</a></li>
              <li><a href="#" className="hover:underline">Interactive Tutorial</a></li>
            </ul>
          </div>

          <Button 
            className="w-full mt-6" 
            onClick={markCompleted}
            disabled={selectedNode.status === "completed" || selectedNode.status === "locked"}
          >
            {selectedNode.status === "completed" ? "Already Completed" : "Mark as Completed"}
          </Button>
        </div>
      )}
    </div>
  )
}
