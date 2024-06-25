import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/views/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Voyage",
  description: "Bookworm's favorite place to be",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", url: "/favicon-32x32.ico", sizes: "32x32" },
      { rel: "icon", url: "/favicon-64x64.ico", sizes: "64x64" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-white bg-bv-blue`}>
        <Providers>
          <Navbar />
          <section>{children}</section>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
