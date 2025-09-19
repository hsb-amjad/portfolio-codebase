import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haseeb Amjad",
  description: "Personal portfolio showcasing ML, Robotics, IoT, and MedTech projects.",
};

// ✅ Load Nunito with proper options
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"], // adjust weights as you like
  variable: "--font-nunito",
  display: "swap", // prevents fallback issues
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>{children}</body>
    </html>
  );
}
