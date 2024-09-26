/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ignitingminds.org',
        port: '',
        pathname: '/**',
      },
    ],

  },
  env: {
    LOGO_BLACK: process.env.NEXT_PUBLIC_LOGO_BLACK,
    LOGO_WHITE: process.env.NEXT_PUBLIC_LOGO_WHITE,
    LOADER:process.env.NEXT_PUBLIC_LOADER,
    API_ROUTE : process.env.NEXT_PUBLIC_API_ROUTE,
    USER_ID: process.env.NEXT_PUBLIC_USERID,
  },
 
}



