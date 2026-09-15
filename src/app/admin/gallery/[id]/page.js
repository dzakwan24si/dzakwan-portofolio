import { createClient } from "@/utils/supabase/server";
import GalleryForm from "../GalleryForm";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Foto Galeri | Admin CMS",
};

export default async function EditGalleryPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: gallery, error } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !gallery) {
    notFound();
  }

  return <GalleryForm initialData={gallery} />;
}
