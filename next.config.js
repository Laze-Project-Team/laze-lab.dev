const { i18n } = require('./next-i18next.config');

const localeSubpaths = {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // next-i18next
  i18n,
  publicRuntimeConfig: {
    localeSubpaths,
  },
};

module.exports = nextConfig;
