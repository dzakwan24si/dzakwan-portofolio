import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ExperienceClient from "./ExperienceClient";
import { createClient } from "@/utils/supabase/server";

export default async function ExperiencePage() {
  const supabase = await createClient();
  const { data: experiences } = await supabase.from("experiences").select("*").order("id", { ascending: true });

  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-navy">
      <CustomCursor />
      <Header />
      
      <div className="relative pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto z-10">
        <ExperienceClient experiences={experiences || []} />
      </div>
      
      <Footer />
    </main>
  );
}
