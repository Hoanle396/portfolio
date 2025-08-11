# Hoan Le – Portfolio

Modern animated developer portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Lightning-fast Next.js 14 w/ App Router
- Dark / Light theme toggle with persistence
- Responsive, accessible design
- Animated hero, section transitions, parallax spotlight cards
- SEO via next-seo
- Projects, Experience, Skills, Open Source, Contact
- Auto-fetched GitHub pinned repos + NPM packages (lightweight client fetch via `/api` routes)
- AI Chatbot assistant about the portfolio (OpenAI powered, graceful fallback without key)

## Getting Started

Install dependencies and run dev server:

```bash
pnpm install # or npm install / yarn
pnpm dev
```

Open http://localhost:3000

## AI Chat Assistant

A floating "AI" button (bottom-right) opens a chat that can answer questions about projects, experience, skills, education, and contact information.

### Enable OpenAI or Gemini

Create `.env.local` in the root with one (or both) keys:

```bash
# Google Gemini
GEMINI_API_KEY=your_gemini_key

# (Optional) OpenAI fallback / alternative
OPENAI_API_KEY=sk-your_openai_key
```

Priority: Explicit provider requested by client -> Gemini (if key) -> OpenAI (if key) -> static fallback.

Restart dev server after adding keys. Without any key, the assistant returns a static fallback summary.

### Implementation

- Server route: `app/api/chat/route.ts` builds a prompt from `data/` exports and calls Gemini or OpenAI.
- Client widget: `app/(components)/chat-widget.tsx` (no extra deps beyond framer-motion already present).
- Limits: Keeps only last 10 user/assistant turns to manage token size.

### Customize

- Adjust prompt in `buildContextSummary()`.
- Change model or temperature in the fetch body. For Gemini you can set `model` (e.g., `gemini-1.5-flash`, `gemini-1.5-pro`).
- Style via Tailwind classes in the widget.

### Future Ideas

- Streaming responses (SSE / edge runtime)
- Embeddings + vector search for larger content
- Source citations with deep links
- Rate limiting / auth guard

## Customize Content

Edit JSON in `data/` folder or modify components in `components/sections/`.

## Deploy

Deploy seamlessly to Vercel.

---

MIT License
