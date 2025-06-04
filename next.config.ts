import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

const withTM = require('next-transpile-modules')(['google-auth-library'])

module.exports = withTM({})
