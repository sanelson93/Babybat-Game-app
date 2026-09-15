# BabyBat Game Hub v3.1.3

## Brand / profile refresh
- Uses the new official BabyBat silver / black / purple crest as the shared game logo.
- Login, signup, password recovery, access-code, and loading screens now use the BabyBat visual identity.
- PWA manifest now has BabyBat 192px / 512px app icons.
- Existing screen layouts and navigation are preserved; this release changes the visual styling rather than replacing the UX.
- Moxie / Nocturne views keep the same controls but use richer purple + silver styling.
- Shawn / Sovereign views keep the same controls but use green + silver Sovereign accents layered on the shared BabyBat shell.
- Site Admin stays Sovereign-themed instead of drifting into unrelated gold styling.
- Silk's new image is included as `sc-silk.webp`; the live BabyBat roster now points Silk to this asset.
- Includes all v3.1.1 features, including private Counsel and Moxie's tap-to-build scoring ledger.

## v3.1.1 scoring UX
- Moxie Score now uses a directive-number + checkbox/button ledger builder.
- Live total math and duplicate protection are automatic.
- Post Ledger writes the selected scoring rules directly to the permanent point ledger and marks the directive scored.
- Shawn Site Admin retains the advanced bulk paste importer for maintenance/backfill.


V3.1 adds the first real OpenAI-powered Counsel layer directly inside BabyBat while preserving the V3 game hub, Mail, evidence, status, scoring, rewards, and Site Admin controls.

## New in v3.1

### Sovereign Counsel
- Private to the authenticated Sovereign Circle BabyBat account.
- Persistent conversation history stored separately from Nocturne.
- Uses the OpenAI Responses API with a persistent OpenAI Conversation.
- Default model: `gpt-5.6-sol` with medium reasoning.
- Seeded with the Sovereign Circle operating model, member specialties, Scales/Sigma/Sphinx responsibilities, Shawn-final-authority rule, and no-emoji drafting preference.
- Every response receives a fresh BabyBat snapshot: organization OPEN/CLOSED status, live score, rewards, directives, scoring rules, rulebook, relevant Mail, evidence records, and rosters.

### Nocturne Counsel
- Private to the authenticated Nocturne Collective BabyBat account.
- Separate thread, messages, OpenAI Conversation ID, and permissions from Sovereign Counsel.
- Uses live Nocturne roster / Game Master state and current BabyBat game data.
- Moxie remains the human final authority.

### Human approval stays mandatory
Counsel can analyze and draft, but it does not silently mutate game state.
- Any assistant answer can be moved into a BabyBat Mail compose screen for human review.
- Nocturne can move a Counsel response into a Directive approval screen and edit it before **Issue + Send**.
- Evidence review cards and photo viewer now include **Ask Counsel**. The selected private evidence photo is sent to OpenAI only when the user explicitly invokes that action.
- Status, scoring, rewards, directives, and Mail still use BabyBat's existing explicit controls.

### Counsel Site Admin controls
Shawn's Site Admin Control Center can change without redeploying:
- Counsel ON/OFF
- Model: GPT-5.6 Sol / Terra / Luna
- Reasoning effort
- Sovereign instruction supplement
- Nocturne instruction supplement
- Counsel connection test / diagnostic status

The OpenAI API key is intentionally **not** stored in the browser or `app_settings`.

## Required one-time OpenAI setup
The v3.1 database tables and `babybat-counsel` Edge Function are already deployed in the dedicated BabyBat Supabase project.

To activate AI responses, add this Supabase Edge Function secret in the BabyBat project:

`OPENAI_API_KEY=<your OpenAI Platform API key>`

The API key must come from the OpenAI API Platform and API usage is billed separately from ChatGPT Plus. Do not put the key in `config.js`, Site Admin, localStorage, or source control.

After adding the secret:
1. Open BabyBat as Shawn.
2. Player/Admin → Admin.
3. Owner Control Center → **Private Counsel Engine**.
4. Tap **Test Counsel Connection**.
5. It should show `READY`.

No Vercel redeploy is required after adding the Supabase secret.

## V3 features retained
- Organization-level **Sovereign Circle OPEN/CLOSED** and **Nocturne Collective OPEN/CLOSED**.
- BabyBat Mail with Inbox/Sent/unread/threaded replies/categories.
- Directive issue + Mail delivery.
- Private photo evidence, browser compression, review, save, configurable post-save cleanup.
- Shawn-only Owner Control Center.
- Bulk scoring ledger parser/importer.
- Permanent score ledger and rewards.
- Password recovery, confirmation resend, role isolation, Shawn Player/Admin switch, Moxie purple-only view.
- SMS event queue remains ready for Twilio/provider setup.

## Production Auth URL requirements
Supabase Authentication → URL Configuration:
- Site URL: `https://game-app.vercel.app/`
- Redirect URL: `https://game-app.vercel.app/**`

## Deployment
Upload the contents of this ZIP to the Vercel deployment root. All image assets remain intentionally flat beside `index.html`.

## Security
- Frontend contains only the Supabase publishable key.
- OpenAI secret remains server-side in Supabase Edge Function secrets.
- The `babybat-counsel` function requires a valid Supabase JWT.
- Counsel rows use RLS and are scoped to the authenticated user.
- No Site Admin preview can read Moxie's private Nocturne Counsel.
- Evidence images remain in the private `game-evidence` bucket.
- The separate BSB fantasy-football project is not used or modified by BabyBat.

## Known external setup still pending
- `OPENAI_API_KEY` must be added to activate Counsel responses.
- Twilio/SMS provider credentials still need to be configured before SMS sends.
- Supabase Auth still reports the project-level warning that Leaked Password Protection is disabled; this is a Dashboard Auth setting.

## v3.1.3 Counsel reliability fix
- Counsel user messages are persisted before the OpenAI response is requested, so they never disappear on provider errors.
- Failed AI calls are visibly marked in the thread with a human-readable reason.
- Site Admin **Test Counsel Connection** runs a tiny live model request instead of only checking whether a secret exists.
- Frontend reloads persisted Counsel history after an error.
