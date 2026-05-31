"use client";

import { useState } from "react";
import { Shield, Terminal, CheckCircle, Copy, Check } from "lucide-react";

function CodeBlock({ code, lang = "bash" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group rounded-xl overflow-hidden border border-white/10 bg-[#060d1a]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/3">
        <span className="text-xs text-slate-500 font-mono">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
        >
          {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
        </button>
      </div>
      <pre className="p-4 text-sm text-slate-300 overflow-x-auto leading-relaxed font-mono whitespace-pre">{code}</pre>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-xl border border-cyan-500/20 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-white/2">
        <span className="text-lg">{icon}</span>
        <h2 className="font-semibold text-white">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Step({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-sm font-bold text-cyan-400 flex-shrink-0">{num}</div>
        <div className="w-0.5 flex-1 bg-cyan-500/15 mt-1 mb-1" />
      </div>
      <div className="pb-6 flex-1">
        <h3 className="font-semibold text-white mb-2">{title}</h3>
        <div className="text-sm text-slate-400 space-y-2">{children}</div>
      </div>
    </div>
  );
}

const tabs = [
  { id: "setup", label: "Project Setup", icon: "⚙️" },
  { id: "manual", label: "Manual Testing", icon: "🔍" },
  { id: "automated", label: "Automated Tests", icon: "🤖" },
  { id: "security", label: "Security Testing", icon: "🛡️" },
  { id: "performance", label: "Performance", icon: "⚡" },
  { id: "checklist", label: "QA Checklist", icon: "✅" },
];

export default function TestingGuide() {
  const [activeTab, setActiveTab] = useState("setup");

  return (
    <div className="max-w-[1100px] mx-auto space-y-6">

      {/* Header */}
      <div className="glass rounded-2xl border border-cyan-500/30 p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/40">
            <Shield className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Project Testing Guide</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              Complete guide to run, test, and verify the CyberHub application — from local setup to security auditing and performance testing.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all
              ${activeTab === tab.id ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40" : "glass border border-white/10 text-slate-400 hover:text-white"}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ─── SETUP TAB ─── */}
      {activeTab === "setup" && (
        <div className="space-y-5">
          <Section title="Prerequisites" icon="📋">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { tool: "Node.js", version: "18.x or higher", check: "node --version", required: true },
                { tool: "npm", version: "9.x or higher", check: "npm --version", required: true },
                { tool: "Git", version: "Any recent version", check: "git --version", required: true },
                { tool: "VS Code", version: "Recommended editor", check: "code --version", required: false },
              ].map(item => (
                <div key={item.tool} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/8">
                  <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${item.required ? "text-green-400" : "text-slate-500"}`} />
                  <div>
                    <span className="font-medium text-white text-sm">{item.tool}</span>
                    <span className="text-xs text-slate-500 ml-2">{item.version}</span>
                    <code className="block text-xs text-cyan-400 mt-0.5">{item.check}</code>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Installation & Running" icon="🚀">
            <div className="space-y-4">
              <Step num={1} title="Navigate to project directory">
                <CodeBlock code={`cd "C:\\Users\\user\\Documents\\Project\\cybersec-hub"`} lang="powershell" />
              </Step>
              <Step num={2} title="Install dependencies (if not already done)">
                <CodeBlock code={`npm install`} />
              </Step>
              <Step num={3} title="Start the development server">
                <CodeBlock code={`npm run dev
# App available at: http://localhost:3000`} />
                <p className="text-slate-400 text-sm mt-2">If port 3000 is in use: <code className="text-cyan-400">npm run dev -- --port 3001</code></p>
              </Step>
              <Step num={4} title="Build for production">
                <CodeBlock code={`npm run build
npm run start     # runs production build locally`} />
              </Step>
              <Step num={5} title="Verify build output">
                <CodeBlock code={`# Expected output (14 static routes, 0 errors):
Route (app)
├ ○ /
├ ○ /attacks
├ ○ /cheatsheets
├ ○ /cve
├ ○ /frameworks
├ ○ /interview-prep
├ ○ /memory
├ ○ /networking
├ ○ /news
├ ○ /resources
├ ○ /testing-guide
└ ○ /threat-intel`} />
              </Step>
            </div>
          </Section>

          <Section title="Environment & Config" icon="🔧">
            <p className="text-sm text-slate-400 mb-3">CyberHub is a fully static frontend app — no environment variables or database needed to run. All data lives in <code className="text-cyan-400">src/lib/data/</code>.</p>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-green-400">✅ Zero-config local setup — just <code>npm install && npm run dev</code></p>
            </div>
          </Section>
        </div>
      )}

      {/* ─── MANUAL TESTING TAB ─── */}
      {activeTab === "manual" && (
        <div className="space-y-5">
          <Section title="Page-by-Page Manual Test Plan" icon="🔍">
            <div className="space-y-4">
              {[
                {
                  page: "Dashboard (/)",
                  url: "http://localhost:3000",
                  steps: [
                    "Verify news ticker rotates every 4 seconds",
                    "Check 6 threat stat cards render with values and change percentages",
                    "Verify attack trend chart (AreaChart) renders with legend",
                    "Click CVE items — verify hover states",
                    "Check OWASP Top 10 shows all 10 items with severity badges",
                    "Check MITRE ATT&CK shows 12 tactic cards",
                    "Click all 8 learning module cards — verify navigation",
                  ]
                },
                {
                  page: "Networking (/networking)",
                  url: "http://localhost:3000/networking",
                  steps: [
                    "Click 'Topics' vs 'Ports Reference' tabs — both should load",
                    "Expand OSI Model — visual layers, mnemonic, attacks table should appear",
                    "Expand TCP/IP — handshake diagram with 3 steps should show",
                    "Expand DNS — 7-step resolution flowchart should render",
                    "Switch to Ports tab — 19 ports should list",
                    "Filter ports by 'Critical' — should show only critical risk ports",
                  ]
                },
                {
                  page: "Attack Center (/attacks)",
                  url: "http://localhost:3000/attacks",
                  steps: [
                    "All 6 attacks appear (SQL Injection, XSS, CSRF, Ransomware, Phishing, MITM, Privilege Escalation)",
                    "Category filter works — click 'Web Security' shows only web attacks",
                    "Search 'ransom' — only ransomware card shows",
                    "Expand any attack — lifecycle steps, tools, prevention, detection all render",
                    "Tags at bottom of each expanded card are visible",
                  ]
                },
                {
                  page: "CVE Intelligence (/cve)",
                  url: "http://localhost:3000/cve",
                  steps: [
                    "5 CVE cards render with CVSS SVG gauge charts",
                    "Filter by 'Critical' — only critical CVEs show",
                    "Toggle 'Actively Exploited Only' — 3 CVEs should remain",
                    "Expand a CVE — attack path arrows, systems, mitigation, tags all render",
                    "Critical CVE count badge shows correct number",
                  ]
                },
                {
                  page: "Frameworks (/frameworks)",
                  url: "http://localhost:3000/frameworks",
                  steps: [
                    "4 framework selector cards render",
                    "Click MITRE ATT&CK — 12 tactic grid shows",
                    "Click OWASP Top 10 — 10 items with color bars show",
                    "Click Kill Chain — 7-phase timeline with icons renders",
                    "Click NIST CSF — 5 function cards with NIST tier table",
                    "Comparison table at bottom shows 6 frameworks",
                  ]
                },
                {
                  page: "Cheatsheets (/cheatsheets)",
                  url: "http://localhost:3000/cheatsheets",
                  steps: [
                    "6 cheatsheet categories in sidebar",
                    "Click each — commands load in main panel",
                    "Search 'scan' in filter — filters commands in real time",
                    "Hover over a command row — copy icon appears",
                    "Click copy — icon changes to checkmark for 2 seconds",
                    "'Copy All' button copies all commands to clipboard",
                  ]
                },
                {
                  page: "Memory System (/memory)",
                  url: "http://localhost:3000/memory",
                  steps: [
                    "3 mode cards (Flashcards, Quiz, Mnemonics) render",
                    "Flashcard mode: click card to flip (3D rotation animation)",
                    "Click 'Got It' → progress bar advances → next card loads",
                    "Complete all cards → results screen shows",
                    "Quiz mode: select answer → color changes (green correct, red wrong)",
                    "Explanation appears after answering",
                    "Complete quiz → score results shown",
                    "Mnemonics tab → 8 mnemonic cards render",
                    "Quick Recall section at bottom shows 6 30-second recalls",
                  ]
                },
                {
                  page: "AI Assistant (/ai-assistant)",
                  url: "http://localhost:3000/ai-assistant",
                  steps: [
                    "Initial greeting message appears",
                    "8 suggested prompt chips render below input",
                    "Click a suggested prompt → message appears in chat",
                    "Assistant responds with formatted answer after 800ms",
                    "Type custom query → press Enter → sends message",
                    "Try: 'Explain SQL injection' → detailed response with code block",
                    "Try: 'OWASP' → full Top 10 table renders",
                    "Clear button resets chat",
                  ]
                },
              ].map(test => (
                <div key={test.page} className="border border-white/10 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/3 border-b border-white/5">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white text-sm">{test.page}</span>
                    <code className="text-xs text-slate-500 ml-auto">{test.url}</code>
                  </div>
                  <ul className="p-4 space-y-1.5">
                    {test.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-cyan-500 flex-shrink-0 font-mono text-xs mt-0.5">[ ]</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* ─── AUTOMATED TESTS ─── */}
      {activeTab === "automated" && (
        <div className="space-y-5">
          <Section title="Setting Up Jest + React Testing Library" icon="🤖">
            <div className="space-y-4">
              <Step num={1} title="Install testing dependencies">
                <CodeBlock code={`npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest`} />
              </Step>
              <Step num={2} title="Create jest.config.ts">
                <CodeBlock code={`// jest.config.ts
import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react' } }],
  },
}
export default config`} lang="typescript" />
              </Step>
              <Step num={3} title="Create jest.setup.ts">
                <CodeBlock code={`// jest.setup.ts
import '@testing-library/jest-dom'`} lang="typescript" />
              </Step>
              <Step num={4} title="Example — Test ThreatStatsBar renders">
                <CodeBlock code={`// src/components/dashboard/__tests__/ThreatStatsBar.test.tsx
import { render, screen } from '@testing-library/react'
import ThreatStatsBar from '../ThreatStatsBar'

describe('ThreatStatsBar', () => {
  it('renders 6 stat cards', () => {
    render(<ThreatStatsBar />)
    expect(screen.getByText('Critical CVEs (2024)')).toBeInTheDocument()
    expect(screen.getByText('847')).toBeInTheDocument()
  })

  it('shows positive change indicators', () => {
    render(<ThreatStatsBar />)
    const changes = screen.getAllByText(/\+/)
    expect(changes.length).toBeGreaterThan(0)
  })
})`} lang="typescript" />
              </Step>
              <Step num={5} title="Example — Test Quiz mode answers">
                <CodeBlock code={`// src/components/memory/__tests__/MemoryHub.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import MemoryHub from '../MemoryHub'

describe('Quiz Mode', () => {
  it('shows explanation after answer selected', async () => {
    render(<MemoryHub />)

    // Switch to quiz mode
    fireEvent.click(screen.getByText('Quiz Mode'))

    // Click first answer option
    const options = screen.getAllByRole('button')
    fireEvent.click(options[0])

    // Explanation should appear
    expect(screen.getByText(/Correct|Incorrect/)).toBeInTheDocument()
  })
})`} lang="typescript" />
              </Step>
              <Step num={6} title="Run all tests">
                <CodeBlock code={`npm test                     # run once
npm test -- --watch          # watch mode
npm test -- --coverage       # with coverage report`} />
              </Step>
            </div>
          </Section>

          <Section title="Setting Up Playwright E2E Tests" icon="🎭">
            <div className="space-y-4">
              <Step num={1} title="Install Playwright">
                <CodeBlock code={`npm install -D @playwright/test
npx playwright install chromium`} />
              </Step>
              <Step num={2} title="Create playwright.config.ts">
                <CodeBlock code={`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
})`} lang="typescript" />
              </Step>
              <Step num={3} title="Write E2E test — full dashboard flow">
                <CodeBlock code={`// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('Dashboard renders all major sections', async ({ page }) => {
  await page.goto('/')

  // Check title
  await expect(page).toHaveTitle(/CyberHub/)

  // Check critical sections
  await expect(page.locator('text=Attack Trends 2024')).toBeVisible()
  await expect(page.locator('text=Critical CVEs')).toBeVisible()
  await expect(page.locator('text=Learning Modules')).toBeVisible()
  await expect(page.locator('text=OWASP Top 10')).toBeVisible()
})

test('Navigation works across all pages', async ({ page }) => {
  await page.goto('/')

  const pages = [
    { link: 'Networking', url: '/networking', heading: 'Networking Fundamentals' },
    { link: 'Attack Center', url: '/attacks', heading: 'Attack Visualization Center' },
    { link: 'CVE Intelligence', url: '/cve', heading: 'CVE Intelligence' },
    { link: 'Cheatsheets', url: '/cheatsheets', heading: 'Cheatsheet Center' },
  ]

  for (const p of pages) {
    await page.goto(p.url)
    await expect(page.locator('h1')).toContainText(p.heading)
  }
})

test('AI Assistant sends and receives messages', async ({ page }) => {
  await page.goto('/ai-assistant')

  // Type a message
  await page.fill('textarea', 'Explain SQL injection')
  await page.keyboard.press('Enter')

  // Wait for response
  await expect(page.locator('text=SQL Injection')).toBeVisible({ timeout: 5000 })
})

test('Flashcard flip animation works', async ({ page }) => {
  await page.goto('/memory')

  // Click on flashcard
  const card = page.locator('[style*="perspective"]')
  await card.click()

  // Answer buttons should appear
  await expect(page.locator('text=Got It!')).toBeVisible()
})`} lang="typescript" />
              </Step>
              <Step num={4} title="Run Playwright tests">
                <CodeBlock code={`npx playwright test                    # run all
npx playwright test --headed           # see browser
npx playwright test dashboard.spec.ts  # single file
npx playwright show-report             # HTML report`} />
              </Step>
            </div>
          </Section>
        </div>
      )}

      {/* ─── SECURITY TESTING ─── */}
      {activeTab === "security" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-400">⚠️ All security testing below applies to your own application on your own system. Never test against systems you don't own.</p>
          </div>

          <Section title="Dependency Vulnerability Scan" icon="📦">
            <div className="space-y-3">
              <CodeBlock code={`# Built-in npm audit
npm audit

# Fix automatically (where safe)
npm audit fix

# Force fix (may include breaking changes)
npm audit fix --force

# Expected: A few low/moderate advisories are normal
# Focus on: Critical and High severity items`} />
              <CodeBlock code={`# Snyk — deeper analysis
npx snyk test
npx snyk monitor  # continuous monitoring`} />
            </div>
          </Section>

          <Section title="HTTP Security Headers Check" icon="🔒">
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Start the app then check security headers:</p>
              <CodeBlock code={`# Check headers with curl
curl -I http://localhost:3000

# Headers to verify are present:
# X-Frame-Options: DENY or SAMEORIGIN
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Content-Security-Policy: (see below)
# Strict-Transport-Security: (production HTTPS only)`} />
              <p className="text-sm text-slate-400">Add security headers in <code className="text-cyan-400">next.config.ts</code>:</p>
              <CodeBlock code={`// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "font-src 'self'",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

export default nextConfig`} lang="typescript" />
            </div>
          </Section>

          <Section title="XSS Testing" icon="🕷️">
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Test input fields in the AI Assistant and search bar for XSS vulnerabilities:</p>
              <CodeBlock code={`# XSS test payloads to try in search/AI input:
<script>alert('XSS')</script>
<img src=x onerror=alert(1)>
javascript:alert(1)
"><script>alert(document.cookie)</script>

# Expected result: Input should be displayed as plain text
# Next.js/React auto-escapes JSX output — these should NOT execute
# If you see an alert dialog: FIX IMMEDIATELY`} />
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400">✅ React's JSX auto-escaping means CyberHub is XSS-resistant by default. The AI assistant renders content via a custom function that only creates specific HTML elements — no dangerouslySetInnerHTML is used.</p>
              </div>
            </div>
          </Section>

          <Section title="OWASP ZAP Automated Scan" icon="🔬">
            <div className="space-y-3">
              <p className="text-sm text-slate-400">Run OWASP ZAP against your running dev server for automated vulnerability discovery:</p>
              <CodeBlock code={`# Using Docker (easiest method):
docker pull ghcr.io/zaproxy/zaproxy:stable

# Baseline scan (passive):
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py \\
  -t http://host.docker.internal:3000 \\
  -r zap-report.html

# Full active scan (more thorough):
docker run -t ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py \\
  -t http://host.docker.internal:3000 \\
  -r zap-full-report.html

# View report:
start zap-report.html  # Windows`} />
            </div>
          </Section>

          <Section title="Lighthouse Security Audit" icon="💡">
            <CodeBlock code={`# Run Lighthouse from Chrome DevTools:
# 1. Open http://localhost:3000 in Chrome
# 2. F12 → Lighthouse tab
# 3. Select: Performance, Accessibility, Best Practices, SEO
# 4. Click Analyze page load

# Or from CLI:
npx lighthouse http://localhost:3000 \\
  --only-categories=accessibility,best-practices,seo \\
  --output html --output-path ./lighthouse-report.html

# Target scores:
# Performance: > 90
# Accessibility: > 90
# Best Practices: > 90
# SEO: > 90`} />
          </Section>
        </div>
      )}

      {/* ─── PERFORMANCE ─── */}
      {activeTab === "performance" && (
        <div className="space-y-5">
          <Section title="Build Analysis" icon="📊">
            <div className="space-y-3">
              <CodeBlock code={`# Analyze bundle size
npm install -D @next/bundle-analyzer

# next.config.ts:
import bundleAnalyzer from '@next/bundle-analyzer'
const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
export default withBundleAnalyzer(nextConfig)

# Run:
$env:ANALYZE="true"; npm run build
# Opens browser with treemap visualization`} lang="powershell" />
            </div>
          </Section>

          <Section title="Core Web Vitals Targets" icon="⚡">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-xs text-slate-500">Metric</th>
                    <th className="text-left py-2 px-3 text-xs text-slate-500">Good</th>
                    <th className="text-left py-2 px-3 text-xs text-slate-500">Needs Improvement</th>
                    <th className="text-left py-2 px-3 text-xs text-slate-500">Poor</th>
                    <th className="text-left py-2 px-3 text-xs text-slate-500">How to Measure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { metric: "LCP (Largest Contentful Paint)", good: "< 2.5s", needs: "2.5–4s", poor: "> 4s", how: "Chrome DevTools → Performance" },
                    { metric: "FID (First Input Delay)", good: "< 100ms", needs: "100–300ms", poor: "> 300ms", how: "Lighthouse or CrUX" },
                    { metric: "CLS (Cumulative Layout Shift)", good: "< 0.1", needs: "0.1–0.25", poor: "> 0.25", how: "Lighthouse" },
                    { metric: "TTFB (Time to First Byte)", good: "< 800ms", needs: "800ms–1.8s", poor: "> 1.8s", how: "Chrome DevTools → Network" },
                    { metric: "Bundle Size (JS)", good: "< 200KB", needs: "200–500KB", poor: "> 500KB", how: "build output or bundle-analyzer" },
                  ].map(row => (
                    <tr key={row.metric} className="hover:bg-white/3">
                      <td className="py-2.5 px-3 text-white font-medium">{row.metric}</td>
                      <td className="py-2.5 px-3 text-green-400">{row.good}</td>
                      <td className="py-2.5 px-3 text-yellow-400">{row.needs}</td>
                      <td className="py-2.5 px-3 text-red-400">{row.poor}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-xs">{row.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Load Testing with k6" icon="🏋️">
            <CodeBlock code={`# Install k6:
# Windows: choco install k6
# Or download from https://k6.io/docs/getting-started/installation/

# Create load-test.js:
import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
  vus: 10,          // 10 virtual users
  duration: '30s',  // for 30 seconds
}

export default function () {
  const pages = ['/', '/attacks', '/cve', '/networking', '/frameworks']
  const page = pages[Math.floor(Math.random() * pages.length)]

  const res = http.get(\`http://localhost:3000\${page}\`)

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  })

  sleep(1)
}

# Run:
k6 run load-test.js`} lang="javascript" />
          </Section>
        </div>
      )}

      {/* ─── QA CHECKLIST ─── */}
      {activeTab === "checklist" && (
        <div className="space-y-5">
          <Section title="Complete QA Checklist" icon="✅">
            <div className="space-y-6">
              {[
                {
                  category: "Functionality",
                  color: "cyan",
                  items: [
                    "All 13 routes return 200 status",
                    "Dashboard: news ticker auto-rotates",
                    "Dashboard: attack trend chart renders",
                    "Dashboard: CVE cards expand/collapse",
                    "Networking: Topics tab shows 5 topics",
                    "Networking: Ports tab shows 19 ports with risk filter",
                    "Attacks: Search filters work in real-time",
                    "Attacks: Category filter works",
                    "CVE: CVSS gauge SVGs render correctly",
                    "CVE: Severity + exploited filters work",
                    "Frameworks: All 4 frameworks switch correctly",
                    "Cheatsheets: Command copy (clipboard) works",
                    "Cheatsheets: Search filters commands live",
                    "Memory: Flashcard 3D flip works",
                    "Memory: Quiz scoring is accurate",
                    "Memory: Progress bar advances correctly",
                    "AI: Suggested prompts trigger responses",
                    "AI: Enter key submits message",
                    "AI: Clear button resets conversation",
                    "Interview Prep: All categories load",
                    "Interview Prep: Quick Fire tracks score",
                    "Interview Prep: Answers reveal on click",
                  ]
                },
                {
                  category: "UI / Responsiveness",
                  color: "purple",
                  items: [
                    "Mobile (375px): sidebar hidden, hamburger menu shows",
                    "Mobile: hamburger opens/closes sidebar overlay",
                    "Tablet (768px): layout adapts correctly",
                    "Desktop (1440px): full sidebar visible",
                    "Dark theme consistent across all pages",
                    "Glassmorphism cards render with blur effect",
                    "Cyan accent color consistent in nav active states",
                    "Hover states work on all interactive elements",
                    "No horizontal scroll on mobile",
                    "Text is readable on all backgrounds",
                  ]
                },
                {
                  category: "Performance",
                  color: "green",
                  items: [
                    "Production build completes without errors",
                    "npm run build shows 0 TypeScript errors",
                    "First page load < 3 seconds (localhost dev)",
                    "Navigation between pages < 500ms",
                    "No console errors in browser DevTools",
                    "No hydration mismatch warnings",
                    "Images (if any) have alt attributes",
                  ]
                },
                {
                  category: "Security",
                  color: "red",
                  items: [
                    "XSS payloads in AI input render as text (not executed)",
                    "XSS payloads in search render as text",
                    "No API keys or secrets in source code",
                    "npm audit shows no critical vulnerabilities",
                    "No sensitive data logged to console",
                    "External links use rel='noopener noreferrer'",
                  ]
                },
                {
                  category: "Accessibility",
                  color: "yellow",
                  items: [
                    "Tab key navigates interactive elements logically",
                    "Buttons have descriptive text or aria-labels",
                    "Color is not the only indicator (badges have text too)",
                    "Lighthouse Accessibility score > 80",
                    "Images (if any) have alt text",
                    "Form inputs have associated labels",
                  ]
                },
              ].map(section => (
                <div key={section.category}>
                  <h3 className={`text-sm font-semibold mb-3 text-${section.color}-400`}>{section.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                    {section.items.map((item, i) => (
                      <label key={i} className="flex items-start gap-2 cursor-pointer group">
                        <input type="checkbox" className="mt-0.5 accent-cyan-400" />
                        <span className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Useful Commands Summary" icon="⌨️">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { label: "Start dev server", cmd: "npm run dev" },
                { label: "Production build", cmd: "npm run build" },
                { label: "Run production", cmd: "npm run start" },
                { label: "TypeScript check", cmd: "npx tsc --noEmit" },
                { label: "Lint code", cmd: "npm run lint" },
                { label: "Security audit", cmd: "npm audit" },
                { label: "Bundle analysis", cmd: "ANALYZE=true npm run build" },
                { label: "Playwright tests", cmd: "npx playwright test" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/8">
                  <span className="text-xs text-slate-500 w-32 flex-shrink-0">{item.label}</span>
                  <code className="text-xs text-cyan-400 font-mono">{item.cmd}</code>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}
