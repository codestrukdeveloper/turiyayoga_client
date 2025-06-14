import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "sweetalert2/src/sweetalert2.scss";
import "./styles/comman.scss";
import "./styles/animate.scss";
import "./styles/modal.scss";
import BootstrapInit from "@/app/components/BootstrapInit";
import { Roboto, Lobster, Pacifico } from "next/font/google";
import Footer from "./components/Footer";
import ClientLayoutWrapper from "./clientLayoutWrapper";
import FloatingButtons from "./components/FloatingButtons";
import AosInit from "./aosInit";
import Navbar from "./components/Navbar";
import { AuthProvider } from './context/auth-context';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-roboto'
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lobster'
});

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico'
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zertifizierte Yogalehrer Ausbildung bei Turiya Yoga | Starte Deine Karriere im Yoga",
  description: "Entdecke die zertifizierte Yogalehrer Ausbildung bei Turiya Yoga – international anerkannt und umfassend. Ich werde ein professioneller Yogalehrer mit fundierten Kenntnissen und Praxis. Melde dich jetzt an und starte deine Reise zu einem erfüllten Yoga-Leben!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="google-site-verification" content="sWFqu_4dTfI8tINOWYP-LCsMSd7hp1EYt3bdG3Hb2uQ" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "YogaStudio",
              "name": "Turiya Yoga",
              "url": "https://turiyayoga.de/",
              "logo": "https://www.turiyayoga.de/logo.png",
              "sameAs": [
                "https://www.facebook.com/turiyayoga",
                "https://www.instagram.com/turiyayoga",
                "https://www.linkedin.com/company/turiyayoga"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+49 30 123456789",
                "contactType": "Customer Service",
                "areaServed": "DE",
                "availableLanguage": ["German", "English"]
              }
            }),
          }}
        />
      </Head>
      <body className={`${roboto.variable} ${lobster.variable} ${pacifico.variable}`}>
        <AuthProvider>
        <ClientLayoutWrapper>
          <Navbar />
          <AosInit />
          <BootstrapInit />
          {children}
          <FloatingButtons />
          <Footer />
        </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
