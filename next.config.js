const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

module.exports = nextConfig;
