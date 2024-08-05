import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['us-east-1-shared-usea1-02.graphassets.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.resolve.alias['@/state'] = path.resolve(__dirname, 'state');
    return config;
  },
};

export default nextConfig;


