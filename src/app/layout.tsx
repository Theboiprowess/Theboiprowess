import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

export const metadata: Metadata = {
  title: "WISEDELL ACADEMY - Private Day Secondary School in Masvingo, Zimbabwe",
  description: "WISEDELL ACADEMY is a premier private day secondary school in Masvingo, Zimbabwe. Empowering future leaders through academic excellence. With God We Work Hard and Shine.",
  keywords: "WISEDELL ACADEMY, private school, Masvingo, Zimbabwe, secondary school, O Level, A Level, education",
  authors: [{ name: "WISEDELL ACADEMY" }],
  metadataBase: new URL('https://wisedellcollege.run.place'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "WISEDELL ACADEMY - Private Day Secondary School",
    description: "Empowering Future Leaders Through Academic Excellence",
    type: "website",
    locale: "en_ZW",
    url: 'https://wisedellcollege.run.place',
    siteName: "WISEDELL ACADEMY",
  },
  twitter: {
    card: "summary_large_image",
    title: "WISEDELL ACADEMY",
    description: "Empowering Future Leaders Through Academic Excellence",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
