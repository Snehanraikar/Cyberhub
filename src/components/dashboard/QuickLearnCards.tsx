import { Link } from "react-router-dom";
import { Network, Zap, Bug, Code, Brain, BookOpen, Target, Newspaper } from "lucide-react";

const cards = [
  { title: "Networking",         desc: "OSI, TCP/IP, DNS, TLS, Subnetting",  href: "/networking",  icon: Network,   color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", topics: 15,  time: "4 hrs" },
  { title: "Attack Center",      desc: "SQLi, XSS, Ransomware, MITM",        href: "/attacks",     icon: Zap,       color: "#dc2626", bg: "#fef2f2", border: "#fecaca", topics: 20,  time: "8 hrs" },
  { title: "CVE Intelligence",   desc: "Latest vulnerabilities & exploits",  href: "/cve",         icon: Bug,       color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", topics: 500, time: "Live"  },
  { title: "Cheatsheets",        desc: "Nmap, Burp, Metasploit, Wireshark",  href: "/cheatsheets", icon: Code,      color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", topics: 12,  time: "Ref"   },
  { title: "Memory System",      desc: "Flashcards, quizzes, mind maps",     href: "/memory",      icon: Brain,     color: "#db2777", bg: "#fdf2f8", border: "#f9a8d4", topics: 200, time: "Daily" },
  { title: "Frameworks",         desc: "MITRE, OWASP, Kill Chain, NIST",     href: "/frameworks",  icon: Target,    color: "#ca8a04", bg: "#fefce8", border: "#fef08a", topics: 8,   time: "6 hrs" },
  { title: "Security News",      desc: "Latest breaches, CVEs, threat intel",href: "/news",        icon: Newspaper, color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", topics: 0,   time: "Live"  },
  { title: "Resources",          desc: "TryHackMe, HTB, PortSwigger, certs", href: "/resources",   icon: BookOpen,  color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", topics: 50,  time: "Ongoing"},
];

export default function QuickLearnCards() {
  return (
    <div>
      <h2 className="text-base font-semibold mb-4" style={{ color: "#0f172a" }}>Learning Modules</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              to={c.href}
              className="group block bg-white rounded-xl p-4 transition-all duration-200"
              style={{ border: `1px solid ${c.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.09)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded-lg" style={{ background: c.bg }}>
                  <Icon className="w-4 h-4" style={{ color: c.color }} />
                </div>
                {c.topics > 0 && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: c.bg, color: c.color }}>
                    {c.topics > 100 ? `${c.topics}+` : c.topics}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 leading-tight" style={{ color: "#0f172a" }}>{c.title}</h3>
              <p className="text-xs leading-snug mb-3" style={{ color: "#64748b" }}>{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: c.color }}>{c.time}</span>
                <span className="text-xs" style={{ color: c.color }}>→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
