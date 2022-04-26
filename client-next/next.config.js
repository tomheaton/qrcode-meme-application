/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    async redirects() {
        return (
            [
                {
                    source: "/tomheaton",
                    destination: "api/qrcode/tomheaton",
                    permanent: true
                }
            ]
        );
    }
}

module.exports = nextConfig;
