/** @type {import('next').NextConfig} */

// @ts-check
import withPlaiceholder from "@plaiceholder/next"

const nextConfig = {
	transpilePackages: ["@plaiceholder/next"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "znspipcfyxecwbbksfgu.supabase.co",
				pathname: "/storage/v1/object/public/cabin-images/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/a/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

export default withPlaiceholder(nextConfig)
