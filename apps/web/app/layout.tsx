import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HelpMeOut",
  description: "Helping hands sharing useful insights",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


