import { Space_Grotesk, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import FloatingTopButton from "@/components/ui/FloatingTopButton";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "M. Dzakwan Syafiq | Portfolio",
  description: "Modern Interactive Personal Portfolio of M. Dzakwan Syafiq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${spaceGrotesk.variable} ${poppins.variable} font-sans bg-navy text-beige min-h-screen selection:bg-beige selection:text-navy`}>
        <LanguageProvider>
          {children}
          <FloatingTopButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
