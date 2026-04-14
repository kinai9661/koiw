import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.hi168.com',
      },
      {
        protocol: 'https',
        hostname: 'api.frenix.sh',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
