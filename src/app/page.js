import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import WorkGallery from "@/components/sections/WorkGallery";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Awards from "@/components/sections/Awards";
import Trainings from "@/components/sections/Trainings";
import Footer from "@/components/sections/Footer";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch data concurrently
  const [
    { data: projects },
    { data: experiences },
    { data: awards },
    { data: gallery }
  ] = await Promise.all([
    supabase.from('projects').select('*').order('id', { ascending: true }),
    supabase.from('experiences').select('*').order('id', { ascending: true }),
    supabase.from('awards').select('*').order('id', { ascending: true }),
    supabase.from('gallery').select('*').order('id', { ascending: true })
  ]);

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Custom Mouse Cursor */}
      <CustomCursor />
      
      {/* Header Navigation */}
      <Header />

      {/* Page Sections */}
      <Hero />
      <WorkGallery projects={projects || []} />
      <Skills />
      <About />
      <Awards awards={awards || []} gallery={gallery || []} />
      <Trainings experiences={experiences || []} />
      <Footer />
    </main>
  );
}
