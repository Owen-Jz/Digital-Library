import { Raleway } from "next/font/google";
import "./globals.css";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import Head from "next/head"; // Import Head

// Initialize Raleway with CSS variable
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Digital Library",
  description: "Digital Library Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${raleway.variable} antialiased`}>{children}</body>
    </html>
  );
}

