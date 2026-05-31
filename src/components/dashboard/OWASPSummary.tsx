import { Link } from "react-router-dom";
import { frameworksData } from "@/lib/data/cybersecurity-data";
import { Shield } from "lucide-react";

const owaspColors = [
  "#ef4444", "#f97316", "#eab308", "#f97316", "#06b6d4",
  "#8b5cf6", "#3b82f6", "#ec4899", "#22c55e", "#14b8a6"
];

export default function OWASPSummary() {
  const owasp = frameworksData.find(f => f.id === "owasp-top10");
  if (!owasp || !owasp.items) return null;

  return (
    <div className="glass rounded-xl overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #f3f4f6' }}>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4" style={{ color: '#1ba94c' }} />
          <h2 className="font-semibold" style={{ color: '#1c1c1e' }}>OWASP Top 10</h2>
          <span className="text-xs ml-1" style={{ color: '#9ca3af' }}>2021</span>
        </div>
        <Link to="/frameworks?id=owasp-top10" className="text-xs hover:underline" style={{ color: '#1ba94c' }}>
          Full guide →
        </Link>
      </div>

      <div className="p-4 space-y-2">
        {owasp.items.map((item, idx) => (
          <div
            key={item.rank}
            className="flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-default group hover:bg-gray-50"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: `${owaspColors[idx]}20`, color: owaspColors[idx], border: `1px solid ${owaspColors[idx]}30` }}
            >
              {item.rank.replace("A0", "A").replace("A1", "A1")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate transition-colors" style={{ color: '#374151' }}>
                {item.name}
              </div>
              <div className="text-xs truncate" style={{ color: '#9ca3af' }}>{item.desc}</div>
            </div>
            <span
              className={`text-xs px-2 py-0.5 rounded border flex-shrink-0
                ${item.severity === "Critical" ? "sev-critical" :
                  item.severity === "High" ? "sev-high" : "sev-medium"}`}
            >
              {item.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
