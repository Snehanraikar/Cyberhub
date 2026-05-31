import { AlertTriangle, Bug, Activity, TrendingUp, Shield, Globe } from "lucide-react";

const stats = [
  { label: "Critical CVEs",          value: "1,203", change: "+42%", icon: Bug,           color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
  { label: "Ransomware Groups",       value: "94",    change: "+28%", icon: AlertTriangle,  color: "#ea580c", bg: "#fff7ed", border: "#fed7aa" },
  { label: "Threats Today",           value: "6,412", change: "+31%", icon: Activity,       color: "#ca8a04", bg: "#fefce8", border: "#fef08a" },
  { label: "Avg Breach Cost",         value: "$6.45M",change: "+32%", icon: TrendingUp,     color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
  { label: "Patched This Year",       value: "18,741",change: "+50%", icon: Shield,         color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
  { label: "Countries Targeted",      value: "167",   change: "+18%", icon: Globe,          color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
];

export default function ThreatStatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="bg-white rounded-xl p-4 border transition-all cursor-default"
            style={{ border: `1px solid ${s.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-1.5 rounded-lg" style={{ background: s.bg }}>
                <Icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
                {s.change}
              </span>
            </div>
            <div className="text-xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs font-medium" style={{ color: "#64748b" }}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
