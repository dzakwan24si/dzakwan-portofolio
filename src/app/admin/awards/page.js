import { createClient } from "@/utils/supabase/server";
import AwardsTableClient from "./AwardsTableClient";

export const metadata = {
  title: "Kelola Penghargaan | Admin CMS",
};

export default async function AdminAwardsPage() {
  const supabase = await createClient();
  
  const { data: awards, error } = await supabase
    .from('awards')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error("Error fetching awards:", error);
  }

  return (
    <AwardsTableClient initialAwards={awards || []} />
  );
}
