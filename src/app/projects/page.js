import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ProjectsArchiveClient from "./ProjectsArchiveClient";
import { createClient } from "@/utils/supabase/server";

export default async function ProjectsArchive() {
  const supabase = await createClient();
  const { data: projects } = await supabase.from("projects").select("*").order("id", { ascending: true });

  return (
    <main className="relative w-full min-h-screen pt-40 pb-20 px-6 md:px-12 max-w-[1200px] mx-auto">
      <CustomCursor />
      <Header />
      
      {/* Client Component for List */}
      <ProjectsArchiveClient projects={projects || []} />
      
      <Footer />
    </main>
  );
}
