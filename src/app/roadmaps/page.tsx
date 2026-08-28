"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

const ROADMAPS = {
  frontend: {
    title: "Frontend Developer",
    nodes: [
      { id: "1", label: "Internet Basics", status: "completed", description: "How does the internet work? HTTP, DNS, Browsers." },
      { id: "2", label: "HTML & CSS", status: "completed", description: "Semantic HTML, Accessibility, Flexbox, Grid." },
      { id: "3", label: "JavaScript", status: "current", description: "Variables, Functions, DOM Manipulation, Fetch API." },
      { id: "4", label: "Version Control", status: "locked", description: "Commits, Branches, Merging, GitHub." },
      { id: "5", label: "React Framework", status: "locked", description: "Components, Hooks, State Management." },
    ]
  },
  cybersecurity: {
    title: "Cyber Security",
    nodes: [
      { id: "1", label: "IT Fundamentals", status: "completed", description: "Basic hardware, operating systems, and file structures." },
      { id: "2", label: "Networking Concepts", status: "current", description: "TCP/IP, OSI Model, Subnetting, Firewalls." },
      { id: "3", label: "Linux Basics", status: "locked", description: "CLI commands, permissions, bash scripting." },
      { id: "4", label: "Offensive Security", status: "locked", description: "Penetration testing, vulnerability scanning, Kali Linux." },
      { id: "5", label: "Defensive Security", status: "locked", description: "SIEM, intrusion detection, incident response." },
    ]
  },
  datascience: {
    title: "Data Science",
    nodes: [
      { id: "1", label: "Python Basics", status: "completed", description: "Data types, loops, functions, OOP in Python." },
      { id: "2", label: "Math & Statistics", status: "current", description: "Probability, distributions, hypothesis testing." },
      { id: "3", label: "Data Manipulation", status: "locked", description: "Pandas, NumPy, data cleaning techniques." },
      { id: "4", label: "Data Visualization", status: "locked", description: "Matplotlib, Seaborn, Tableau, PowerBI." },
      { id: "5", label: "Machine Learning", status: "locked", description: "Scikit-learn, regression, classification models." },
    ]
  },
  blockchain: {
    title: "Blockchain",
    nodes: [
      { id: "1", label: "Blockchain Basics", status: "completed", description: "Cryptography, hashes, distributed ledgers, consensus." },
      { id: "2", label: "Smart Contracts", status: "current", description: "Ethereum, EVM, gas fees, transactions." },
      { id: "3", label: "Solidity", status: "locked", description: "Variables, mappings, modifiers, contract deployment." },
      { id: "4", label: "Web3.js / Ethers.js", status: "locked", description: "Connecting frontends to the blockchain." },
      { id: "5", label: "DeFi Concepts", status: "locked", description: "Liquidity pools, AMMs, staking, flash loans." },
    ]
  },
  aiml: {
    title: "AI & Machine Learning",
    nodes: [
      { id: "1", label: "Linear Algebra", status: "completed", description: "Vectors, matrices, eigenvalues, PCA." },
      { id: "2", label: "Core ML Algorithms", status: "current", description: "SVM, Decision Trees, Random Forests, KNN." },
      { id: "3", label: "Deep Learning", status: "locked", description: "Neural networks, backpropagation, activation functions." },
      { id: "4", label: "Computer Vision", status: "locked", description: "CNNs, object detection, image segmentation." },
      { id: "5", label: "NLP & LLMs", status: "locked", description: "Transformers, attention mechanisms, fine-tuning." },
    ]
  }
}

type RoadmapKey = keyof typeof ROADMAPS;

type RoadmapNode = {
  id: string;
  label: string;
  status: string;
  description: string;
};

export default function RoadmapsPage() {
  const [activeTab, setActiveTab] = useState<RoadmapKey>("frontend")
  const [nodes, setNodes] = useState(ROADMAPS["frontend"].nodes)
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(ROADMAPS["frontend"].nodes[2])

  // Switch roadmap
  useEffect(() => {
    setNodes(ROADMAPS[activeTab].nodes)
    setSelectedNode(ROADMAPS[activeTab].nodes.find(n => n.status === "current") || ROADMAPS[activeTab].nodes[0])
  }, [activeTab])

  const markCompleted = () => {
    if (!selectedNode) return
    setNodes(nds => {
      const newNodes = [...nds];
      const index = newNodes.findIndex(n => n.id === selectedNode.id);
      
      // Mark current as completed
      newNodes[index] = { ...newNodes[index], status: "completed" };
      
      // Unlock the next one if it exists
      if (index + 1 < newNodes.length) {
        newNodes[index + 1] = { ...newNodes[index + 1], status: "current" };
      }
      
      return newNodes;
    });
    
    // Update selected node state
    setSelectedNode({ ...selectedNode, status: "completed" });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6 p-4">
      
      {/* Top Tabs for Courses */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {(Object.keys(ROADMAPS) as RoadmapKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm
              ${activeTab === key 
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105" 
                : "bg-white text-slate-500 hover:bg-slate-50 border"}
            `}
          >
            {ROADMAPS[key].title}
          </button>
        ))}
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden">
        
        {/* Main Roadmap Area */}
        <div className="flex-1 border rounded-2xl bg-white shadow-sm p-8 relative overflow-y-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          
          <div className="mt-8 max-w-2xl mx-auto relative">
            
            {/* Main vertical path line */}
            <div className="absolute w-1.5 bg-gradient-to-b from-blue-200 via-indigo-200 to-slate-200 h-full left-1/2 -translate-x-1/2 z-0 rounded-full"></div>

            {nodes.map((node, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={node.id} className="relative z-10 w-full flex items-center mb-12 group">
                  
                  {/* Left Side */}
                  <div className={`w-1/2 pr-12 flex justify-end ${!isLeft ? 'invisible' : ''}`}>
                    <button 
                      onClick={() => setSelectedNode(node)}
                      className={`
                        w-72 p-5 rounded-xl font-bold text-left transition-all shadow-md relative group-hover:-translate-y-1 group-hover:shadow-lg
                        ${node.status === "completed" ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-none" : ""}
                        ${node.status === "current" ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none ring-4 ring-blue-100 shadow-blue-200/50" : ""}
                        ${node.status === "locked" ? "bg-white text-slate-500 border border-slate-200" : ""}
                      `}
                    >
                      {/* Connector line to center */}
                      <div className={`absolute top-1/2 -right-12 w-12 h-1 ${node.status === 'locked' ? 'bg-slate-200' : (node.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600')} -translate-y-1/2 z-0`}></div>
                      
                      <div className="text-lg mb-1">{node.label}</div>
                      <div className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 opacity-90
                        ${node.status === "locked" ? "text-slate-400" : "text-white"}
                      `}>
                        {node.status === "completed" && <span className="bg-white/20 px-2 py-0.5 rounded-full">✓ Done</span>}
                        {node.status === "current" && <span className="bg-white/20 px-2 py-0.5 rounded-full animate-pulse">⚡ In Progress</span>}
                        {node.status === "locked" && <span className="bg-slate-100 px-2 py-0.5 rounded-full">🔒 Locked</span>}
                      </div>
                    </button>
                  </div>

                  {/* Center Node on the line */}
                  <div className={`absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-white z-20 flex items-center justify-center shadow-md transition-colors
                       ${node.status === 'completed' ? 'bg-emerald-500' : (node.status === 'current' ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-slate-300')}
                  `}>
                  </div>

                  {/* Right Side */}
                  <div className={`w-1/2 pl-12 flex justify-start ${isLeft ? 'invisible' : ''}`}>
                    <button 
                      onClick={() => setSelectedNode(node)}
                      className={`
                        w-72 p-5 rounded-xl font-bold text-left transition-all shadow-md relative group-hover:-translate-y-1 group-hover:shadow-lg
                        ${node.status === "completed" ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white border-none" : ""}
                        ${node.status === "current" ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-none ring-4 ring-blue-100 shadow-blue-200/50" : ""}
                        ${node.status === "locked" ? "bg-white text-slate-500 border border-slate-200" : ""}
                      `}
                    >
                      {/* Connector line to center */}
                      <div className={`absolute top-1/2 -left-12 w-12 h-1 ${node.status === 'locked' ? 'bg-slate-200' : (node.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-600')} -translate-y-1/2 z-0`}></div>
                      
                      <div className="text-lg mb-1">{node.label}</div>
                      <div className={`text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 opacity-90
                        ${node.status === "locked" ? "text-slate-400" : "text-white"}
                      `}>
                        {node.status === "completed" && <span className="bg-white/20 px-2 py-0.5 rounded-full">✓ Done</span>}
                        {node.status === "current" && <span className="bg-white/20 px-2 py-0.5 rounded-full animate-pulse">⚡ In Progress</span>}
                        {node.status === "locked" && <span className="bg-slate-100 px-2 py-0.5 rounded-full">🔒 Locked</span>}
                      </div>
                    </button>
                  </div>
                  
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Sidebar Area */}
        {selectedNode && (
          <div className="w-96 border rounded-2xl bg-white p-8 shadow-lg flex flex-col relative overflow-hidden">
            
            {/* Header Status Bar Gradient */}
            <div className={`absolute top-0 left-0 w-full h-3 
              ${selectedNode.status === 'completed' ? 'bg-gradient-to-r from-emerald-400 to-green-500' : ''}
              ${selectedNode.status === 'current' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : ''}
              ${selectedNode.status === 'locked' ? 'bg-slate-200' : ''}
            `}></div>

            <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-4 mb-2">
              {ROADMAPS[activeTab].title}
            </div>
            <h3 className="font-extrabold text-3xl mb-4 tracking-tight text-slate-900">{selectedNode.label}</h3>
            
            <div className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold uppercase w-fit tracking-wider shadow-sm border
              ${selectedNode.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
              ${selectedNode.status === 'current' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
              ${selectedNode.status === 'locked' ? 'bg-slate-50 text-slate-500 border-slate-200' : ''}
            `}>
              {selectedNode.status}
            </div>

            <p className="text-slate-600 mb-8 mt-4 leading-relaxed">
              {selectedNode.description}
            </p>
            
            <div className="space-y-4 flex-1">
              <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Curated Resources</h4>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <a key={i} href="#" className="group flex flex-col p-3 rounded-lg border bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors">
                    <span className="text-sm font-bold text-indigo-600 group-hover:text-indigo-700">Official Resource {i}</span>
                    <span className="text-xs text-slate-500 mt-1">Interactive guide and sandbox.</span>
                  </a>
                ))}
              </div>
            </div>

            <Button 
              className={`w-full mt-8 py-6 font-bold tracking-widest uppercase shadow-md transition-all rounded-xl
                ${selectedNode.status === 'current' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5' : ''}
              `}
              onClick={markCompleted}
              disabled={selectedNode.status === "completed" || selectedNode.status === "locked"}
            >
              {selectedNode.status === "completed" ? "Completed ✓" : 
               selectedNode.status === "locked" ? "Locked (Prerequisites)" : "Mark as Completed"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
