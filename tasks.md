# Tasks

## In Progress

## Up Next
- [ ] landing-page — Build the complete AERO waitlist site: pixel-faithful implementation of `design-mockup.png` (header, two-column hero with chat card + globe/phone/skyline art, three feature columns, email waitlist form, footer) plus the backend. Express server serves the page; `POST /api/waitlist` validates the email, rejects garbage with a friendly inline message, dedupes repeats ("You're already on the list!"), stores to SQLite, and the form shows a clear success state ("You're in!") without a page reload. `GET /api/waitlist.csv` exports all signups. Fully responsive: on phones the hero stacks (text above art), feature columns stack vertically, form stays usable; nothing overflows horizontally at 320px–1920px widths. Done = site matches the mockup on desktop, looks clean on a phone, and a submitted email verifiably lands in the database and the CSV export.

## Backlog
- [ ] deploy — Deploy the site to Railway with a public domain so real visitors can join the waitlist. Persist `waitlist.db` on a volume so signups survive redeploys. Done = public URL loads the site and a signup from the live site appears in the CSV export.
