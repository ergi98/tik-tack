import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    dir: "ltr",
    name: "X / O",
    short_name: "X / O",
    theme_color: "#000000",
    background_color: "#000000",
    categories: ["Game", "Board Game", "Multiplayer Game"],
    description: "Play Tic-Tac-Toe online with friends",
    display: "standalone",
    icons: [
      {
        sizes: "512x512",
        type: "image/svg+xml",
        src: "/manifest_512.svg",
      },
      {
        sizes: "192x192",
        type: "image/png",
        src: "/manifest_192.png",
      },
      {
        sizes: "512x512",
        type: "image/png",
        src: "/manifest_512.png",
      },
    ],
    lang: "en",
    orientation: "portrait-primary",
  };
}
