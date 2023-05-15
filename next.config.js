/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
        {
            source: "/",
            destination: "/sign-in",
            permanent: false,
        },
    ];
},
}

module.exports = nextConfig
