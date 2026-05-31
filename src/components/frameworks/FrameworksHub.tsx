import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { frameworksData } from "@/lib/data/cybersecurity-data";
import { Target } from "lucide-react";

function MITRESection({ framework }: { framework: typeof frameworksData[0] }) {
  if (!framework.tactics) return null;
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{framework.description}</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {framework.tactics.map((tactic) => (
          <div
            key={tactic.id}
            className="p-3 rounded-xl cursor-default hover:brightness-95 transition-all"
            style={{ background: `${tactic.color}10`, border: `1px solid ${tactic.color}30` }}
          >
            <div className="font-mono text-xs mb-1" style={{ color: tactic.color }}>{tactic.id}</div>
            <div className="text-xs font-medium" style={{ color: '#1c1c1e' }}>{tactic.name}</div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl" style={{ background: '#f0faf4', border: '1px solid #b7e4c7' }}>
        <h4 className="text-sm font-semibold mb-2" style={{ color: '#1c1c1e' }}>How to Use MITRE ATT&CK</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { role: "Red Team", use: "Map your TTPs to ATT&CK to understand coverage and gaps in your attack simulations" },
            { role: "Blue Team", use: "Use ATT&CK to build detection rules and correlate alerts to adversary behavior" },
            { role: "Threat Hunters", use: "Hunt for specific techniques used by known threat actors in your environment" },
            { role: "SOC Analysts", use: "Contextualize alerts and understand the stage of an ongoing attack" },
          ].map(item => (
            <div key={item.role} className="text-xs">
              <span className="font-semibold" style={{ color: '#1ba94c' }}>{item.role}: </span>
              <span style={{ color: '#6b7280' }}>{item.use}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OWASPSection({ framework }: { framework: typeof frameworksData[0] }) {
  if (!framework.items) return null;
  const colors = ["#ef4444","#f97316","#eab308","#f97316","#06b6d4","#8b5cf6","#3b82f6","#ec4899","#22c55e","#14b8a6"];
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: '#6b7280' }}>{framework.description}</p>
      <div className="space-y-2">
        {framework.items.map((item, idx) => (
          <div
            key={item.rank}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            style={{ borderLeft: `3px solid ${colors[idx]}40`, background: `${colors[idx]}06` }}
          >
            <div
              className="w-10 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ color: colors[idx], background: `${colors[idx]}20` }}
            >
              {item.rank}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold" style={{ color: '#1c1c1e' }}>{item.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded border ${item.severity === "Critical" ? "sev-critical" : item.severity === "High" ? "sev-high" : "sev-medium"}`}>
                  {item.severity}
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KillChainSection({ framework }: { framework: typeof frameworksData[0] }) {
  if (!framework.phases) return null;
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: '#6b7280' }}>{framework.description}</p>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-400 via-purple-400 to-green-400" />
        <div className="space-y-3 pl-12">
          {framework.phases.map((phase, idx) => (
            <div key={phase.num} className="relative">
              <div className="absolute -left-12 top-3 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-base"
                style={{ borderColor: `hsl(${idx * 30 + 0}, 70%, 55%)` }}>
                {phase.icon}
              </div>
              <div className="glass rounded-xl p-4 hover:border-green-300 transition-all" style={{ border: '1px solid #e5e7eb' }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs" style={{ color: '#9ca3af' }}>Phase {phase.num}</span>
                  <h4 className="font-semibold" style={{ color: '#1c1c1e' }}>{phase.name}</h4>
                </div>
                <p className="text-sm" style={{ color: '#6b7280' }}>{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NISTSection({ framework }: { framework: typeof frameworksData[0] }) {
  if (!framework.functions) return null;
  return (
    <div className="space-y-4">
      <p className="text-sm" style={{ color: '#6b7280' }}>{framework.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {framework.functions.map((fn) => (
          <div
            key={fn.name}
            className="p-4 rounded-xl text-center cursor-default hover:brightness-95 transition-all"
            style={{ background: `${fn.color}10`, border: `1px solid ${fn.color}30` }}
          >
            <div className="text-2xl mb-2">
              {fn.name === "Identify" ? "🔍" : fn.name === "Protect" ? "🛡️" : fn.name === "Detect" ? "📡" : fn.name === "Respond" ? "🚨" : "🔄"}
            </div>
            <div className="font-bold text-sm mb-1.5" style={{ color: fn.color }}>{fn.name}</div>
            <p className="text-xs leading-snug" style={{ color: '#6b7280' }}>{fn.desc}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-xl" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
        <h4 className="text-sm font-semibold mb-3" style={{ color: '#1c1c1e' }}>NIST CSF Implementation Tiers</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { tier: "Tier 1", name: "Partial", desc: "Ad hoc, reactive" },
            { tier: "Tier 2", name: "Risk Informed", desc: "Awareness but not org-wide" },
            { tier: "Tier 3", name: "Repeatable", desc: "Formal, consistent processes" },
            { tier: "Tier 4", name: "Adaptive", desc: "Continuously improving" },
          ].map(t => (
            <div key={t.tier} className="p-3 rounded-lg" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
              <div className="text-xs font-mono mb-1" style={{ color: '#1ba94c' }}>{t.tier}</div>
              <div className="text-xs font-semibold" style={{ color: '#1c1c1e' }}>{t.name}</div>
              <div className="text-xs" style={{ color: '#9ca3af' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FrameworksHub() {
  const [searchParams] = useSearchParams();
  const idParam = searchParams.get("id");
  const [activeFramework, setActiveFramework] = useState(idParam || "mitre-attack");

  useEffect(() => {
    if (idParam) setActiveFramework(idParam);
  }, [idParam]);

  const current = frameworksData.find(f => f.id === activeFramework);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Target className="w-5 h-5 text-yellow-500" />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Security Frameworks</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Comprehensive guides for MITRE ATT&CK, OWASP, Kill Chain, NIST, and more</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {frameworksData.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setActiveFramework(fw.id)}
            className="p-4 rounded-xl text-left transition-all border"
            style={activeFramework === fw.id
              ? { background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1c1c1e' }
              : { background: '#ffffff', border: '1px solid #e5e7eb', color: '#6b7280' }
            }
          >
            <div className="text-lg mb-1.5">
              {fw.id === "mitre-attack" ? "🎯" : fw.id === "owasp-top10" ? "🌐" : fw.id === "cyber-kill-chain" ? "⛓️" : "🏛️"}
            </div>
            <div className="font-semibold text-sm" style={{ color: '#1c1c1e' }}>{fw.name}</div>
            <div className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>{fw.category}</div>
          </button>
        ))}
      </div>

      {current && (
        <div className="glass rounded-xl p-6" style={{ border: '1px solid #e5e7eb' }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold" style={{ color: '#1c1c1e' }}>{current.name}</h2>
              <span className="tag">{current.category}</span>
            </div>
            {current.use && (
              <div className="text-xs max-w-xs hidden md:block" style={{ color: '#9ca3af' }}>
                <span style={{ color: '#1ba94c' }}>Use case: </span>{current.use}
              </div>
            )}
          </div>

          {activeFramework === "mitre-attack" && <MITRESection framework={current} />}
          {activeFramework === "owasp-top10" && <OWASPSection framework={current} />}
          {activeFramework === "cyber-kill-chain" && <KillChainSection framework={current} />}
          {activeFramework === "nist-csf" && <NISTSection framework={current} />}
        </div>
      )}

      <div className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
        <h3 className="font-semibold mb-4" style={{ color: '#1c1c1e' }}>Framework Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Framework</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Primary Use</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Audience</th>
                <th className="text-left py-2 px-3 text-xs" style={{ color: '#9ca3af' }}>Scope</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "MITRE ATT&CK", use: "Threat modeling, detection", audience: "Red/Blue team, SOC", scope: "All attack phases" },
                { name: "OWASP Top 10", use: "Web app security", audience: "Developers, pentesters", scope: "Web vulnerabilities" },
                { name: "Cyber Kill Chain", use: "Attack phase analysis", audience: "Analysts, defenders", scope: "Attack lifecycle" },
                { name: "NIST CSF", use: "Risk management governance", audience: "CISOs, management", scope: "Enterprise-wide" },
                { name: "Zero Trust", use: "Network architecture", audience: "Architects, engineers", scope: "Network & identity" },
                { name: "STRIDE", use: "Threat modeling", audience: "Developers", scope: "Application design" },
              ].map(row => (
                <tr key={row.name} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td className="py-2.5 px-3 font-medium" style={{ color: '#1c1c1e' }}>{row.name}</td>
                  <td className="py-2.5 px-3" style={{ color: '#6b7280' }}>{row.use}</td>
                  <td className="py-2.5 px-3" style={{ color: '#6b7280' }}>{row.audience}</td>
                  <td className="py-2.5 px-3" style={{ color: '#6b7280' }}>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
