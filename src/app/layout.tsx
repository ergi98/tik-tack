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
  description: "Play Tic-Tac-Toe online with friends",
  keywords: ["Tic-Tac-Toe", "Multiplayer Game"],
  themeColor: "#000000",
  colorScheme: "dark",
  creator: "Ergi Dervishaj",
  // icons: [
  //   { rel: "icon", url: Favicon16.src },
  //   {
  //     rel: "icon",
  //     sizes: "16x16",
  //     type: "image/png",
  //     url: Favicon16.src,
  //   },
  //   {
  //     rel: "icon",
  //     sizes: "32x32",
  //     type: "image/png",
  //     url: Favicon32.src,
  //   },
  //   {
  //     sizes: "57x57",
  //     url: Apple57.src,
  //     rel: "apple-touch-icon",
  //   },
  //   {
  //     sizes: "180x180",
  //     url: Apple180.src,
  //     rel: "apple-touch-icon",
  //   },
  // ],
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
