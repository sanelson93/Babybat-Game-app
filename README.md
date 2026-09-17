# Nocturnal Games v3.1.9

## Rebrand
- App brand is now **Nocturnal Games**.
- New full Nocturnal Games logo is used throughout the app.
- The Home Screen/PWA icon uses the full Nocturnal Games logo.
- Browser title, manifest metadata, login/recovery screens, app header, version label, Mail wording, push copy, and public policy pages use the new brand.
- Sovereign Circle and Nocturne Collective keep their existing side-specific identity and styling inside the shared Nocturnal Games shell.

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
