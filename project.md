# Project: AERO Waitlist

## Overview
A single-page waitlist landing site for AERO, a flight-finding app ("Tell us when you're free. We'll find the best trip."). Visitors read about the product and join the waitlist by entering their email. Signups are stored server-side so the owner has a mailing list they can export.

## Design
The page must match `design-mockup.png` (repo root). Image assets live in `public/assets/`:
- `globe.png` — translucent glass globe behind the phone
- `phoneapp2.png` — tilted iPhone showing the AERO app (Seattle → Tokyo trip results)
- `seattle.png` — light hand-sketched Seattle skyline, right side of hero
- `plane.png` — white airplane (subtle decorative use)

Page structure (top to bottom):
1. Header: "AERO" wordmark centered, small compass illustration top right
2. Hero, two columns on desktop: left — headline "Find your perfect flight.", subhead "Tell us when you're free. We'll find the best trip.", a chat-style card ("I'm free anytime in June" / "Around 5–7 days" / "From anywhere |" with a circular ↑ button), caption "✦ Aero searches thousands of combinations automatically." Right — globe with phone overlapping it, skyline sketch at right edge.
3. Three feature columns: **Tell us** (✓ When you're free, ✓ How long you want to travel), **We find** (✓ Cheapest option, ✓ Best value option, ✓ Smartest itinerary), **You go** (✓ Book with confidence, ✓ Spend less. Experience more.)
4. Waitlist form: email input + black pill "Join Waitlist" button
5. Footer: "Early Access | aeroapp.io"

Light gray (#f0f0f2-ish) soft background throughout, dark gray/near-black text, minimal aesthetic. Must be fully responsive — hero stacks on mobile.

## Tech Stack
- Node.js + Express — serves the static frontend and a small JSON API; simplest possible full-stack setup
- SQLite (better-sqlite3) — stores waitlist emails in a single file, zero config
- Plain HTML/CSS/JS frontend — a one-page site doesn't need a framework

## Architecture
- `server.js` — Express app: serves `public/`, `POST /api/waitlist` validates + inserts email (deduped), `GET /api/waitlist.csv` exports the list
- `public/` — `index.html`, `styles.css`, `app.js`, `assets/`
- `waitlist.db` — SQLite file created on first run (gitignored)

## Key Files
(filled in as we build)

## How to Run
(filled in as we build)
