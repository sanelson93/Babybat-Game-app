# Nocturnal Games v3.3.0

## Reward fulfillment flow
v3.3 changes rewards from a one-tap redemption into a tracked request/fulfillment workflow.

1. A reward unlocks every **200 points** and appears in the player's **Reward Chest** as Available.
2. The player taps **Use** and confirms.
3. The reward immediately leaves the Reward Chest and moves to **Pending Rewards**.
4. Moxie sees the pending reward under that player's game card on her unified Home screen.
5. After Moxie fulfills the reward outside the app, she taps **Mark Issued** and confirms.
6. The reward moves to permanent **Reward History** as Issued.

Points are never spent by requesting or issuing a reward. Reward milestones remain cumulative and continue every 200 points.

The database records:
- `requested_at`
- `requested_by_user_id`
- `issued_at`
- `issued_by_user_id`

Legacy `used_at` / `used_by_user_id` remain synchronized when a reward is issued for backwards-compatible audit exports.

Reward state transitions are enforced server-side:
- Player/owning organization: `available -> pending`
- Game Manager/Site Admin: `pending -> issued`
- Pending rewards cannot be requested twice.
- Issued rewards remain in permanent history.

Reward requests and issuance create game-scoped notification events and use the existing Nocturnal Games push pipeline.

## Moxie / unified Game Manager experience
- Moxie continues to see both live games on one Home screen with no global game toggle.
- Sovereign progress remains green; Infernal progress remains red; the rest of Moxie's interface remains Nocturne purple/silver/black.
- Pending rewards are visible directly beneath the correct game's progress bar.
- **Mark Issued** appears only for pending rewards.
- Ledger remains the only scoring workspace, with its Sovereign / Infernal game selector.

## Player experience
- Reward Chest contains **Available rewards only**.
- After Use + confirmation, a reward moves to **Pending Rewards** and is labeled as waiting on Moxie.
- Issued rewards appear in **Reward History** on the Ledger page.
- Requesting a reward never deducts points.

## Existing v3.2.4 behavior preserved
- Moxie's combined Mail inbox/sent view and To-line recipient dropdown.
- Separate Sovereign and Infernal scoring ledgers, rules, evidence, histories, and reward progress.
- All organizations visible to all Nocturnal Games members.
- Add Staff available only for a user's own organization.
- Multi-game Push support.
- Read receipts.
- SMS remains removed.
- Existing Sovereign / Nocturne Counsel behavior remains unchanged; Infernal Counsel remains disabled.

## Deploy
Upload the **contents** of the ZIP to the existing Vercel project. This package is flat-root deployment ready.

This is a normal app update; a Home Screen reinstall should not be necessary unless iOS is showing stale PWA metadata/icon assets.
