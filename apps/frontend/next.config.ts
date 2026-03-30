import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  webpack(config) {
    config.resolve ||= {};
    config.resolve.alias ||= {};
    config.resolve.alias['@/components/ui'] = path.resolve(__dirname, 'components/ui');
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'components');
    return config;
  },
};

export default nextConfig;
