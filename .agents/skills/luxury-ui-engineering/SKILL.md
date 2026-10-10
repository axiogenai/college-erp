---
name: luxury-ui-engineering
description: Authoritative modern enterprise UI/UX design and frontend engineering skill. Use when building, restyling, or refining web interfaces, components, dashboards, and layouts to ensure ultra-modern, classic, and luxury aesthetics with precision animations, luxury color palettes, editorial typography, and high-end component architecture.
---

# Master Luxury UI/UX Design & Engineering Specification

This document defines the complete design system and implementation standards for modern, classic, and luxury digital products.

---

## 1. Color System & Elevation Architecture

### Dark Mode (Primary Executive Canvas)
* **Tier 0 (Canvas Background):** `#09090B` / `#0A0A0C`
* **Tier 1 (Cards & Sidebars):** `#121215`
* **Tier 2 (Elevated Panels & Dropdowns):** `#161619`
* **Tier 3 (Modals & Tooltips):** `#1A1A1E`
* **Hairline Dividers & Borders:** `rgba(255, 255, 255, 0.08)` (1px solid)
* **Hairline Subtle:** `rgba(255, 255, 255, 0.04)`

### Accent & Metallic Hierarchy
* **Champagne Gold (Primary Action):** `#C5A059`
* **Champagne Gold Hover:** `#B38F48`
* **Champagne Gold Muted Background:** `rgba(197, 160, 89, 0.12)`
* **Platinum White:** `#EDEDEF`
* **Muted Slate Neutral:** `#A1A1AA`
* **Faint Captions:** `#71717A`

### Subdued Status Tones (No Saturated Colors)
* **Compliant / Active:** Dark Sage background (`#11241B`), text `#86EFAC`, border `#22C55E`/30, dot `#C5A059`.
* **Warning / Review:** Dark Amber background (`#291F0E`), text `#FDE68A`, border `#F59E0B`/30.
* **Shortage / Urgent:** Deep Wine background (`#2E1217`), text `#FCA5A5`, border `#EF4444`/30.
* **Prohibited:** No hardcoded green pills, neon cyan, saturated purple, or rainbow gradients.

---

## 2. Typography Architecture

### Typefaces
* **Display & Hero Headings:** *Cinzel*, *Cormorant Garamond*, or *Source Serif 4*
* **Interface & Body:** *Plus Jakarta Sans*, *Inter*, or Apple System Font (`-apple-system`)
* **Codes, Values & Metrics:** `font-mono tabular-nums`

### Scale, Tracking & Line Heights
* **Display Titles:** `text-2xl` to `text-3xl`, `tracking-tight`, `font-semibold`
* **Section Headers:** `text-sm` to `text-base`, `font-serif`, `tracking-wide`, `text-[#EDEDEF]`
* **Field & Meta Labels:** `text-[10px]` to `text-[11px]`, `font-mono`, `uppercase`, `tracking-[0.18em]`, `text-[#71717A]`
* **Data Values:** `tabular-nums`, `font-mono`, `text-xs` to `text-sm`, `font-semibold`

---

## 3. Motion & Animation Standards

### Easing & Timing
* **Standard Luxury Ease:** `cubic-bezier(0.16, 1, 0.3, 1)` (Ultra-smooth Apple-grade deceleration)
* **Micro-interactions (Hovers, Toggles):** `150ms` duration
* **Panel & Modal Reveals:** `200ms` duration with gentle opacity fade (`animate-in fade-in zoom-in-98`)
* **Page Transitions:** `250ms` smooth fade (`opacity: 0 -> 1`)

### Prohibited Motion
* **Zero Bouncy / Spring Animations:** No cartoonish spring curves, oscillations, or playful physics.
* **Zero Flashing or Pulsing Indicators:** No flashing lights or distracting live pulses.

---

## 4. Component Standards

### A. Action Buttons
* **Primary (Executive Gold):**
  `bg-[#C5A059] hover:bg-[#B38F48] text-[#0A0A0C] font-semibold text-xs px-4 py-2 rounded-lg border border-[#C5A059]/40 shadow-sm transition-all duration-150`
* **Secondary / Outline:**
  `bg-transparent hover:bg-white/[0.04] text-[#EDEDEF] text-xs px-3.5 py-2 rounded-lg border border-white/[0.1] transition-all duration-150`

### B. Segmented Status Switches (P / A / L)
* Integrated control with 1px border `border-white/[0.08]` and `#161619` track.
* Active segment uses muted background with hairline border and high-contrast text.

### C. Data Tables
* Sticky header with tracked monospace column titles.
* Row hover uses subtle highlight: `hover:bg-white/[0.02] transition-colors`.
* Right-aligned metrics and center-aligned status indicators.

### D. Form Inputs & Select Dropdowns
* Background `#141417`, hairline border `border-white/[0.08]`.
* Focus ring: 1px champagne gold focus `focus:border-[#C5A059] focus:outline-none`.

---

## 5. Layout & Spatial Rhythms

* **8-Point Grid System:** Strict rhythm using 4px, 8px, 12px, 16px, 24px, 32px (`gap-2`, `gap-4`, `gap-6`, `p-5`, `p-6`).
* **Optical Alignment:** Align SVG icons optically with uppercase typography baselines.
* **Prohibited Artifacts:** Zero emojis, zero sparkle/star icons (✨, ✦, 🌟), and zero toy badges.
