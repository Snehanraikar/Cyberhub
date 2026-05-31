import AppShell from "@/components/AppShell";
import ThreatStatsBar from "@/components/dashboard/ThreatStatsBar";
import RecentCVEs from "@/components/dashboard/RecentCVEs";
import AttackTrendChart from "@/components/dashboard/AttackTrendChart";
import OWASPSummary from "@/components/dashboard/OWASPSummary";
import NewsTickerBar from "@/components/dashboard/NewsTickerBar";
import MITREHeatmap from "@/components/dashboard/MITREHeatmap";
import QuickLearnCards from "@/components/dashboard/QuickLearnCards";
import { Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      <div className="max-w-[1600px] mx-auto space-y-6">

        {/* Hero header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Cyber<span className="gradient-text">Hub</span>
                </h1>
                <p className="text-xs text-slate-400">AI-Powered Cybersecurity Learning Platform</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm max-w-xl">
              Your complete cybersecurity knowledge hub — learn, visualize, and master security concepts from beginner to professional.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/memory/quiz"
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-all"
            >
              <Zap className="w-4 h-4" /> Quick Quiz
            </Link>
            <Link
              href="/ai-assistant"
              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-xl text-purple-400 text-sm font-medium hover:bg-purple-500/30 transition-all"
            >
              <Shield className="w-4 h-4" /> AI Assistant
            </Link>
          </div>
        </div>

        {/* Live news ticker */}
        <NewsTickerBar />

        {/* Threat statistics */}
        <ThreatStatsBar />

        {/* Attack trends + CVEs */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AttackTrendChart />
          </div>
          <div>
            <RecentCVEs />
          </div>
        </div>

        {/* Quick learn modules */}
        <QuickLearnCards />

        {/* OWASP + MITRE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <OWASPSummary />
          <MITREHeatmap />
        </div>

        {/* Footer note */}
        <div className="text-center py-4">
          <p className="text-xs text-slate-600">
            CyberHub — Educational cybersecurity platform. All content is for learning purposes.
            Always get proper authorization before security testing.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
