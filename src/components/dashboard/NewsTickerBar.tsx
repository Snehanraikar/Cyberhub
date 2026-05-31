import { useState, useEffect } from "react";
import { Radio, ChevronLeft, ChevronRight } from "lucide-react";

const headlines = [
  { level: "CRITICAL", color: "#dc2626", bg: "#fef2f2", text: "Volt Typhoon implants found in 14 US power grid OT networks — CISA Emergency Directive AA26-132A" },
  { level: "CRITICAL", color: "#dc2626", bg: "#fef2f2", text: "RansomHub hits 200+ hospitals worldwide — NHS and US health networks crippled (May 2026)" },
  { level: "HIGH",     color: "#ea580c", bg: "#fff7ed", text: "CVE-2026-1234 Windows CLFS zero-day actively chained with ransomware loaders — patch now" },
  { level: "CRITICAL", color: "#dc2626", bg: "#fef2f2", text: "CVE-2026-21334 Hyper-V VM escape exploited in enterprise cloud environments" },
  { level: "HIGH",     color: "#ea580c", bg: "#fff7ed", text: "AI-generated spear phishing kits achieve 67% click rate — FBI Private Industry Notification" },
  { level: "CRITICAL", color: "#dc2626", bg: "#fef2f2", text: "47 malicious PyPI packages downloaded 4.2M times — CI/CD pipelines at risk" },
  { level: "INFO",     color: "#2563eb", bg: "#eff6ff", text: "CISA adds 9 new KEV entries; CVE-2026-24085 Apple WebKit zero-day tops the list" },
  { level: "HIGH",     color: "#ea580c", bg: "#fff7ed", text: "CVE-2026-0282 Ivanti VPN exploited by UNC5337 — thousands of appliances backdoored" },
  { level: "INFO",     color: "#16a34a", bg: "#f0fdf4", text: "OpenSSL 3.4.1 released — patches critical TLS session desync RCE (CVE-2026-3094)" },
  { level: "HIGH",     color: "#ea580c", bg: "#fff7ed", text: "NIST NVD backlog cleared — AI-assisted triage now processing 300+ CVEs per day" },
];

export default function NewsTickerBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % headlines.length), 5000);
    return () => clearInterval(t);
  }, []);

  const h = headlines[idx];

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{ background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Live badge */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Radio className="w-3.5 h-3.5 animate-pulse" style={{ color: "#dc2626" }} />
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#dc2626" }}>Live</span>
      </div>

      <div className="w-px h-4 flex-shrink-0" style={{ background: "#e2e8f0" }} />

      {/* Level badge */}
      <span
        className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
        style={{ background: h.bg, color: h.color }}
      >
        {h.level}
      </span>

      {/* Headline */}
      <p className="flex-1 text-sm truncate" style={{ color: "#334155" }}>{h.text}</p>

      {/* Controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => setIdx(p => (p - 1 + headlines.length) % headlines.length)}
          className="p-1 rounded-md transition-colors"
          style={{ color: "#94a3b8" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="text-xs" style={{ color: "#94a3b8" }}>{idx + 1}/{headlines.length}</span>
        <button
          onClick={() => setIdx(p => (p + 1) % headlines.length)}
          className="p-1 rounded-md transition-colors"
          style={{ color: "#94a3b8" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
