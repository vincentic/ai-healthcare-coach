/** @type {import('next').NextConfig} */
const apiBaseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig = {
  // Proxy /api requests to the backend.
  // In Vercel, set BACKEND_URL to the deployed FastAPI service URL.
  async rewrites() {
    if (!apiBaseUrl && process.env.NODE_ENV === 'production') {
      return [];
    }

    return [
      {
        source: '/api/:path*',
        destination: `${apiBaseUrl || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
  // Allow CORS for development
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
