import { Link } from "react-router-dom";
import { cveData } from "@/lib/data/cybersecurity-data";
import { AlertTriangle, ExternalLink, Zap } from "lucide-react";

function SeverityBadge({ severity, cvss }: { severity: string; cvss: number }) {
  const colors: Record<string, string> = {
    Critical: "sev-critical",
    High: "sev-high",
    Medium: "sev-medium",
    Low: "sev-low",
  };
  return (
    <div className="flex items-center gap-1.5">
      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${colors[severity] || "sev-medium"}`}>
        {severity}
      </span>
      <span className="text-xs font-mono" style={{ color: '#9ca3af' }}>{cvss.toFixed(1)}</span>
    </div>
  );
}

export default function RecentCVEs() {
  return (
    <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h2 className="font-semibold" style={{ color: '#1c1c1e' }}>Critical CVEs</h2>
          <div className="flex items-center gap-1 ml-2">
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-red-500">LIVE</span>
          </div>
        </div>
        <Link to="/cve" className="text-xs flex items-center gap-1 hover:underline" style={{ color: '#1ba94c' }}>
          View all <ExternalLink className="w-3 h-3" />
        </Link>
      </div>

      <div className="divide-y" style={{ borderColor: '#f3f4f6' }}>
        {cveData.map((cve) => (
          <Link
            key={cve.id}
            to={`/cve/${cve.id.toLowerCase()}`}
            className="flex items-start gap-3 px-5 py-3.5 transition-colors group hover:bg-gray-50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-mono text-xs font-medium" style={{ color: '#1ba94c' }}>{cve.id}</span>
                {cve.exploited && (
                  <span className="flex items-center gap-0.5 text-xs text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded-full">
                    <Zap className="w-2.5 h-2.5" /> Exploited
                  </span>
                )}
                <span className="text-xs" style={{ color: '#9ca3af' }}>{cve.vendor}</span>
              </div>
              <p className="text-sm leading-snug truncate pr-2 transition-colors" style={{ color: '#374151' }}>
                {cve.title}
              </p>
              <div className="flex items-center gap-3 mt-1.5">
                <SeverityBadge severity={cve.severity} cvss={cve.cvss} />
                <span className="text-xs" style={{ color: '#9ca3af' }}>{cve.published}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
