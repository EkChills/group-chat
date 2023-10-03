import PusherWrapper from "@/components/PusherWrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import SessProvider from "@/components/providers/SessProvider";
import ClientProvider from "@/components/react-query/ClientProvider";
import { cn } from "@/lib/utils";
import { RoomProvider } from "@/components/providers/Context";
import { Toaster } from "@/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { OurFileRouter, ourFileRouter } from "@/app/api/uploadthing/core";
import { extractRouterConfig } from "uploadthing/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Damned Chat",
  description: "Communicate instantly with secure messaging features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-[#252329]")}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />

        <SessProvider>
          <ClientProvider>
            <RoomProvider>{children}</RoomProvider>
          </ClientProvider>
        </SessProvider>
        <div id="sing-lay"></div>
        <Toaster />
      </body>
    </html>
  );
}
