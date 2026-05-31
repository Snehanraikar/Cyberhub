import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield, Home, Zap, Bug, BookOpen, Brain,
  Network, Newspaper, Target, ChevronDown, ChevronRight,
  Menu, X, Cpu, Search, Activity, Code, Award
} from "lucide-react";

const navItems = [
  { label: "Dashboard",          href: "/",             icon: Home },
  {
    label: "Networking",         href: "/networking",   icon: Network,
    sub: [
      { label: "OSI Model",        href: "/networking?id=osi-model" },
      { label: "TCP/IP",           href: "/networking?id=tcp-ip" },
      { label: "DNS",              href: "/networking?id=dns" },
      { label: "TLS/SSL",          href: "/networking?id=tls" },
      { label: "Subnetting",       href: "/networking?id=subnetting" },
      { label: "Ports Reference",  href: "/networking?id=ports" },
    ]
  },
  {
    label: "Attack Center",      href: "/attacks",      icon: Zap,
    sub: [
      { label: "SQL Injection",        href: "/attacks?id=sql-injection" },
      { label: "XSS",                  href: "/attacks?id=xss" },
      { label: "CSRF",                 href: "/attacks?id=csrf" },
      { label: "Ransomware",           href: "/attacks?id=ransomware" },
      { label: "Phishing",             href: "/attacks?id=phishing" },
      { label: "Privilege Escalation", href: "/attacks?id=privilege-escalation" },
      { label: "MITM",                 href: "/attacks?id=mitm" },
    ]
  },
  {
    label: "CVE Intelligence",   href: "/cve",          icon: Bug,
    sub: [
      { label: "Latest CVEs",       href: "/cve" },
      { label: "Critical Exploits", href: "/cve?filter=critical" },
      { label: "Ransomware-Linked", href: "/cve?filter=ransomware" },
    ]
  },
  {
    label: "Frameworks",         href: "/frameworks",   icon: Target,
    sub: [
      { label: "MITRE ATT&CK", href: "/frameworks?id=mitre-attack" },
      { label: "OWASP Top 10", href: "/frameworks?id=owasp-top10" },
      { label: "Kill Chain",   href: "/frameworks?id=kill-chain" },
      { label: "NIST CSF",     href: "/frameworks?id=nist-csf" },
    ]
  },
  {
    label: "Threat Intelligence", href: "/threat-intel", icon: Activity,
    sub: [
      { label: "Threat Actors",    href: "/threat-intel?id=actors" },
      { label: "Malware Families", href: "/threat-intel?id=malware" },
    ]
  },
  { label: "Security News",    href: "/news",           icon: Newspaper },
  {
    label: "Cheatsheets",       href: "/cheatsheets",   icon: Code,
    sub: [
      { label: "Nmap",            href: "/cheatsheets?id=nmap" },
      { label: "Linux PrivEsc",   href: "/cheatsheets?id=linux" },
      { label: "Burp Suite",      href: "/cheatsheets?id=burp-suite" },
      { label: "Metasploit",      href: "/cheatsheets?id=metasploit" },
      { label: "Wireshark",       href: "/cheatsheets?id=wireshark" },
      { label: "Active Directory", href: "/cheatsheets?id=windows-ad" },
    ]
  },
  {
    label: "Memory System",     href: "/memory",        icon: Brain,
    sub: [
      { label: "Flashcards", href: "/memory?id=flashcards" },
      { label: "Quiz Mode",  href: "/memory?id=quiz" },
      { label: "Mind Maps",  href: "/memory?id=mindmaps" },
    ]
  },
  { label: "Resources",        href: "/resources",      icon: BookOpen },
  { label: "AI Assistant",     href: "/ai-assistant",   icon: Cpu },
  {
    label: "Interview Prep",    href: "/interview-prep", icon: Award,
    sub: [
      { label: "Technical Questions",  href: "/interview-prep?id=technical" },
      { label: "Behavioral Questions", href: "/interview-prep?id=behavioral" },
      { label: "Quick Fire Facts",     href: "/interview-prep?id=quickfire" },
    ]
  },
];

/* ─── Icon accent colours per section ─── */
const iconColors: Record<string, string> = {
  Dashboard:            "#16a34a",
  Networking:           "#2563eb",
  "Attack Center":      "#dc2626",
  "CVE Intelligence":   "#ea580c",
  Frameworks:           "#7c3aed",
  "Threat Intelligence":"#0891b2",
  "Security News":      "#ca8a04",
  Cheatsheets:          "#16a34a",
  "Memory System":      "#db2777",
  Resources:            "#059669",
  "AI Assistant":       "#6366f1",
  "Interview Prep":     "#ca8a04",
};

export default function Sidebar() {
  const location  = useLocation();
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded,   setExpanded]   = useState<string[]>(["Attack Center"]);

  const toggle = (label: string) =>
    setExpanded(prev => prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]);

  const isActive = (href: string) => {
    const path = href.split("?")[0];
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const isSubActive = (href: string) => {
    const [path, qs] = href.split("?");
    const pathMatch = location.pathname === path || location.pathname.startsWith(path + "/");
    if (!qs) return pathMatch;
    const sp = new URLSearchParams(qs);
    const cp = new URLSearchParams(location.search);
    for (const [k, v] of sp.entries()) if (cp.get(k) === v) return pathMatch;
    return false;
  };

  /* ─── Shared nav item styles ─── */
  const parentStyle = (active: boolean, _label?: string) =>
    active
      ? {
          background:   "#f0fdf4",
          color:        "#15803d",
          borderLeft:   "3px solid #16a34a",
          paddingLeft:  "13px",
          fontWeight:   600,
        }
      : { color: "#475569", paddingLeft: "16px" };

  const subStyle = (active: boolean) =>
    active
      ? {
          background:  "#f0fdf4",
          color:       "#15803d",
          fontWeight:  600,
          borderLeft:  "2px solid #16a34a",
          paddingLeft: "10px",
        }
      : { color: "#64748b", paddingLeft: "12px" };

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ background: "#ffffff" }}>

      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div
          className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
          style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}
        >
          <Shield className="w-5 h-5" style={{ color: "#16a34a" }} />
        </div>

        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="font-bold text-sm leading-tight" style={{ color: "#0f172a" }}>CyberHub</p>
            <p className="text-xs" style={{ color: "#94a3b8" }}>Security Learning Platform</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-slate-100 flex-shrink-0"
          style={{ color: "#94a3b8" }}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* ── Search ── */}
      {!collapsed && (
        <div className="px-3 py-2.5" style={{ borderBottom: "1px solid #f1f5f9" }}>
          <Link
            to="/search"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all"
            style={{ background: "#f8fafc", border: "1px solid #e2e8f0", color: "#94a3b8" }}
          >
            <Search className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Search topics…</span>
            <kbd
              className="ml-auto px-1.5 py-0.5 rounded text-xs"
              style={{ background: "#e2e8f0", color: "#94a3b8", fontSize: "10px" }}
            >⌘K</kbd>
          </Link>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5" style={{ scrollbarWidth: "none" }}>
        {navItems.map((item) => {
          const Icon      = item.icon;
          const hasKids   = !!item.sub?.length;
          const isOpen    = expanded.includes(item.label);
          const active    = isActive(item.href);
          const iconColor = iconColors[item.label] ?? "#64748b";

          return (
            <div key={item.label}>
              {/* Parent */}
              {hasKids ? (
                <button
                  onClick={() => toggle(item.label)}
                  className="w-full flex items-center gap-2.5 pr-3 py-2 rounded-lg text-sm transition-all text-left"
                  style={parentStyle(active, item.label)}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#334155"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? "#16a34a" : iconColor }} />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {isOpen
                        ? <ChevronDown  className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#94a3b8" }} />
                        : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#94a3b8" }} />
                      }
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-2.5 pr-3 py-2 rounded-lg text-sm transition-all"
                  style={parentStyle(active, item.label)}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#334155"; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#475569"; } }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? "#16a34a" : iconColor }} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )}

              {/* Sub-items */}
              {hasKids && isOpen && !collapsed && (
                <div className="ml-6 mt-0.5 mb-1 space-y-0.5" style={{ borderLeft: "1px solid #e2e8f0" }}>
                  {item.sub!.map(sub => {
                    const sa = isSubActive(sub.href);
                    return (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className="flex items-center gap-2 py-1.5 rounded-md text-xs transition-all ml-0"
                        style={subStyle(sa)}
                        onMouseEnter={e => { if (!sa) { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#334155"; } }}
                        onMouseLeave={e => { if (!sa) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#64748b"; } }}
                      >
                        {sub.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      {!collapsed && (
        <div className="px-4 py-3" style={{ borderTop: "1px solid #f1f5f9" }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#16a34a" }} />
            <span className="text-xs" style={{ color: "#94a3b8" }}>Live threat feeds active</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#16a34a", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", boxShadow: "4px 0 20px rgba(0,0,0,0.1)" }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg"
          style={{ color: "#94a3b8" }}
        >
          <X className="w-5 h-5" />
        </button>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
        style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0" }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
