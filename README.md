# Nocturnal Games v3.2.3

## Multi-game foundation
- Nocturnal Games now hosts two isolated live games:
  - **Sovereign Circle Game** — Moxie / Nocturne Collective ↔ Shawn / Sovereign Circle.
  - **Infernal Firm Game** — Moxie / Nocturne Collective ↔ Vex / The Infernal Firm.
- Scores, Requests/Directives, rewards, rules, Mail, evidence, settings, rosters, and push events stay scoped to their own game.
- The existing Sovereign game data and Counsel history are not merged into the Infernal game.

## Moxie / Game Manager
- Moxie gets a compact **GAME** selector for switching between Sovereign and Infernal without cluttering her normal interface.
- The selected game controls the dashboard, score, ledger, submissions, roster, rules, and scoring console.
- New Mail includes a **To** dropdown so Moxie can address either Shawn / Sovereign Circle or Vex / The Infernal Firm.
- Cross-game Mail switches the working context to the destination game after sending, keeping Sent Mail and read receipts easy to follow.
- Sovereign continues to use **Directives / SD-###**. Infernal uses **Requests / REQ-###**.

## Vex / The Infernal Firm
- Full red-and-black Infernal Firm theme and uploaded organization/staff artwork are included.
- Infernal roster includes Vex, Seraphine Morningstar, Piprix, Lucifer Morningstar, Vesper Morningstar, Malachar Morningstar, Mime, Grimm, and Mara Morningstar.
- Master-ledger baseline is seeded without inventing missing history:
  - established pre-#14 baseline: 372 points
  - Request #14: +28
  - Request #15: +30 with its established category breakdown
  - Request #16: +4 Partial Compliance
  - official total: **434**
  - Reward II banked at 400; Reward III target 600 with 166 remaining
- Unknown Request #1–#13 details and undisclosed Reward II contents remain unresolved rather than fabricated.
- A one-time Infernal player access code can attach Vex's future account to the Infernal game; no email/account identity was guessed.

## Site Admin / QA
- Admin has a game selector and read-only **Preview As Shawn / Moxie / Vex** controls.
- Previewing Vex automatically opens the Infernal game and its red/black player experience.
- Previewing Shawn automatically opens the Sovereign game.
- Previewing Moxie uses whichever game is currently selected.
- Preview mode does not impersonate or write as the previewed user.
- Owner Control Center settings edit only the selected game.
- Infernal Counsel is intentionally disabled until a dedicated Infernal Counsel personality/privacy model is defined; Sovereign + Nocturne Counsel remain unchanged in the Sovereign game.

## Push / Mail integrity
- One installed Nocturnal Games PWA can now register the same push subscription across multiple game memberships.
- Existing push-enabled accounts were carried into the new Infernal game.
- Live Mail refresh and read receipts from v3.2.1/v3.2.2 are preserved.
- SMS remains removed.

## Preserved
- Nocturnal Games silver/black/purple platform branding.
- Sovereign green styling and Nocturne purple styling.
- Optional per-account in-app Counsel setting.
- AI usage meter.
- Private photo evidence, scoring, reward chest, organizations, auth, realtime Mail, read receipts, and iPhone keyboard-safe Counsel composer.

## Deploy
Upload the **contents** of the ZIP to the existing Vercel project. The package is flat-root deployment ready.

This is a normal app update. A Home Screen reinstall should not be necessary unless iOS is showing stale PWA metadata/icon assets.
