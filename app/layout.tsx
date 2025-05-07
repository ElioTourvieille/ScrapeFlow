import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Workflows",
  description: "Create and manage workflows with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${urbanist.variable} antialiased font-sans`}>
          <AppProviders>{children}</AppProviders>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
