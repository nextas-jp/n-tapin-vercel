import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // 開発中はPWAをオフにする
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ▼ 追加：Turbopackの競合エラーを回避する
  turbopack: {},
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fekeduatixasksmycobq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withPWA(nextConfig);