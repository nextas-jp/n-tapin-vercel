/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fekeduatixasksmycobq.supabase.co', // エラーに出たSupabaseのホスト名
        port: '',
        pathname: '/storage/v1/object/public/**', // public以下の全ての画像を許可
      },
    ],
  },
};

export default nextConfig;
