/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://dummyimage.com/**')], // post dummy image
  },
};

export default nextConfig;
