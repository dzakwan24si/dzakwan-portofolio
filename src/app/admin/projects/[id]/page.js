import { createClient } from "@/utils/supabase/server";
import ProjectForm from "../ProjectForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Proyek | Admin CMS",
};

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    notFound();
  }

  return <ProjectForm initialData={project} />;
}
