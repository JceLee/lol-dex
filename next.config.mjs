/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ddragon.leagueoflegends.com",
            },
            {
                protocol: "https",
                hostname: "wallpapers.com",
            },
        ],
    },
};

export default nextConfig;



