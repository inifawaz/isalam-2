/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            "placekitten.com",
            "api.isalamwakaf.com",
            "images.duitku.com",
            "127.0.0.1",
            "images.unsplash.com",
            "source.unsplash.com",
            "via.placeholder.com",
        ],
    },
};

module.exports = nextConfig;
