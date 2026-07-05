import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { generateMetadata as generateSEOMetadata, STRUCTURED_DATA, generateJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "WISEDELL ACADEMY | Excellence in Education in Zimbabwe",
  description: "WISEDELL ACADEMY is a premier private day secondary school in Masvingo, Zimbabwe. Offering O-Level and A-Level education with academic excellence, dedicated teachers, and a nurturing environment. Apply online today for admissions.",
  keywords: [
    "WISEDELL ACADEMY",
    "private school",
    "Masvingo",
    "Zimbabwe",
    "secondary school",
    "O Level",
    "A Level",
    "education",
    "academic excellence",
    "admissions",
    "apply online",
    "boarding school",
    "day school",
    "high school",
    "college",
  ],
  canonical: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="googlea7d8e7ff5e3dcda2.html" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(STRUCTURED_DATA.organization)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(STRUCTURED_DATA.website)}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={generateJsonLd(STRUCTURED_DATA.school)}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen" role="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
