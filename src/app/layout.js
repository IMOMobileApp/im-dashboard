/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/no-css-tags */
"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { Provider } from "react-redux";
import store from "./store";
import Home from "@/app/page";
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Igniting Minds Dashboard</title>
        <link rel="icon" href="/favicon.png" sizes="192x192" />
        <link rel="stylesheet" href="/bootstrap.css" />
        <link rel="stylesheet" href="/custom.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
        ></link>
      </head>
      <body>
        <Provider store={store}>
          <Home>{children}</Home>
        </Provider>
      </body>
    </html>
  );
}
