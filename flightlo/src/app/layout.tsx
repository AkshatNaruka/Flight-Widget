import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlightTracker Pro - Real-Time Flight Search",
  description: "Self-reliant real-time flight tracking with no external API dependencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
