# BabyBat Game Hub — v2 live-backend build

Mobile-first PWA for the Sovereign Circle / Nocturne Collective game.

## Live Supabase backend
This build points ONLY to the dedicated Supabase project `babybat-game-hub` (`mbxevizxcwmmldjtbksq`). It does not reference or share tables with `bsb-archives`.

The browser uses only the project publishable key. There is no service-role key or OpenAI secret in the client.

## Live features
- Supabase email/password authentication
- Per-game Player / Game Master / Admin roles enforced with Postgres RLS
- Immutable point ledger; totals are computed from transactions
- Seeded SD-001 (+19) and SD-002 (+22) = 41 lifetime points
- Automatic reward unlocks every 200 points
- Shared reward redemption: Shawn or authorized Moxie/Game Master can mark a reward used
- Redeemed rewards remain in history
- Full I–XXV rulebook structure, scoring/penalty table, reward ladder and rosters loaded from the backend
- Realtime refresh for points, rewards and directives
- Persistent Game Hub chat-message storage
- Future Infernal Firm entity reserved without mixing game state
- Offline-capable PWA shell

## First account setup
A newly created account intentionally has no game membership. This prevents random signups from granting themselves access. After email confirmation/sign-in, the app shows a one-time access-code screen. Shawn uses the separately delivered Sovereign Circle Player code; Moxie uses the separately delivered Nocturne Game Master code. The codes are role-bound, single-use, expire automatically, are validated server-side, and are not included anywhere in this project archive.

### Auth redirect note
The client asks Supabase to redirect email confirmations back to the app's current HTTPS origin. Before production signup, add the final deployed app URL as the project's Auth Site URL / allowed Redirect URL in Supabase. Do not add the fantasy-football project's URL or credentials here.

## AI Counsel
The chat database is live, but AI responses are intentionally not faked. Connect a server-side OpenAI endpoint later; never put an OpenAI API key in `config.js` or browser JavaScript.
