import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const workflowSteps = [
  {
    title: 'Fork & Clone',
    description: 'Fork the repository on GitHub, then clone your fork locally using SSH or HTTPS.',
    bullets: [
      'Fork the repo from GitHub',
      'Clone it locally and install dependencies with `npm install`',
      'Create a descriptive feature branch before you start editing',
    ],
  },
  {
    title: 'Copy the Template',
    description: 'Each game lives in its own folder. Start by duplicating the provided single-file template.',
    bullets: [
      'Run `cp -r templates/game public/games/your-game-slug`',
      'Keep the slug lowercase with dashes only',
      'Replace placeholder text in index.html, info.json, and prompt.md',
    ],
  },
  {
    title: 'Build with AI',
    description: 'Generate your game with a single prompt and keep the output transparent.',
    bullets: [
      'Document the exact prompt and AI model in prompt.md',
      'Keep the HTML self-contained—no build steps or bundlers',
      'Ensure metadata describes the game accurately',
    ],
  },
  {
    title: 'Quality Check',
    description: 'Validate security, metadata, and UX before you open a pull request.',
    bullets: [
      'Run the validation commands listed below',
      'Test the game locally inside the sandboxed iframe',
      'Check accessibility: focus states, contrast, keyboard play when relevant',
    ],
  },
  {
    title: 'Open a PR',
    description: 'Push your branch and open a pull request against the main repo.',
    bullets: [
      'Describe the game, AI model, and checks you ran',
      'Attach screenshots or gifs if helpful',
      'Be ready to respond to reviewer feedback quickly',
    ],
  },
];

const qaCommands = [
  {
    label: 'Security & Schema',
    description: 'Validates HTML presence, info.json shape, prompt completeness, and security guardrails.',
    command: 'npm run validate:games',
  },
  {
    label: 'Manifest Regeneration',
    description: 'Rebuilds `public/games-manifest.json` to ensure your game shows up locally.',
    command: 'npm run generate:manifest',
  },
  {
    label: 'Lint + Format + Build',
    description: 'Runner that lints, checks formatting, and ensures the site builds.',
    command: 'npm run check',
  },
];

const qaChecklist = [
  'Game loads inside the in-app iframe without console errors or blocked network calls',
  'Only whitelisted CDNs are referenced; no POST/WebSocket/EventSource usage',
  'Controls, scoring, and restart/game-over states all work',
  'info.json passes JSON validation and includes accurate metadata and tags',
  'prompt.md documents the full prompt, AI model, and any light edits you performed',
  'index.html stays under a single file with embedded CSS/JS and no analytics scripts',
];

const resourceLinks = [
  {
    title: 'Contribution Guidelines',
    description: 'Detailed rules, schema references, and review expectations.',
    href: 'https://github.com/luongnv89/one-prompt-one-single-file-game/blob/main/CONTRIBUTING.md',
  },
  {
    title: 'Product Requirements',
    description: 'Security posture, branding, and gameplay requirements.',
    href: 'https://github.com/luongnv89/one-prompt-one-single-file-game/blob/main/devdocs/prd.md',
  },
  {
    title: 'Game Template',
    description: 'Starter files for index.html, info.json, and prompt.md.',
    href: 'https://github.com/luongnv89/one-prompt-one-single-file-game/tree/main/templates/game',
  },
];

export default function Contribute() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12">
        <section className="mb-10 rounded-3xl border border-gray-200 bg-white px-6 py-10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Contributor Guide</p>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                Ship your AI game with confidence.
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                This guide walks you from fork to finished pull request with the exact checks we expect
                every contributor to run. Keep games single-file, transparent, and safe for everyone.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">AI-only</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Security-first</span>
                <span className="rounded-full bg-primary-lighter px-4 py-2 text-primary-dark">Single-file</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://github.com/luongnv89/one-prompt-one-single-file-game/fork"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  Fork the repo
                </a>
                <Link
                  to="/"
                  className="rounded-full border border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 transition-colors hover:border-primary hover:text-primary"
                >
                  Preview the arcade
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-primary-lighter/60 p-6 text-gray-900">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-dark">Submission snapshot</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-6 rounded-2xl bg-white p-4 shadow-sm">
                  <dt className="font-semibold text-gray-600">Required files</dt>
                  <dd className="text-right">
                    <p>index.html</p>
                    <p>info.json</p>
                    <p>prompt.md</p>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6 rounded-2xl bg-white p-4 shadow-sm">
                  <dt className="font-semibold text-gray-600">Security baseline</dt>
                  <dd className="text-right">
                    <p>No POST requests</p>
                    <p>No sockets or trackers</p>
                    <p>Whitelisted CDNs only</p>
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-6 rounded-2xl bg-white p-4 shadow-sm">
                  <dt className="font-semibold text-gray-600">Automation</dt>
                  <dd className="text-right">
                    <p>Manifest generation</p>
                    <p>Security validation</p>
                    <p>CI lint/build</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Game delivery flow</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">From fork to pull request</h2>
            </div>
            <p className="text-sm text-gray-600">
              Mirror these steps to keep reviews quick and predictable.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{step.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 rounded-3xl border border-gray-200 bg-white px-6 py-8 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Quality checklist</p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">Run these checks before every PR</h2>
              <ul className="mt-6 space-y-4 text-sm text-gray-700">
                {qaChecklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Command lineup</h3>
              <p className="mt-2 text-sm text-gray-600">
                Paste these exactly—CI runs the same tooling, so catching issues locally keeps reviews smooth.
              </p>
              <div className="mt-6 space-y-5">
                {qaCommands.map((cmd) => (
                  <div key={cmd.label} className="rounded-xl bg-white p-4 shadow-sm">
                    <p className="text-sm font-semibold text-gray-900">{cmd.label}</p>
                    <p className="mt-1 text-sm text-gray-600">{cmd.description}</p>
                    <pre className="mt-3 rounded-lg bg-gray-900 px-3 py-2 text-xs font-mono text-white">{cmd.command}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          {resourceLinks.map((resource) => (
            <article key={resource.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
              <p className="mt-2 text-sm text-gray-700">{resource.description}</p>
              <a
                href={resource.href}
                className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Open resource →
              </a>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-gray-200 bg-primary-lighter/70 px-6 py-8 text-gray-900 shadow-sm">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Ready to build?</h2>
              <p className="mt-3 text-sm text-gray-700">
                Once your game passes the checklist, push your branch and open a pull request. Mention which AI model
                generated the game and confirm that all validation commands succeeded.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/luongnv89/one-prompt-one-single-file-game/compare"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
              >
                Open a PR
              </a>
              <a
                href="https://github.com/luongnv89/one-prompt-one-single-file-game/issues/new/choose"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-900 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:text-primary hover:border-primary"
              >
                Ask a question
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
