import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X / O",
  category: "game",
  applicationName: "X / O",
  authors: {
    name: "Ergi Dervishaj",
    url: "https://www.linkedin.com/in/ergi-dervishaj/",
  },
  viewport: {
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
    width: "device-width",
  },
  description: "Play Tic-Tac-Toe online with friends",
  keywords: ["Tic-Tac-Toe", "Multiplayer Game"],
  themeColor: "#000000",
  colorScheme: "dark",
  creator: "Ergi Dervishaj",
  openGraph: {
    type: "website",
    title: "X / O",
    siteName: "X / O",
    images: ["/apple_icon_57.png", "/apple_icon_180.png"],
    description: "Play Tic-Tac-Toe online with friends",
  },
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
    startupImage: [
      "/startup_750.png",
      {
        url: "/startup_640.png",
        media: "(device-width: 640px) and (device-height: 1136px)",
      },
      {
        url: "/startup_750.png",
        media: "(device-width: 750px) and (device-height: 1334px)",
      },
      {
        url: "/startup_1125.png",
        media: "(device-width: 1125px) and (device-height: 2436px)",
      },
      {
        url: "/startup_1242.png",
        media: "(device-width: 1242px) and (device-height: 2208px)",
      },
      {
        url: "/startup_1536.png",
        media: "(device-width: 1536px) and (device-height: 2048px)",
      },
      {
        url: "/startup_1668.png",
        media: "(device-width: 1668px) and (device-height: 2224px)",
      },
      {
        url: "/startup_2048.png",
        media: "(device-width: 2048px) and (device-height: 2732px)",
      },
    ],
    statusBarStyle: "black",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} bg-black h-full`}
        style={{
          padding:
            "env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
