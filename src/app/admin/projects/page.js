import { createClient } from "@/utils/supabase/server";
import ProjectsTableClient from "./ProjectsTableClient";

export const metadata = {
  title: "Kelola Proyek | Admin CMS",
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <ProjectsTableClient initialProjects={projects || []} />
  );
}
