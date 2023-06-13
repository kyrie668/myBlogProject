/** @type {import('next').NextConfig} */
const withLess = require('next-with-less');
const path = require('path');

const nextConfig = {
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['mongoose'],
    },
    images: {
        remotePatterns: [{ hostname: 'res.cloudinary.com', protocol: 'http', port: '' }],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        };
        config.resolve.fallback = {
            fs: false,
            path: false,
        };
        return config;
    },
    resolve: {
        alias: {
            formidable$: path.resolve(__dirname, 'node_modules/formidable/src/index.js'),
        },
    },
};

module.exports = withLess(nextConfig);
