import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import Layout from "@/src/widgets/layout";
import Content from "@/src/widgets/Content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Products list",
  description: "Products list by Ozod",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <Layout>
            <Content>{children}</Content>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
