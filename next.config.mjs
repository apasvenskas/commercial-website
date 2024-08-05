import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['us-east-1-shared-usea1-02.graphassets.com'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias['@'] = path.join(__dirname);
    config.resolve.alias['@/state'] = path.join(__dirname, 'state');
    return config;
  },
};

export default nextConfig;


