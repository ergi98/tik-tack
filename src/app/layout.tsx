import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X / O",
  applicationName: "X / O",
  authors: {
    name: "Ergi Dervishaj",
    url: "https://www.linkedin.com/in/ergi-dervishaj/",
  },
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  description: "Play Tic-Tac-Toe online with friends",
  keywords: ["Tic-Tac-Toe", "Multiplayer Game"],
  themeColor: "#000000",
  colorScheme: "dark",
  creator: "Ergi Dervishaj",
  icons: [
    {
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
      url: "/favicon_16.ico",
    },
    {
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
      url: "/favicon_32.ico",
    },
    {
      sizes: "57x57",
      rel: "apple-touch-icon",
      url: "/apple_icon_57.png",
    },
    {
      sizes: "180x180",
      rel: "apple-touch-icon",
      url: "/apple_icon_180.png",
    },
  ],
  appleWebApp: {
    capable: true,
    title: "X / O",
    startupImage: "",
    statusBarStyle: "black",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>{children}</body>
    </html>
  );
}
