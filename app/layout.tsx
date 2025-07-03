import type { Metadata } from "next";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "EdusBest",
  description: "Created by Lasisi Quadri",
  generator: "Me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <DataProvider>
          {children}
          <Toaster />
        </DataProvider>
      </body>
    </html>
  );
}
