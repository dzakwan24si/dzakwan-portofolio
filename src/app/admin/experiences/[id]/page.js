import { createClient } from "@/utils/supabase/server";
import ExperienceForm from "../ExperienceForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Pengalaman | Admin CMS",
};

export default async function EditExperiencePage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: experience, error } = await supabase
    .from('experiences')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !experience) {
    notFound();
  }

  return <ExperienceForm initialData={experience} />;
}
