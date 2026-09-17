# Nocturnal Games v3.2.0

## Rebrand
- App brand is now **Nocturnal Games**.
- New full Nocturnal Games logo is used throughout the app.
- The Home Screen/PWA icon uses the full Nocturnal Games logo.
- Browser title, manifest metadata, login/recovery screens, app header, version label, Mail wording, push copy, and public policy pages use the new brand.
- Sovereign Circle and Nocturne Collective keep their existing side-specific identity and styling inside the shared Nocturnal Games shell.


## Per-account Counsel preference
- Normal **Player** and **Game Manager** accounts can turn **In-App Counsel** on or off from their account area.
- Turning it off removes the Counsel tab and Ask Counsel shortcuts for that account.
- Existing private Counsel history is preserved and returns if the account turns Counsel back on.
- The preference affects only that account; it does not disable the other player's Counsel.
- Site Admin retains access in Admin mode for configuration and QA.
- This is separate from the site-wide Counsel master switch.

## Notifications
- Push notifications remain enabled and operational.
- SMS/Twilio UI, public SMS page, Vercel SMS route, and Site Admin SMS controls have been removed.
- Existing backend database columns are left intact for migration safety, but SMS is not exposed by this build.

## Preserved from v3.1.8
- iPhone keyboard-safe Counsel composer.
- Private Sovereign / Nocturne Counsel.
- OpenAI usage meter.
- Mail, evidence, scoring, rewards, organizations, rules, auth, and admin features.
- Push subscription controls and test push.

## Deploy
Upload the contents of this ZIP to the existing Vercel project. The package is flat-root deployment ready.

Because iOS caches installed PWA metadata and icons, remove the old Home Screen app and add it again after deploying if the old name/icon remains.
