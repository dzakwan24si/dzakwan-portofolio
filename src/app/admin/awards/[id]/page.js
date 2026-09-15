import { createClient } from "@/utils/supabase/server";
import AwardForm from "../AwardForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Penghargaan | Admin CMS",
};

export default async function EditAwardPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: award, error } = await supabase
    .from('awards')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !award) {
    notFound();
  }

  return <AwardForm initialData={award} />;
}
