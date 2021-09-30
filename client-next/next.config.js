/** @type {import('next').NextConfig} */
module.exports = {
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
