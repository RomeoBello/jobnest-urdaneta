# JobNest Patch: Active Nav, Contact Form, SEO, Manifest

## What this adds
- Active highlighting in the top navigation
- Contact form at `/contact` posting to `/api/contact` (Resend)
- Better SEO metadata in `app/layout.tsx`
- Web App Manifest at `public/manifest.json`

## One-time setup
1. Install dependency for the contact API (optional; only needed if you want server email sending):
   ```bash
   npm install resend
   ```
2. Add to `.env.local`:
   ```bash
   RESEND_API_KEY=YOUR_RESEND_API_KEY   # optional; if absent, form shows fallback
   CONTACT_TO_EMAIL=you@yourdomain.com  # optional; default support@example.com
   ```
3. Update the `siteUrl` inside `app/layout.tsx` after deployment.

## Usage
- Navbar highlights the current page.
- `/contact` sends via Resend if configured; otherwise shows fallback mailto.
