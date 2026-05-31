import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { threatActors } from "@/lib/data/cybersecurity-data";
import { Activity } from "lucide-react";

const malwareFamilies = [
  { id: "lockbit", name: "LockBit 4.0", type: "Ransomware", firstSeen: "2019", active: true, description: "One of the most prolific ransomware-as-a-service (RaaS) operations. Uses double extortion and leak site. Targets Windows, Linux, and VMware ESXi.", targets: ["Windows", "Linux", "ESXi"] },
  { id: "wannacry", name: "WannaCry", type: "Ransomware Worm", firstSeen: "2017", active: false, description: "Exploited EternalBlue (MS17-010) to spread laterally across networks. Caused $4B in damages globally, crippled the NHS.", targets: ["Windows XP", "Windows 7"] },
  { id: "cobalt-strike", name: "Cobalt Strike", type: "C2 Framework", firstSeen: "2012", active: true, description: "Legitimate red team tool widely abused by threat actors. Provides beaconing, lateral movement, and post-exploitation capabilities.", targets: ["Windows", "Linux", "macOS"] },
  { id: "emotet", name: "Emotet", type: "Banking Trojan / Loader", firstSeen: "2014", active: true, description: "Originally a banking trojan, evolved into a sophisticated malware loader. Delivered via malicious Office macros and spam campaigns.", targets: ["Windows"] },
  { id: "ryuk", name: "Ryuk", type: "Ransomware", firstSeen: "2018", active: false, description: "Targeted ransomware attributed to WIZARD SPIDER. Often deployed after Emotet/TrickBot infections. Hit hospitals and media companies.", targets: ["Windows", "Enterprise networks"] },
  { id: "sliver", name: "Sliver", type: "C2 Framework", firstSeen: "2019", active: true, description: "Open-source C2 framework increasingly used by threat actors as a Cobalt Strike alternative. Supports implants in Go and C.", targets: ["Windows", "Linux", "macOS"] },
];

export default function ThreatIntelHub() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("id") === "malware" ? "malware" : "actors";
  const [tab, setTab] = useState<"actors" | "malware">(defaultTab as "actors" | "malware");

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5" style={{ color: '#1ba94c' }} />
          <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>Threat Intelligence</h1>
        </div>
        <p className="text-sm" style={{ color: '#6b7280' }}>Known threat actors, APT groups, and malware families</p>
      </div>

      <div className="flex gap-2">
        {(["actors", "malware"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize"
            style={tab === t
              ? { background: '#1ba94c', color: '#fff' }
              : { background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }
            }
          >
            {t === "actors" ? "Threat Actors" : "Malware Families"}
          </button>
        ))}
      </div>

      {tab === "actors" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {threatActors.map(actor => (
            <div key={actor.id} className="glass rounded-lg p-5 space-y-3" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{actor.name}</h3>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{actor.nation} — {actor.sponsorship}</p>
                </div>
                <span className="tag">{actor.mitre}</span>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>TARGETS</p>
                <div className="flex flex-wrap gap-1">
                  {actor.targets.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>KNOWN MALWARE</p>
                <div className="flex flex-wrap gap-1">
                  {actor.knownMalware.map(m => (
                    <span key={m} className="text-xs px-2 py-0.5 rounded" style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }}>{m}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>NOTABLE ATTACKS</p>
                <ul className="space-y-0.5">
                  {actor.notableAttacks.map(a => (
                    <li key={a} className="text-xs flex items-start gap-1.5" style={{ color: '#6b7280' }}>
                      <span style={{ color: '#1ba94c' }}>•</span>{a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {malwareFamilies.map(mw => (
            <div key={mw.id} className="glass rounded-lg p-5 space-y-3" style={{ border: '1px solid #e5e7eb' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold" style={{ color: '#1c1c1e' }}>{mw.name}</h3>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{mw.type} — {mw.firstSeen}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded border ${mw.active ? 'sev-critical' : 'sev-low'}`}>
                  {mw.active ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm" style={{ color: '#374151' }}>{mw.description}</p>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#9ca3af' }}>TARGET SYSTEMS</p>
                <div className="flex flex-wrap gap-1">
                  {mw.targets.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
