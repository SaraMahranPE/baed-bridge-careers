import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>
      <Footer />
      <GoogleAnalytics gaId="G-JRPZ1VZT0P" />
    </div>
  );
}
