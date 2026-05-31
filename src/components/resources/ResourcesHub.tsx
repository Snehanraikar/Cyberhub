import { useState } from "react";
import { resources } from "@/lib/data/cybersecurity-data";
import { BookOpen, ExternalLink, Award } from "lucide-react";

const certifications = [
  { name: "CompTIA Security+", level: "Beginner", org: "CompTIA", focus: "Security fundamentals", time: "3-6 months", tags: ["entry-level", "vendor-neutral"] },
  { name: "CEH", level: "Intermediate", org: "EC-Council", focus: "Ethical hacking techniques", time: "6-12 months", tags: ["ethical-hacking", "penetration-testing"] },
  { name: "OSCP", level: "Advanced", org: "Offensive Security", focus: "Hands-on penetration testing", time: "12-24 months", tags: ["pentest", "hands-on", "prestigious"] },
  { name: "CISSP", level: "Advanced", org: "ISC²", focus: "Security management & architecture", time: "12-24 months", tags: ["management", "architecture", "enterprise"] },
  { name: "CISM", level: "Advanced", org: "ISACA", focus: "Information security management", time: "12-24 months", tags: ["management", "governance"] },
  { name: "AWS Security Specialty", level: "Intermediate", org: "Amazon", focus: "Cloud security on AWS", time: "6-12 months", tags: ["cloud", "aws"] },
  { name: "eJPT", level: "Beginner", org: "eLearnSecurity", focus: "Junior penetration testing", time: "2-3 months", tags: ["entry-level", "pentest"] },
  { name: "PNPT", level: "Intermediate", org: "TCM Security", focus: "Practical network penetration testing", time: "6-12 months", tags: ["pentest", "practical"] },
];

const learningPaths = [
  {
    title: "Complete Beginner Path",
    time: "3-6 months",
    steps: [
      "CompTIA A+ (optional hardware basics)",
      "CompTIA Network+ (networking fundamentals)",
      "TryHackMe — Pre-Security path",
      "TryHackMe — SOC Level 1",
      "CompTIA Security+",
      "PortSwigger Web Academy — Apprentice labs",
    ]
  },
  {
    title: "Web App Security Path",
    time: "4-8 months",
    steps: [
      "PortSwigger Web Security Academy (all apprentice)",
      "OWASP Testing Guide",
      "Burp Suite Certified Practitioner prep",
      "HackTheBox — Web challenges",
      "PortSwigger practitioner labs",
      "Bug bounty: HackerOne / Bugcrowd beginner programs",
    ]
  },
  {
    title: "Penetration Tester Path",
    time: "12-24 months",
    steps: [
      "TryHackMe — Jr Penetration Tester",
      "Learn Metasploit, Nmap, Burp Suite",
      "HackTheBox — Easy machines",
      "TCM Security courses (networking, Linux, Windows)",
      "eJPT certification",
      "HackTheBox Pro Labs (Offshore, RastaLabs)",
      "PNPT certification",
      "OSCP exam",
    ]
  },
  {
    title: "SOC Analyst Path",
    time: "6-12 months",
    steps: [
      "CompTIA Security+",
      "TryHackMe SOC Level 1 & 2",
      "Learn Splunk / Elastic SIEM",
      "Blue Team Labs Online",
      "Learn MITRE ATT&CK deeply",
      "CompTIA CySA+",
      "Apply for Tier 1 SOC positions",
    ]
  }
];

function ResourceCard({ resource }: { resource: typeof resources[0] }) {
  const catBorder: Record<string, string> = {
    Labs: "border-green-200",
    Documentation: "border-blue-200",
    "Threat Intelligence": "border-orange-200",
    News: "border-green-200",
    Research: "border-purple-200",
  };

  return (
    <div className={`glass rounded-xl border p-5 hover:shadow-md transition-all ${catBorder[resource.category] || "border-gray-200"}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{resource.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="tag">{resource.category}</span>
            <span className="text-xs" style={{ color: '#9ca3af' }}>{resource.difficulty}</span>
          </div>
        </div>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs hover:underline flex-shrink-0"
          style={{ color: '#1ba94c' }}
        >
          Visit <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <p className="text-sm leading-relaxed mb-3" style={{ color: '#6b7280' }}>{resource.description}</p>

      <div className="flex items-center justify-between">
        <div className="text-xs" style={{ color: '#9ca3af' }}>
          ⏱ {resource.time}
        </div>
        <div className="flex flex-wrap gap-1 justify-end">
          {resource.tags.slice(0, 3).map(tag => <span key={tag} className="tag text-xs">{tag}</span>)}
        </div>
      </div>

      <div className="mt-3 pt-3" style={{ borderTop: '1px solid #f3f4f6' }}>
        <p className="text-xs" style={{ color: '#9ca3af' }}>Focus: <span style={{ color: '#374151' }}>{resource.focus}</span></p>
      </div>
    </div>
  );
}

export default function ResourcesHub() {
  const [activeTab, setActiveTab] = useState<"platforms" | "certs" | "paths">("platforms");
  const [catFilter, setCatFilter] = useState("All");

  const cats = ["All", "Labs", "Documentation", "Threat Intelligence", "News", "Research"];
  const filtered = resources.filter(r => catFilter === "All" || r.category === catFilter);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-teal-500" />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Learning Resources Hub</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Curated platforms, certifications, and structured learning paths</p>
      </div>

      <div className="flex gap-2">
        {[
          { id: "platforms" as const, label: "Platforms & Resources", icon: "🌐" },
          { id: "certs" as const, label: "Certifications", icon: "🏆" },
          { id: "paths" as const, label: "Learning Paths", icon: "🗺️" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={activeTab === tab.id
              ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
              : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
            }
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "platforms" && (
        <>
          <div className="flex gap-2 flex-wrap">
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={catFilter === cat
                  ? { background: '#1ba94c', color: '#fff', border: '1px solid #1ba94c' }
                  : { background: '#f7f8fa', color: '#6b7280', border: '1px solid #e5e7eb' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(r => <ResourceCard key={r.name} resource={r} />)}
          </div>
        </>
      )}

      {activeTab === "certs" && (
        <div className="space-y-3">
          {["Beginner", "Intermediate", "Advanced"].map(level => (
            <div key={level}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#6b7280' }}>
                <Award className="w-4 h-4 text-yellow-500" /> {level} Level
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {certifications.filter(c => c.level === level).map(cert => (
                  <div key={cert.name} className="glass rounded-xl p-4" style={{ border: '1px solid #e5e7eb' }}>
                    <h4 className="font-semibold mb-0.5" style={{ color: '#1c1c1e' }}>{cert.name}</h4>
                    <p className="text-xs mb-2" style={{ color: '#9ca3af' }}>by {cert.org}</p>
                    <p className="text-sm mb-3" style={{ color: '#6b7280' }}>{cert.focus}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: '#9ca3af' }}>⏱ {cert.time}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${level === "Beginner" ? "sev-low" : level === "Intermediate" ? "sev-medium" : "sev-high"}`}>
                        {level}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cert.tags.map(t => <span key={t} className="tag text-xs">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "paths" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPaths.map(path => (
            <div key={path.title} className="glass rounded-xl p-5" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{path.title}</h3>
                <span className="tag">{path.time}</span>
              </div>
              <ol className="space-y-2.5">
                {path.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}>
                      {i + 1}
                    </div>
                    <span className="text-sm pt-0.5" style={{ color: '#374151' }}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
