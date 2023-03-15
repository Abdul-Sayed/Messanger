/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "cdn.freebiesupply.com",
      "imgs.search.brave.com",
      "fbcdn.net",
      "fbsbx.com",
      "static.xx.fbcdn.net",
      "scontent-lax3-2.xx.fbcdn.net",
      "platform-lookaside.fbsbx.com",
    ],
  },
};
