import type {Metadata, ResolvingMetadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import {headers} from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/settings/seo`,
      {
        next: {revalidate: 60}, // Cache for 1 minute
      }
    );
    const {data: seo} = await res.json();

    return {
      title: seo?.metaTitle || "BestDeal - E-commerce",
      description:
        seo?.metaDescription || "Best deals on electronics, fashion, and more",
      keywords: seo?.metaKeywords || "ecommerce, electronics, deals",
    };
  } catch (error) {
    return {
      title: "BestDeal - E-commerce",
      description: "Best deals on electronics, fashion, and more",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload Lottie animation to prevent multiple fetches */}
        <link
          rel="preload"
          href="/lottie/ai-bot.lottie"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
