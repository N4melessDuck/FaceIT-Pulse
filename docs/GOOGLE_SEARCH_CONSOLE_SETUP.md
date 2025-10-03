# Google Search Console Setup

After deploying your site, follow these steps to add it to Google Search Console:

## Steps:

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console/

2. **Add Property**
   - Click "Add Property"
   - Select "URL prefix"
   - Enter: `https://n4melessduck.github.io/FaceIT-Pulse/`

3. **Verify Ownership**
   - Method 1: HTML file upload
     - Download the verification file from Google
     - Place it in `faceit-overlay/public/` folder
     - Rebuild and deploy
   
   - Method 2: HTML tag (already added in index.html)
     - Add meta tag to index.html: `<meta name="google-site-verification" content="YOUR_CODE" />`

4. **Submit Sitemap**
   - Once verified, go to "Sitemaps" section
   - Submit: `https://n4melessduck.github.io/FaceIT-Pulse/sitemap.xml`

5. **Monitor**
   - Wait 24-48 hours for Google to crawl your site
   - Check "Coverage" and "Performance" reports

## Additional Tips:
- Enable URL inspection tool to see how Google sees your pages
- Check mobile usability
- Monitor Core Web Vitals for performance

Your sitemap is already created and will be accessible at:
`https://n4melessduck.github.io/FaceIT-Pulse/sitemap.xml`
