// "use client";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Page Title</title>
      </head>
      <body className={inter.className}>
        <Navbar />

        {children}
      </body>
    </html>
  );
}
