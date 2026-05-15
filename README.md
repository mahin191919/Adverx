# AdverX Store

A modern dark-themed digital product marketplace built with Next.js 15, React, TypeScript, Tailwind CSS, ShadCN-style components, Framer Motion, Supabase, and LemonSqueezy.

## Features

- Premium black and purple glassmorphism UI
- Homepage with hero, featured products, categories, testimonials, FAQ, CTA, and footer
- Login, signup, forgot password, Google OAuth-ready auth screens
- Product marketplace with SEO-friendly dynamic product pages
- Search/filter UI for categories, price, and trending products
- User dashboard for purchases, downloads, account settings, wishlist, and order history
- Protected admin dashboard design with analytics cards, revenue graph, upload form, product/order/user/coupon management areas
- LemonSqueezy checkout API route and webhook verification
- Supabase Storage signed download route
- Sitemap, robots.txt, OpenGraph metadata, responsive layouts, and fast-loading static content
- Extra pages: blog, contact, terms, privacy

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

See `.env.example` for all required values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_EMAILS`
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_STORE_ID`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- Optional `STRIPE_SECRET_KEY`
- Optional `RESEND_API_KEY`


## Functional flow

1. Customers sign up or log in through the Supabase-backed API routes in `app/api/auth/[mode]/route.ts`.
2. Products can be uploaded from the protected admin form, which stores files in the private `product-files` Supabase Storage bucket and inserts metadata into `products`.
3. Checkout posts to `/api/checkout`; LemonSqueezy redirects back to `/payment/success`.
4. The LemonSqueezy webhook verifies the HMAC signature, creates a paid order, creates an active download row, and optionally sends a Resend confirmation email.
5. Download requests use a token, verify the download is active and unexpired, then return a short-lived Supabase signed URL.

## Supabase setup

1. Create a free Supabase project.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Create Storage buckets:
   - `product-files` as private
   - `product-images` as public or private depending on your preference
4. Enable email authentication and Google OAuth in Authentication providers.
5. Add your local and production URLs to Supabase Auth redirect URLs.

## LemonSqueezy setup

1. Create a free LemonSqueezy account and store.
2. Add API key and store ID to Vercel environment variables.
3. Configure webhook URL: `/api/webhooks/lemonsqueezy`.
4. Use the webhook handler to save paid orders, unlock product downloads, and send confirmation emails.

## Free deployment guide

### GitHub

```bash
git init
git add .
git commit -m "Initial AdverX Store marketplace"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/adverx-store.git
git push -u origin main
```

### Vercel

1. Import the GitHub repository in Vercel.
2. Select Next.js framework preset.
3. Add all variables from `.env.example`.
4. Deploy.
5. Add the Vercel URL to Supabase Auth redirect URLs and LemonSqueezy checkout redirect URL.

## Production notes

- Use Supabase Row Level Security and service-role server routes for privileged admin writes.
- Add a durable rate limiter such as Upstash Redis before high-traffic launch.
- Replace demo product data in `lib/data.ts` with Supabase queries.
- Add transactional email with Resend, Postmark, or Supabase Edge Functions.
- Consult a lawyer for final terms/privacy copy.
