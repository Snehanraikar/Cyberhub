import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell, Shield, X } from "lucide-react";

const quickLinks = [
  { label: "Dashboard",   href: "/" },
  { label: "CVE Feed",    href: "/cve" },
  { label: "Cheatsheets", href: "/cheatsheets" },
  { label: "Frameworks",  href: "/frameworks" },
  { label: "News",        href: "/news" },
];

const suggestions = [
  "SQL Injection",
  "XSS Attack",
  "CVE-2026-1234",
  "MITRE ATT&CK",
  "Ransomware",
  "Nmap Commands",
];

export default function TopBar() {
  const location = useLocation();
  const [query, setQuery]           = useState("");
  const [focused, setFocused]       = useState(false);

  const filtered = query
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : suggestions;

  const showDropdown = focused && query.length > 0;

  return (
    <header
      className="lg:sticky top-0 z-20 h-14 flex items-center gap-4 px-4 lg:px-6"
      style={{
        background:   "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow:    "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2 ml-10">
        <div className="p-1.5 rounded-md" style={{ background: "#f0fdf4" }}>
          <Shield className="w-4 h-4" style={{ color: "#16a34a" }} />
        </div>
        <span className="font-bold text-sm" style={{ color: "#0f172a" }}>CyberHub</span>
      </div>

      {/* Desktop quick links */}
      <nav className="hidden lg:flex items-center gap-0.5 flex-1">
        {quickLinks.map((link) => {
          const active =
            link.href === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
              style={{
                color:      active ? "#16a34a" : "#475569",
                background: active ? "#f0fdf4" : "transparent",
                fontWeight: active ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Search */}
      <div className="relative flex-1 lg:flex-none lg:w-64">
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
          style={{
            background:  focused ? "#ffffff" : "#f8fafc",
            border:      focused ? "1px solid #16a34a" : "1px solid #e2e8f0",
            boxShadow:   focused ? "0 0 0 3px rgba(22,163,74,0.08)" : "none",
          }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#94a3b8" }} />
          <input
            type="text"
            placeholder="Search topics, CVEs, attacks…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 180)}
            className="flex-1 bg-transparent text-sm outline-none min-w-0"
            style={{ color: "#0f172a" }}
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <X className="w-3.5 h-3.5" style={{ color: "#94a3b8" }} />
            </button>
          )}
          {!query && (
            <kbd className="hidden lg:block text-xs px-1.5 py-0.5 rounded" style={{ background: "#f1f5f9", color: "#94a3b8", border: "1px solid #e2e8f0" }}>
              ⌘K
            </kbd>
          )}
        </div>

        {showDropdown && (
          <div
            className="absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden animate-fade-in"
            style={{ background: "#ffffff", border: "1px solid #e2e8f0", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          >
            <div className="py-1.5">
              <p className="text-xs font-medium px-3 py-1.5" style={{ color: "#94a3b8" }}>Suggestions</p>
              {filtered.map(r => (
                <button
                  key={r}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors"
                  style={{ color: "#334155" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <Search className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#94a3b8" }} />
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Live pill */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#16a34a" }} />
          LIVE
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: "#64748b" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "#dc2626" }} />
        </button>

        {/* AI Assistant CTA */}
        <Link
          to="/ai-assistant"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-white transition-all"
          style={{ background: "#16a34a" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#15803d")}
          onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
        >
          <Shield className="w-3.5 h-3.5" />
          Ask AI
        </Link>
      </div>
    </header>
  );
}
