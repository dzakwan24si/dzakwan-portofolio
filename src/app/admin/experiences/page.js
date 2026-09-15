import { createClient } from "@/utils/supabase/server";
import ExperiencesTableClient from "./ExperiencesTableClient";

export const metadata = {
  title: "Kelola Pengalaman | Admin CMS",
};

export default async function AdminExperiencesPage() {
  const supabase = await createClient();
  
  const { data: experiences, error } = await supabase
    .from('experiences')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching experiences:", error);
  }

  return (
    <ExperiencesTableClient initialExperiences={experiences || []} />
  );
}
