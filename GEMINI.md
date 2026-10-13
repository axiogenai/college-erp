# Global Development & Design Rules

## 1. System & Prompt Box Protection (CRITICAL)
- **Zero Daemon Processes:** NEVER run long-running background servers (`npm run dev`, `vite`, `npx`, watchers) using `run_command` or background tasks. Doing so locks the user's Antigravity prompt box into "Busy" mode, forces user messages into "Queued Messages", disables the chat input, and breaks message editing.
- **Synchronous Commands Only:** Every command executed by the agent must terminate immediately. Never leave lingering background tasks (`manage_task Action="list"` must always return 0 tasks running before completing a turn).
- **No Polling Loops / Scheduled Timers:** Never loop `schedule` timers or polling scripts. If a build or check is needed, run it directly with adequate `WaitMsBeforeAsync` and finish cleanly.
- **Fast Turn Completion:** Complete each turn cleanly and completely so the user's prompt box is always idle, unlocked, and immediately responsive.

## 2. Aesthetic Standards: Professional, Classic & Luxury
- **Visual Identity:** All web projects must strictly adhere to a high-end, professional, classic, and luxury aesthetic.
- **Strictly Prohibited:**
  - No "vibe-coded" aesthetics (no neon gradients, electric/candy colors, toy-like styles).
  - No rainbow gradient banners (`bg-gradient-to-r from-blue-500 ...`). Header strips must be clean obsidian/neutral strips (`bg-neutral-100 dark:bg-[#161619] border-b border-neutral-200 dark:border-white/[0.06]`).
  - Zero emojis in UI copy, buttons, badges, navigation, and headings.
  - No sparkles, star icons, or AI glitter symbols (e.g., ✨, ✦, ❇️, 🌟, or sparkle SVGs/badges) anywhere in code or design.
  - No hardcoded green labels, neon green pills (`emerald-500`, `green-500`), or saturated status badges. Use refined champagne gold (`#C5A059`) or neutral indicators for active states.
  - No bouncy, springy, or cartoonish animations.
- **Typography Scale in Cards & Modals:**
  - Names and titles in cards/modals must use `text-sm font-semibold tracking-tight` (never oversized `text-base font-bold` or `text-lg font-bold`).
  - Subtitles, departments, and roles must use `text-[11px] text-neutral-500 dark:text-[#A1A1AA]`.
  - Tags, chips, and metadata must use `text-[10px] font-mono`.
- **Color Palette:**
  - Backgrounds: Obsidian (`#0A0A0C`), deep onyx cards (`#121215`), elevated panels (`#161619`).
  - Borders: Hairline dividers (`border-neutral-200 dark:border-white/[0.08]`).
  - Accents: Brushed champagne gold (`#C5A059`), muted bronze, warm ivory text (`#EDEDEF`).
- **Optical Alignment:**
  - Icons and labels must be centered with `gap-1.5` or `gap-2`.
  - Avatars must have proportional size (`w-12 h-12` or `w-14 h-14` max) with clean hairline rings.
  - Metrics bars must use neat two-column or four-column tabular layouts with tabular numerals (`tabular-nums font-mono`).

## 3. Code Standards: Minimal & Purpose-Driven
- **Zero Bloat:** Write only strictly necessary code. No redundant boilerplate, excessive wrappers, or over-engineering.
- **Concise & Direct:** Clean, production-ready, performant implementations without clutter.
- **File-First Execution:** Edit project files directly on disk.
- **Token Efficiency:** Zero token waste. Do not perform speculative terminal searches (`findstr`, recursive scans).
- **Direct Execution:** Start working and modifying files immediately. Direct execution only.
- **Privacy & Storage:** Strictly do not capture or save screenshots, and do not record videos.
