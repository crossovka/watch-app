import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		domains: ['localhost'],
	},
	reactStrictMode: true,
	swcMinify: true,

	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:3000/api/:path*', // Прокси на NestJS
			},
		];
	},
};

export default nextConfig;
