import { createClient } from "@/utils/supabase/server";
import GalleryTableClient from "./GalleryTableClient";

export const metadata = {
  title: "Kelola Galeri | Admin CMS",
};

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  
  const { data: gallery, error } = await supabase
    .from('gallery')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching gallery:", error);
  }

  return (
    <GalleryTableClient initialGallery={gallery || []} />
  );
}
