import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Nav from "@/components/Nav";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "DtM Discord Community Brew",
  description:
    "For tracking of community brews in the Doin' the Most Discord Server.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="w-full p-4 flex justify-between">
            <Nav />
            <ModeToggle />
          </header>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
