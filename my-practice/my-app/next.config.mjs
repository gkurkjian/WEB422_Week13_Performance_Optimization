/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.senecapolytechnic.ca',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
