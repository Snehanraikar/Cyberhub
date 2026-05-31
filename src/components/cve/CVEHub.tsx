import { useState } from "react";
import { cveData } from "@/lib/data/cybersecurity-data";
import { Bug, Zap, Shield, ArrowRight, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";

function CVSSGauge({ score }: { score: number }) {
  const color = score >= 9 ? "#ef4444" : score >= 7 ? "#f97316" : score >= 4 ? "#eab308" : "#22c55e";
  const pct = (score / 10) * 100;
  const circumference = 2 * Math.PI * 28;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
        <circle
          cx="32" cy="32" r="28" fill="none"
          stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold leading-none" style={{ color }}>{score.toFixed(1)}</span>
        <span className="text-xs" style={{ color: '#9ca3af' }}>CVSS</span>
      </div>
    </div>
  );
}

function CVECard({ cve }: { cve: typeof cveData[0] }) {
  const [expanded, setExpanded] = useState(false);
  const sevBorder: Record<string, string> = {
    Critical: "border-red-200 bg-red-50",
    High: "border-orange-200 bg-orange-50",
    Medium: "border-yellow-200 bg-yellow-50",
    Low: "border-green-200 bg-green-50",
  };

  return (
    <div className={`rounded-xl border overflow-hidden glass ${sevBorder[cve.severity] || "border-gray-200"}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-4 p-5 hover:bg-gray-50 transition-colors text-left"
      >
        <CVSSGauge score={cve.cvss} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="font-mono text-sm font-bold" style={{ color: '#1ba94c' }}>{cve.id}</span>
            {cve.exploited && (
              <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full font-medium">
                <Zap className="w-3 h-3" /> Actively Exploited
              </span>
            )}
            <span className={`text-xs px-2 py-0.5 rounded border ${cve.severity === "Critical" ? "sev-critical" : cve.severity === "High" ? "sev-high" : "sev-medium"}`}>
              {cve.severity}
            </span>
          </div>
          <h3 className="font-semibold mb-1" style={{ color: '#1c1c1e' }}>{cve.title}</h3>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs" style={{ color: '#9ca3af' }}>Vendor: <span style={{ color: '#374151' }}>{cve.vendor}</span></span>
            <span className="text-xs" style={{ color: '#9ca3af' }}>Published: <span style={{ color: '#374151' }}>{cve.published}</span></span>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#1ba94c' }} /> : <ChevronDown className="w-4 h-4 flex-shrink-0 mt-1" style={{ color: '#9ca3af' }} />}
      </button>

      {expanded && (
        <div className="p-5 space-y-5" style={{ borderTop: '1px solid #e5e7eb' }}>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>{cve.description}</p>

          <div>
            <h4 className="text-xs font-semibold text-red-500 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Attack Path
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {cve.attackPath.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 border border-red-200 text-red-600">
                    {step}
                  </span>
                  {i < cve.attackPath.length - 1 && <ArrowRight className="w-3 h-3" style={{ color: '#d1d5db' }} />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-orange-500 mb-2">Affected Systems</h4>
              <ul className="space-y-1">
                {cve.systems.map((sys, i) => (
                  <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                    <span className="text-orange-500 mt-0.5">•</span>{sys}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Mitigation
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: '#6b7280' }}>{cve.mitigation}</p>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2" style={{ color: '#1ba94c' }}>Patch Information</h4>
              <p className="text-xs font-mono leading-relaxed" style={{ color: '#6b7280' }}>{cve.patch}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop: '1px solid #f3f4f6' }}>
            {cve.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="flex gap-2 pt-1">
            <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-gray-100" style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}>
              Explain like beginner
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-gray-100" style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}>
              Technical deep dive
            </button>
            <button className="text-xs px-3 py-1.5 rounded-lg transition-all hover:bg-gray-100" style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}>
              How attackers exploit this
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CVEHub() {
  const [sevFilter, setSevFilter] = useState("All");
  const [exploitedFilter, setExploitedFilter] = useState(false);

  const filtered = cveData.filter(cve => {
    const matchesSev = sevFilter === "All" || cve.severity === sevFilter;
    const matchesExploit = !exploitedFilter || cve.exploited;
    return matchesSev && matchesExploit;
  });

  const critCount = cveData.filter(c => c.severity === "Critical").length;
  const exploitedCount = cveData.filter(c => c.exploited).length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bug className="w-5 h-5 text-orange-500" />
            <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>CVE Intelligence Dashboard</h1>
          </div>
          <p className="text-sm" style={{ color: '#6b7280' }}>Latest vulnerabilities with human-readable explanations, attack paths, and mitigation guidance</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-3 text-center" style={{ border: '1px solid #fca5a5' }}>
            <div className="text-2xl font-bold text-red-500">{critCount}</div>
            <div className="text-xs" style={{ color: '#9ca3af' }}>Critical</div>
          </div>
          <div className="glass rounded-xl px-4 py-3 text-center" style={{ border: '1px solid #fdba74' }}>
            <div className="text-2xl font-bold text-orange-500">{exploitedCount}</div>
            <div className="text-xs" style={{ color: '#9ca3af' }}>Exploited</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 flex-wrap">
          {["All", "Critical", "High", "Medium", "Low"].map(sev => (
            <button
              key={sev}
              onClick={() => setSevFilter(sev)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={sevFilter === sev
                ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
                : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {sev}
            </button>
          ))}
        </div>
        <button
          onClick={() => setExploitedFilter(!exploitedFilter)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={exploitedFilter
            ? { background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }
            : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
          }
        >
          <Zap className="w-3.5 h-3.5" /> Actively Exploited Only
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map(cve => <CVECard key={cve.id} cve={cve} />)}
        {filtered.length === 0 && (
          <div className="text-center py-12" style={{ color: '#9ca3af' }}>No CVEs match your filters</div>
        )}
      </div>
    </div>
  );
}
