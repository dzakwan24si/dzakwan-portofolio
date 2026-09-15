import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import WorkGallery from "@/components/sections/WorkGallery";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Awards from "@/components/sections/Awards";
import Trainings from "@/components/sections/Trainings";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Custom Mouse Cursor */}
      <CustomCursor />
      
      {/* Header Navigation */}
      <Header />

      {/* Page Sections */}
      <Hero />
      <WorkGallery />
      <Skills />
      <About />
      <Awards />
      <Trainings />
      <Footer />
    </main>
  );
}
