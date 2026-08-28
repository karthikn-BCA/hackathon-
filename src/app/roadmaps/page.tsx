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

export default function RoadmapsPage() {
  const [activeTab, setActiveTab] = useState<RoadmapKey>("frontend")
  const [nodes, setNodes] = useState(ROADMAPS["frontend"].nodes)
  const [selectedNode, setSelectedNode] = useState<any>(ROADMAPS["frontend"].nodes[2])

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
    <div className="flex flex-col h-[calc(100vh-100px)] gap-6">
      
      {/* Top Tabs for Courses */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b">
        {(Object.keys(ROADMAPS) as RoadmapKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`
              px-4 py-2 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap
              ${activeTab === key 
                ? "bg-slate-900 text-white" 
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"}
            `}
          >
            {ROADMAPS[key].title}
          </button>
        ))}
      </div>

      <div className="flex gap-6 flex-1 overflow-hidden bg-slate-50">
        
        {/* Main Roadmap Area */}
        <div className="flex-1 border rounded-lg bg-white shadow-sm p-8 relative overflow-y-auto">
          <div className="mt-8 max-w-2xl mx-auto relative">
            
            {/* Main vertical path line */}
            <div className="absolute w-2 bg-slate-200 h-full left-1/2 -translate-x-1/2 z-0 rounded-full"></div>

            {nodes.map((node, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={node.id} className="relative z-10 w-full flex items-center mb-16">
                  
                  {/* Left Side (Empty if item is right) */}
                  <div className={`w-1/2 pr-12 flex justify-end ${!isLeft ? 'invisible' : ''}`}>
                    <button 
                      onClick={() => setSelectedNode(node)}
                      className={`
                        w-64 p-4 rounded-lg font-bold text-left transition-all shadow-md relative
                        ${node.status === "completed" ? "bg-slate-800 text-white border-2 border-slate-900 hover:bg-slate-700" : ""}
                        ${node.status === "current" ? "bg-blue-600 text-white border-2 border-blue-700 ring-4 ring-blue-200 hover:bg-blue-500 scale-105" : ""}
                        ${node.status === "locked" ? "bg-white text-slate-500 border-2 border-slate-300 hover:border-slate-400" : ""}
                      `}
                    >
                      {/* Connector line to center */}
                      <div className={`absolute top-1/2 -right-12 w-12 h-1 ${node.status === 'locked' ? 'bg-slate-300' : 'bg-slate-900'} -translate-y-1/2 z-0`}></div>
                      
                      <div className="text-lg">{node.label}</div>
                      <div className="text-xs font-normal mt-1 opacity-80 uppercase tracking-widest flex items-center gap-1">
                        {node.status === "completed" && "✅ Done"}
                        {node.status === "current" && "🚀 In Progress"}
                        {node.status === "locked" && "🔒 Locked"}
                      </div>
                    </button>
                  </div>

                  {/* Center Node on the line */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-20 flex items-center justify-center shadow-sm"
                       style={{ backgroundColor: node.status === 'locked' ? '#cbd5e1' : '#0f172a' }}>
                  </div>

                  {/* Right Side (Empty if item is left) */}
                  <div className={`w-1/2 pl-12 flex justify-start ${isLeft ? 'invisible' : ''}`}>
                    <button 
                      onClick={() => setSelectedNode(node)}
                      className={`
                        w-64 p-4 rounded-lg font-bold text-left transition-all shadow-md relative
                        ${node.status === "completed" ? "bg-slate-800 text-white border-2 border-slate-900 hover:bg-slate-700" : ""}
                        ${node.status === "current" ? "bg-blue-600 text-white border-2 border-blue-700 ring-4 ring-blue-200 hover:bg-blue-500 scale-105" : ""}
                        ${node.status === "locked" ? "bg-white text-slate-500 border-2 border-slate-300 hover:border-slate-400" : ""}
                      `}
                    >
                      {/* Connector line to center */}
                      <div className={`absolute top-1/2 -left-12 w-12 h-1 ${node.status === 'locked' ? 'bg-slate-300' : 'bg-slate-900'} -translate-y-1/2 z-0`}></div>
                      
                      <div className="text-lg">{node.label}</div>
                      <div className="text-xs font-normal mt-1 opacity-80 uppercase tracking-widest flex items-center gap-1">
                        {node.status === "completed" && "✅ Done"}
                        {node.status === "current" && "🚀 In Progress"}
                        {node.status === "locked" && "🔒 Locked"}
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
          <div className="w-96 border rounded-lg bg-white p-6 shadow-sm flex flex-col relative overflow-hidden">
            
            {/* Header Status Bar */}
            <div className={`absolute top-0 left-0 w-full h-2 
              ${selectedNode.status === 'completed' ? 'bg-slate-800' : ''}
              ${selectedNode.status === 'current' ? 'bg-blue-600' : ''}
              ${selectedNode.status === 'locked' ? 'bg-slate-300' : ''}
            `}></div>

            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-2 mb-1">
              {ROADMAPS[activeTab].title}
            </div>
            <h3 className="font-bold text-2xl mb-2">{selectedNode.label}</h3>
            
            <div className={`inline-block px-2 py-1 rounded text-xs mb-4 font-bold uppercase w-fit
              ${selectedNode.status === 'completed' ? 'bg-slate-100 text-slate-800' : ''}
              ${selectedNode.status === 'current' ? 'bg-blue-50 text-blue-700' : ''}
              ${selectedNode.status === 'locked' ? 'bg-slate-100 text-slate-500' : ''}
            `}>
              Status: {selectedNode.status}
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {selectedNode.description}
            </p>
            
            <div className="space-y-4 flex-1">
              <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-400">Recommended Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="group flex flex-col">
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">Official Documentation</span>
                    <span className="text-xs text-slate-500">Official documentation and deep dive guides.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex flex-col">
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">Interactive Sandbox</span>
                    <span className="text-xs text-slate-500">Practice tasks in the browser safely.</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="group flex flex-col">
                    <span className="text-sm font-semibold text-blue-600 group-hover:underline">YouTube Crash Course</span>
                    <span className="text-xs text-slate-500">Video tutorial for absolute beginners.</span>
                  </a>
                </li>
              </ul>
            </div>

            <Button 
              className="w-full mt-6 py-6 font-bold tracking-wide transition-all" 
              onClick={markCompleted}
              disabled={selectedNode.status === "completed" || selectedNode.status === "locked"}
              style={selectedNode.status === "current" ? { backgroundColor: '#2563eb' } : {}}
            >
              {selectedNode.status === "completed" ? "ALREADY COMPLETED" : 
               selectedNode.status === "locked" ? "LOCKED (FINISH PREREQUISITES)" : "MARK AS COMPLETED"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
