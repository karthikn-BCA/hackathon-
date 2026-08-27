"use client"
import { useState, useCallback } from "react"
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"

const initialNodes: Node[] = [
  { id: "1", position: { x: 250, y: 0 }, data: { label: "HTML/CSS Basics" }, className: "bg-green-100 border-green-500 rounded p-2 text-center w-40" },
  { id: "2", position: { x: 250, y: 100 }, data: { label: "JavaScript Fundamentals" }, className: "bg-yellow-100 border-yellow-500 rounded p-2 text-center w-40" },
  { id: "3", position: { x: 100, y: 200 }, data: { label: "React & Frameworks" }, className: "bg-white border-slate-300 rounded p-2 text-center w-40" },
  { id: "4", position: { x: 400, y: 200 }, data: { label: "Backend Basics (Node)" }, className: "bg-white border-slate-300 rounded p-2 text-center w-40" },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e2-4", source: "2", target: "4" },
]

export default function RoadmapsPage() {
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onNodeClick = (_: any, node: Node) => {
    setSelectedNode(node)
  }

  const markCompleted = () => {
    if (!selectedNode) return
    setNodes(nds => nds.map(n => {
      if (n.id === selectedNode.id) {
        return { ...n, className: "bg-green-100 border-green-500 rounded p-2 text-center w-40" }
      }
      return n
    }))
    setSelectedNode(null)
  }

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6">
      <div className="flex-1 border rounded-lg overflow-hidden bg-white shadow-sm relative">
        <ReactFlow 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
        <div className="absolute top-4 left-4 bg-white/90 p-2 rounded shadow text-sm font-semibold">
          Web Development Roadmap
        </div>
      </div>
      
      {selectedNode && (
        <div className="w-80 border rounded-lg bg-white p-6 shadow-sm flex flex-col">
          <h3 className="font-bold text-xl mb-2">{selectedNode.data.label}</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Learn the core concepts and build practical projects to master this topic.
          </p>
          
          <div className="space-y-4 flex-1">
            <h4 className="font-semibold text-sm">Resources:</h4>
            <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
              <li><a href="#" className="hover:underline">MDN Web Docs</a></li>
              <li><a href="#" className="hover:underline">FreeCodeCamp Course</a></li>
              <li><a href="#" className="hover:underline">Interactive Tutorial</a></li>
            </ul>
          </div>

          <Button className="w-full mt-6" onClick={markCompleted}>
            Mark as Completed
          </Button>
        </div>
      )}
    </div>
  )
}
