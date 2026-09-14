# BabyBat Game Hub v3.0.0

V3 turns BabyBat from a score tracker into the official game headquarters for the Sovereign Circle ↔ Nocturne Collective game.

## What is live in V3

### Organization availability
- Status is organization-level, never person-level.
- **Sovereign Circle — OPEN / CLOSED**
- **Nocturne Collective — OPEN / CLOSED**
- Each side can control its own status; Shawn's Site Admin mode can control both.
- Realtime across devices.

### BabyBat Mail
- New **Mail** tab for official game correspondence.
- Inbox + Sent views, unread state, threaded replies, categories (message, directive, submission, scoring, ruling, reward).
- Game-facing identities use the configured Sovereign / Nocturne addresses rather than personal email addresses.
- Mail is database-backed and realtime.
- Moxie can issue a Directive and send it to Sovereign Circle through Mail in one action.

### Photo evidence
- Active Directives can accept native photo submissions.
- Browser-side image compression before upload (admin configurable max edge + quality).
- Private Supabase Storage bucket; evidence is not public.
- Moxie can review / approve / reject evidence.
- Recipient can **Save Photo** using the device share/save flow.
- Saving can automatically mark the file for cleanup after an admin-configured grace period.
- The evidence record remains after the stored photo is purged.

### Shawn-only Owner Control Center
Only Shawn's Site Admin mode sees the owner controls. Moxie's Game Master UI does not.

Current no-code controls include:
- Game name
- Reward interval
- Scoring point values
- Mail on/off
- Sovereign / Nocturne game-mail display addresses
- Photo compression resolution
- Photo compression quality
- Auto-cleanup after recipient save
- Photo cleanup grace period
- SMS master switch (provider still required)
- Storage health / eligible cleanup
- Diagnostics / version / record counts

### ChatGPT bridge foundation
V3 includes authenticated database RPCs intended for a future ChatGPT app/MCP bridge:
- `babybat_snapshot()` — current game state, organization status, active Directives, score, unread/recent mail, submissions
- `babybat_send_mail(subject, body, category)` — official game mail from the authenticated organization
- `babybat_set_status(status)` — set the authenticated organization OPEN/CLOSED

The current ChatGPT Plus account cannot yet be assumed to support attaching a private full-write MCP app to an existing personal chat. V3 does **not** depend on that capability; the backend is prepared so the connector can be attached later without redesigning the game.

### Notification foundation
- New Mail and new evidence create notification-event records automatically.
- The SMS switch and queue are present, but a real SMS provider (for example Twilio) still needs credentials/provider setup before texts can be sent.

### Stability carried forward from v2.5
- Forgot Password + recovery flow
- Show/hide password
- Resend email confirmation
- Correct Shawn/Moxie role isolation
- Shawn-only Player/Admin switch
- Moxie-only purple Game Master view
- Flexible pasted-ledger scoring parser
- Permanent transaction ledger + automatic reward unlocking
- Network-first core files and PWA cache hardening
- Visible `BABYBAT v3.0.0` label

## Production Auth URL requirements
Supabase Authentication → URL Configuration:
- Site URL: `https://game-app.vercel.app/`
- Redirect URL: `https://game-app.vercel.app/**`

## Deployment
Upload the contents of this ZIP to the Vercel deployment root. All image assets are intentionally flat beside `index.html`; no assets folder is required.

## Security
- Browser uses only the Supabase publishable key.
- RLS protects all public game data.
- Photo storage bucket is private.
- No service-role key is present in the frontend.
- The separate BSB fantasy-football project is not used or modified by BabyBat.
