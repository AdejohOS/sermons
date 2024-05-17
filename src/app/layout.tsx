import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";

import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import QueryProvider from "@/providers/query-provider";
import Player from "@/components/player";

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sermons | Download your favourite sermon",
  description: "Get all your favourite sermons and more",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <html lang="en" suppressHydrationWarning={true}>
          <body className={font.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="koinonia-app-1"
            >
              <ToastProvider />
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Player />
            </ThemeProvider>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
