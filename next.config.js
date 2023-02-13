/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config, {isServer}) => {
  //   if (isServer) {
  //     config.externals.push('_http_common');
  //     config.externals.push('artbox_db');
  //     config.externals.push('encoding');
  //     config.externals.push('@prisma/runtime');
  //   }
  //
  //   return config;
  // },
  i18n: {
    locales: ["uk"],
    defaultLocale: "uk",
  },
}

module.exports = nextConfig
