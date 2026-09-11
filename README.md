# BabyBat Game Hub — v2.1

Mobile-first PWA for the Sovereign Circle / Nocturne Collective game.

## v2.1 changes
- Removed the non-AI chat/Counsel feature completely from the UI and database.
- Added Site Admin mode with three render modes: Admin, View as Shawn, View as Moxie.
- Admin preview modes are read-only so layout QA cannot accidentally change live points/rewards.
- Added a dedicated Organizations tab with an organization dropdown.
- Added database-backed organization rosters with name, role, department, position, image, and sort order.
- Added Sovereign Circle and Nocturne Collective logos and supplied character artwork as optimized WebP assets.
- Added expanded Nocturne roster and reserved Infernal Firm for future growth.
- Kept the immutable point ledger, automatic reward unlocks, shared reward redemption, and Realtime sync.

## Live backend
This build points ONLY to the dedicated Supabase project `babybat-game-hub` (`mbxevizxcwmmldjtbksq`). It does not reference or share tables with `bsb-archives`.

The v2.1 database migration is already applied. Do not rerun schema SQL in another project.

## Site Admin upgrade
An existing Shawn/Player login can be promoted with a one-time Site Admin access code. The code is delivered separately and is intentionally not stored in this project archive.

After promotion, a View As control appears at the top of the app:
- **Admin** — full live management access.
- **Shawn** — read-only rendering of the Player experience.
- **Moxie** — read-only rendering of the Game Master experience.

## Deployment
Replace the existing deployed project contents with this v2.1 folder and redeploy. Keep the same `config.js`; it is already pinned to the BabyBat Supabase project using the browser-safe publishable key.

If the PWA looks stale after deployment, fully close/reopen it or remove/re-add it to the Home Screen. v2.1 uses a new service-worker cache name (`babybat-v21`) to force an update.

## Assets
Character images live under `assets/`. The database stores their relative paths so organization metadata remains centralized while artwork ships with the app.

`Silk` is represented in the Sovereign roster but no Silk artwork was present in the supplied image set, so the app intentionally shows a styled placeholder until that image is added.
