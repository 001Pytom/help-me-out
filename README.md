#  HelpMeOut

> A Chrome Extension + Web App to **record, manage, and share screen recordings** with transcript generation and social sharing.

##  Overview

HelpMeOut is a productivity tool designed for educators, teams, and creators. It enables users to record their screen (and optionally mic/camera), generate shareable links, view and rename past recordings, and access transcripts — all through a clean dashboard.

---

##  Monorepo Structure

This project is managed with **Turborepo** and organized into:

```
helpmeout/
🔝 apps/
🔝🔝 web/         # Next.js + Tailwind Web App
🔝🔝 extension/   # Chrome Extension (Vite + React)
🔝 packages/
🔝🔝 utils/       # Shared logic (upload, transcript, etc.)
🔝🔝 ui/          # Shared components (optional)
```

---

##  Features

###  Web App

*  Authentication (Google, Facebook, Email/Password)
*  Video dashboard (titles, thumbnails, timestamps)
*  Auto transcript (Whisper/AssemblyAI)
*  Video rename, search & filtering
*  Shareable video links (WhatsApp, Telegram, etc)
*  Responsive UI built with ShadCN UI + Tailwind

###  Chrome Extension

*  Record current tab or entire screen
*  Toggle camera and microphone
*  Floating in-recording controls (pause, stop, timer)
*  Auto upload & redirect to Web App dashboard

---

##  Tech Stack

* **Frontend:** Next.js, TypeScript, TailwindCSS, ShadCN UI
* **Extension:** Vite + React + MediaRecorder API
* **Auth:** NextAuth.js (Google, Facebook, Email)
* **Transcripts:** Whisper / AssemblyAI API
* **Storage:** Supabase / Firebase (to be decided)
* **Monorepo Tooling:** Turborepo + pnpm

---

##  Setup & Development

```bash
# Clone
git clone https://github.com/your-org/helpmeout.git
cd helpmeout

# Install dependencies
pnpm install

# Start web app
pnpm dev --filter web

# Start extension (Vite dev server)
pnpm dev --filter extension
```

---

## 📦 Scripts

| Command                       | Description             |
| ----------------------------- | ----------------------- |
| `pnpm dev`                    | Start dev servers       |
| `pnpm build`                  | Build all apps/packages |
| `pnpm lint`                   | Lint all apps/packages  |
| `pnpm dev --filter web`       | Run only Web app        |
| `pnpm dev --filter extension` | Run only Extension      |

---

##  Project Status

* [x] Project scaffolded with Turborepo
* [x] Next.js Web App setup with Tailwind + ShadCN
* [ ] Chrome Extension screen recording MVP
* [ ] Video upload & dashboard listing
* [ ] Transcript generation integration
* [ ] Social sharing + rename support

---

##  Contributing

> PRs are welcome! Before pushing:

```bash
pnpm lint && pnpm build
```

Follow [Conventional Commits](https://www.conventionalcommits.org/) and open clear PR descriptions.




