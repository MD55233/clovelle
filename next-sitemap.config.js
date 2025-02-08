/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: "http://localhost:3000/", // Change this to your domain
    generateRobotsTxt: true, // Generates robots.txt file
    sitemapSize: 5000, // Optional: Split sitemap if too large
    changefreq: "daily", // Optional: Set change frequency
    priority: 0.7, // Optional: Set priority for pages
  };
  