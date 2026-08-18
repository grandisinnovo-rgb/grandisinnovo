/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://grandisinnovo.com",
  generateRobotsTxt: false, // handled by src/app/robots.ts instead
  exclude: ["/api/*"],
};
