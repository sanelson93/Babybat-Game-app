# BabyBat Game Hub — v2.3

Mobile-first PWA for the Sovereign Circle / Nocturne Collective game.

## v2.3 — Simplified Moxie / Game Master workflow
- Removed the manual point-award form and scoring-category dropdown completely.
- The only live point-entry workflow is **Paste Ledger → Preview → Import**.
- Moxie's fifth navigation tab is now **Score** instead of **Admin**.
- Moxie's Home dashboard has one clear scoring action: **Score a Directive / Paste Ledger**.
- Added a compact three-step scoring guide on the Score screen.
- Restyled Moxie's scoring workflow with Nocturne purple accents so it reads as her workspace, not the Site Admin console.
- Kept **Review Ledger** as a secondary action instead of competing with scoring entry.
- Simplified account controls and labels.
- Site Admin still retains Admin / Shawn / Moxie preview switching and can use the same paste-ledger importer for live scoring.
- No database migration is required for v2.3; it uses the existing protected ledger tables and permissions.

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
- Site Admin with read-only **View as Shawn / View as Moxie** QA modes.
- Organizations dropdown with Sovereign Circle, Nocturne Collective, and reserved Infernal Firm.
- Database-backed rosters, logos, character art, roles, departments, positions, and display order.
- Immutable point ledger and duplicate-aware bulk scoring.
- Automatic reward unlocks at 200-point milestones.
- Shared reward redemption and permanent redemption history.
- Realtime score/reward/directive synchronization.
- Root-level image assets for simple Vercel file uploads.

## Deployment
Replace the deployed project contents with this v2.3 folder and redeploy. The service-worker cache key is bumped to `babybat-v23-simplified-gm`, so installed PWA copies should refresh to the new interface after reopening.
