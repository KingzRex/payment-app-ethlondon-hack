import localFont from "next/font/local";

export const satoshiFont = localFont({
  src: [
    {
      path: "./satoshi/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});