import React from 'react';
import Footer from '../components/Footer';

const missionPillars = [
  {
    title: 'Security-first sandboxing',
    description:
      'Every game runs inside a locked-down iframe with CSP-aligned sandbox flags, guarding the parent DOM and local storage.',
  },
  {
    title: 'AI-only provenance',
    description:
      'Each submission documents the exact AI model, prompt, and any edits so visitors can trace how a game was generated.',
  },
  {
    title: 'Single-file transparency',
    description:
      'Games stay portable and auditable by shipping as one HTML file with inline CSS/JS—nothing hidden, nothing minified away.',
  },
];

const buildValues = [
  {
    title: 'Manifest-driven catalog',
    copy: 'A generated manifest keeps metadata consistent and fuels search, filters, and detail pages.',
  },
  {
    title: 'Automated validation',
    copy: 'Security scripts reject POST requests, WebSockets, trackers, or unapproved CDNs before code reaches production.',
  },
  {
    title: 'Accessible UI',
    copy: 'WCAG-aware components, focus states, and keyboard flows ensure everyone can browse and play.',
  },
];

const milestones = [
  {
    label: 'Concept',
    title: 'Prompt-to-play concept',
    detail: 'Define the one-prompt/one-file constraint, security posture, and curation goals.',
  },
  {
    label: 'MVP',
    title: 'Gallery + Sandbox',
    detail: 'Launch the React/Vite gallery, safe iframe, manifest tooling, and contributor docs.',
  },
  {
    label: 'Community',
    title: 'Contributor playbooks',
    detail: 'Ship templates, Contribute page, and CI hooks so anyone can safely publish games.',
  },
  {
    label: 'Next',
    title: 'Events & packs',
    detail: 'Host AI jams, themed collections, and educator-friendly bundles of curated titles.',
  },
];

const safeguards = [
  'Strict iframe sandbox with no same-origin or scripting privileges.',
  'Security validator blocks POST/PUT, WebSockets, EventSource, and sendBeacon usage.',
  'Only approved CDNs (jsdelivr, unpkg, cdnjs, fonts.googleapis.com/gstatic) are allowed.',
  'Games cannot read cookies or local storage outside their own sandbox.',
  'Anonymous, cookie-less analytics limited to aggregate search/filter events.',
];

const impactStats = [
  { label: 'Single-file games curated', value: '∞ (always growing)', accent: true },
  { label: 'Community contributors', value: 'Open & inclusive', accent: false },
  { label: 'Security regressions', value: '0 tolerated', accent: false },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-10 rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">About AI One-File Arcade</p>
          <div className="mt-5 grid gap-10 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Curating safe, AI-built micro games.
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                AI One-File Arcade proves that AI-generated games can be transparent, reviewable, and fun—without sacrificing
                player safety. We ask every creator to ship a single HTML file, document their prompt, and respect a strict
                sandbox so anyone can peek inside, learn, and remix.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Open-source</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Security-led</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">AI-native</span>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-primary-lighter/60 p-6 text-gray-900">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-dark">Why it matters</h2>
              <p className="mt-4 text-sm text-gray-700">
                Generative models can now output fully functional games. Without opinionated guardrails, those files could
                quietly siphon data, run hidden trackers, or disrupt the browsing session. AI One-File Arcade sets a shared
                bar so builders, educators, and jam organizers can safely showcase model-made creations.
              </p>
              <dl className="mt-6 space-y-3 text-sm">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <dt className="font-semibold text-gray-600">{stat.label}</dt>
                    <dd className={`text-right text-base font-semibold ${stat.accent ? 'text-primary-dark' : 'text-gray-900'}`}>
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Mission pillars</p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">Three promises behind every game</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {missionPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{pillar.title}</h3>
                <p className="mt-3 text-sm text-gray-700">{pillar.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Build principles</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">How the platform stays trustworthy</h2>
              <div className="mt-6 space-y-5">
                {buildValues.map((value) => (
                  <article key={value.title} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                    <p className="mt-2 text-sm text-gray-700">{value.copy}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Non-negotiables</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">Safety checklist</h2>
              <ul className="mt-6 space-y-4 text-sm text-gray-700">
                {safeguards.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Roadmap</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">From concept to community hub</h2>
            <p className="mt-2 text-sm text-gray-600">
              AI One-File Arcade grows alongside the ecosystem—more games, more contributors, and more transparency tools.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone) => (
              <article key={milestone.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">{milestone.label}</p>
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{milestone.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{milestone.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-primary-lighter/70 px-6 py-8 text-gray-900 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Want to help shape the arcade?</h2>
              <p className="mt-3 text-sm text-gray-700">
                Whether you design AI prompts, audit security, or mentor students, your perspective sharpens this platform.
                Share ideas, open issues, or join community discussions.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/luongnv89/one-prompt-one-single-file-game/discussions"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Join discussions
              </a>
              <a
                href="https://github.com/luongnv89/one-prompt-one-single-file-game/issues/new/choose"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:text-primary hover:border-primary"
              >
                Suggest an idea
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

