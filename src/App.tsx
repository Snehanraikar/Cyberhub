import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'

// Dashboard widgets
import ThreatStatsBar from './components/dashboard/ThreatStatsBar'
import RecentCVEs from './components/dashboard/RecentCVEs'
import AttackTrendChart from './components/dashboard/AttackTrendChart'
import OWASPSummary from './components/dashboard/OWASPSummary'
import NewsTickerBar from './components/dashboard/NewsTickerBar'
import MITREHeatmap from './components/dashboard/MITREHeatmap'
import QuickLearnCards from './components/dashboard/QuickLearnCards'

// Page hubs
import NetworkingHub from './components/networking/NetworkingHub'
import AttacksHub from './components/attacks/AttacksHub'
import CVEHub from './components/cve/CVEHub'
import FrameworksHub from './components/frameworks/FrameworksHub'
import NewsHub from './components/news/NewsHub'
import CheatsheetHub from './components/cheatsheets/CheatsheetHub'
import MemoryHub from './components/memory/MemoryHub'
import ResourcesHub from './components/resources/ResourcesHub'
import AIAssistant from './components/ai/AIAssistant'
import InterviewPrepHub from './components/interview/InterviewPrepHub'
import SearchPage from './components/search/SearchPage'
import ThreatIntelHub from './components/threat/ThreatIntelHub'

import { Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg" style={{ background: '#f0faf4', border: '1px solid #b7e4c7' }}>
              <Shield className="w-5 h-5" style={{ color: '#1ba94c' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1c1c1e' }}>
                Cyber<span className="gradient-text">Hub</span>
              </h1>
              <p className="text-xs" style={{ color: '#6b7280' }}>Cybersecurity Learning Platform</p>
            </div>
          </div>
          <p className="text-sm max-w-xl" style={{ color: '#6b7280' }}>
            Your complete cybersecurity knowledge hub — learn, visualize, and master security concepts from beginner to professional.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/memory/quiz" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border" style={{ background: '#f0faf4', borderColor: '#b7e4c7', color: '#1ba94c' }}>
            <Zap className="w-4 h-4" /> Quick Quiz
          </Link>
          <Link to="/ai-assistant" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all text-white" style={{ background: '#1ba94c' }}>
            <Shield className="w-4 h-4" /> AI Assistant
          </Link>
        </div>
      </div>
      <NewsTickerBar />
      <ThreatStatsBar />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2"><AttackTrendChart /></div>
        <div><RecentCVEs /></div>
      </div>
      <QuickLearnCards />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OWASPSummary />
        <MITREHeatmap />
      </div>
      <div className="text-center py-4">
        <p className="text-xs" style={{ color: '#9ca3af' }}>
          CyberHub — Educational cybersecurity platform. All content is for learning purposes only.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell><HomePage /></AppShell>} />
        <Route path="/networking" element={<AppShell><NetworkingHub /></AppShell>} />
        <Route path="/networking/:slug" element={<AppShell><NetworkingHub /></AppShell>} />
        <Route path="/attacks" element={<AppShell><AttacksHub /></AppShell>} />
        <Route path="/attacks/:slug" element={<AppShell><AttacksHub /></AppShell>} />
        <Route path="/cve" element={<AppShell><CVEHub /></AppShell>} />
        <Route path="/cve/:slug" element={<AppShell><CVEHub /></AppShell>} />
        <Route path="/frameworks" element={<AppShell><FrameworksHub /></AppShell>} />
        <Route path="/frameworks/:slug" element={<AppShell><FrameworksHub /></AppShell>} />
        <Route path="/threat-intel" element={<AppShell><ThreatIntelHub /></AppShell>} />
        <Route path="/threat-intel/:slug" element={<AppShell><ThreatIntelHub /></AppShell>} />
        <Route path="/news" element={<AppShell><NewsHub /></AppShell>} />
        <Route path="/cheatsheets" element={<AppShell><CheatsheetHub /></AppShell>} />
        <Route path="/cheatsheets/:slug" element={<AppShell><CheatsheetHub /></AppShell>} />
        <Route path="/memory" element={<AppShell><MemoryHub /></AppShell>} />
        <Route path="/memory/:slug" element={<AppShell><MemoryHub /></AppShell>} />
        <Route path="/resources" element={<AppShell><ResourcesHub /></AppShell>} />
        <Route path="/ai-assistant" element={<AppShell><AIAssistant /></AppShell>} />
        <Route path="/interview-prep" element={<AppShell><InterviewPrepHub /></AppShell>} />
        <Route path="/search" element={<AppShell><SearchPage /></AppShell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
