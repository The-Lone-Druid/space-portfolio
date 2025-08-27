# Google Search Console Setup Guide

## Step 1: Add Your Property

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Click "Add Property"
3. Choose "URL prefix" method
4. Enter: `https://zahidshaikh.space`

## Step 2: Verify Ownership (HTML Tag Method)

1. Select "HTML tag" verification method
2. Copy the meta tag content (it looks like this):
   ```html
   <meta name="google-site-verification" content="abc123xyz..." />
   ```
3. Copy only the content value (the part after content=)
4. Replace 'google-site-verification-code' in your layout.tsx

## Step 3: Submit Your Sitemap

1. After verification, go to "Sitemaps" in the left menu
2. Add new sitemap: `https://zahidshaikh.space/sitemap.xml`
3. Click "Submit"

## Step 4: Monitor Performance

- Check "Performance" tab for search queries
- Monitor "Coverage" for indexing issues
- Review "Core Web Vitals" for performance metrics

## Expected Timeline:

- Verification: Immediate
- First data: 2-3 days
- Full data: 1-2 weeks
