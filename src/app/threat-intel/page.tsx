import AppShell from "@/components/AppShell";
import Link from "next/link";
import { threatActors } from "@/lib/data/cybersecurity-data";
import { Activity } from "lucide-react";

export default function ThreatIntelPage() {
  return (
    <AppShell>
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-bold text-white">Threat Intelligence</h1>
          </div>
          <p className="text-sm text-slate-400">Threat actors, malware families, and campaign tracking</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/threat-intel/actors" className="glass rounded-xl border border-cyan-500/20 p-5 hover:border-cyan-500/40 transition-all">
            <div className="text-2xl mb-2">🎭</div>
            <h3 className="font-semibold text-white mb-1">Threat Actor Profiles</h3>
            <p className="text-sm text-slate-400">APT groups, criminal organizations, and their TTPs</p>
          </Link>
          <Link href="/threat-intel/malware" className="glass rounded-xl border border-cyan-500/20 p-5 hover:border-cyan-500/40 transition-all">
            <div className="text-2xl mb-2">🦠</div>
            <h3 className="font-semibold text-white mb-1">Malware Encyclopedia</h3>
            <p className="text-sm text-slate-400">Ransomware families, RATs, rootkits, and stealers</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {threatActors.map(actor => (
            <div key={actor.id} className="glass rounded-xl border border-cyan-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{actor.nation === "Russia" ? "🇷🇺" : actor.nation === "North Korea" ? "🇰🇵" : "🌍"}</span>
                <h3 className="font-semibold text-white text-sm">{actor.name}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-2">{actor.nation} • {actor.sponsorship}</p>
              <div className="flex flex-wrap gap-1">
                {actor.targets.slice(0,3).map(t => <span key={t} className="tag text-xs">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
