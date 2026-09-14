# BabyBat Game Hub v2.4.1

Auth confirmation hotfix.

## Required Supabase Auth setting
Set **Authentication → URL Configuration** to:

- Site URL: `https://game-app.vercel.app/`
- Redirect URL: `https://game-app.vercel.app/**`

The app now always requests the production URL above for signup confirmation and surfaces Supabase callback errors instead of failing silently.

# BabyBat Game Hub — v2.4

Mobile-first PWA for the Sovereign Circle / Nocturne Collective game.

## v2.4 — Player-first Site Admin
- Shawn's normal/default experience is now **Player Mode** even though the account retains Site Admin permissions in Supabase.
- Added a compact **Player / Admin** mode switch at the very top of the app for the Site Admin account.
- Removed the global **View As Admin / Shawn / Moxie** strip.
- Player Mode is a real live player experience — it is no longer treated as a read-only admin preview.
- Removed the yellow **ADMIN PREVIEW / actions disabled** banner from Shawn's player experience.
- Player Mode uses the Sovereign Console and normal player actions, including live reward redemption when available.
- The fifth navigation item becomes **Profile** while Shawn is in Player Mode.
- Admin Mode opens the maintenance/control-room experience.
- Moxie's interface is still available as a read-only QA preview from Admin Mode.
- While previewing Moxie, tapping **Admin Home** in the top mode switch exits the preview.
- Switching back to Player Mode immediately returns to Shawn's live Home dashboard.
- A new UI-storage version makes Player Mode the default after deploying this build.
- No Supabase migration is required.

## Bulk Ledger workflow
Paste a normal scoring notice, for example:

```text
SD-003
Directive Completed +10
Above & Beyond +5
Moxie Melt +3
Reason: Submission accepted
```

Then:
1. Tap **Preview Ledger**.
2. Review rows, duplicates, warnings, and net points.
3. Tap **Import**.

The importer also accepts CSV, tab-separated spreadsheet rows, and pipe-delimited rows. Existing matching transactions are flagged as duplicates instead of being silently imported twice.

## Live backend
This build points only to the dedicated Supabase project `babybat-game-hub` (`mbxevizxcwmmldjtbksq`). It does not reference or share tables with `bsb-archives`.

## Existing v2.x features retained
- Site Admin with a player-first **Player / Admin** mode switch and read-only **Moxie Preview** for QA.
- Organizations dropdown with Sovereign Circle, Nocturne Collective, and reserved Infernal Firm.
- Database-backed rosters, logos, character art, roles, departments, positions, and display order.
- Immutable point ledger and duplicate-aware bulk scoring.
- Automatic reward unlocks at 200-point milestones.
- Shared reward redemption and permanent redemption history.
- Realtime score/reward/directive synchronization.
- Root-level image assets for simple Vercel file uploads.

## Deployment
Replace the deployed project contents with this v2.4 folder and redeploy. The service-worker cache key is bumped to `babybat-v24-player-first`, so installed PWA copies should refresh to the new interface after reopening.


## v2.3.1 ledger parser fix
- A single directive number found anywhere in a pasted scorecard is inherited by all scoring rows.
- Accepts SD-003, SD #003, Directive #003, Sovereign Directive #003, and #003 headings.
- Decorated headings such as `SOVEREIGN DIRECTIVE #003 — OFFICIAL SCORING NOTICE` are supported.
- Common scorecard emoji markers (✅, ✔, ✓, etc.) are stripped from category names.
