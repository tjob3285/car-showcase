/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.imagin.studio']
    },
    experimental: {
        scrollRestoration: true
    }
};

export default nextConfig;
