# Nocturnal Games v3.2.4

## Moxie / unified Game Manager experience
- Moxie no longer has a game selector on the main interface.
- Her Home screen shows **both live games at the same time**:
  - Sovereign Circle progress in green.
  - Infernal Firm progress in red.
- The surrounding Game Manager interface remains Nocturne purple/silver/black.
- Each game card shows its current points, next 200-point milestone, and reward status directly underneath.
- Infernal now correctly shows Reward I (200) and Reward II (400) unlocked at the established 434-point total.
- The only place Moxie adds points is **Ledger**.
- Ledger has a simple Sovereign / Infernal button pair so she can choose which game she is scoring without introducing a global game toggle.
- Moxie's Profile page no longer contains a duplicate scoring console.

## Mail
- Moxie's Mail is one combined inbox/sent view across both games.
- The **To** line is the game-recipient selector: Shawn / Sovereign Circle or Vex / The Infernal Firm.
- Sending to one recipient does not switch the rest of Moxie's interface into that game.
- Live refresh and read receipts remain enabled across both game mail streams.

## Organizations / staff
- Everyone with Nocturnal Games access can view all active organization rosters: Nocturne Collective, Sovereign Circle, and The Infernal Firm.
- Players and Game Managers get an **Add Staff** button only on their own organization.
- Add Staff supports name, title, role, department, and an optional JPEG/PNG/WebP photo.
- Staff photos are stored in the dedicated public `org-roster` Supabase Storage bucket with user-folder upload restrictions.
- Nocturne additions are written to both games so Moxie's roster remains one consistent organization across the platform.

## Reward progression
- Reward milestones remain every **200 points**.
- The Infernal Firm now has the full 4-step repeating reward tier structure seeded at 200/400/600/800.
- Existing automatic reward unlocking remains active for future point transactions.

## Multi-game integrity
- Sovereign and Infernal scores, Directives/Requests, rules, evidence, reward histories, and ledgers remain separate underneath the unified Moxie experience.
- Sovereign keeps **Directives / SD-###**.
- Infernal keeps **Requests / REQ-###**.
- Vex's established Infernal baseline remains 434 points without reconstructing unsupported Request #1–#13 details.

## Site Admin / QA
- Site Admin keeps the explicit game-context selector for maintenance only.
- Preview As Shawn / Moxie / Vex remains read-only.
- Moxie preview now reflects the unified two-game Home experience.
- Vex and Shawn player Profile pages stay clean and do not expose scoring controls.

## Push / Counsel
- Push remains multi-game capable for one installed PWA.
- SMS remains removed.
- Existing Sovereign / Nocturne Counsel behavior is preserved; Infernal Counsel remains disabled until separately defined.

## Deploy
Upload the **contents** of the ZIP to the existing Vercel project. This package is flat-root deployment ready.

This is a normal app update; a Home Screen reinstall should not be necessary unless iOS is showing stale PWA metadata/icon assets.
