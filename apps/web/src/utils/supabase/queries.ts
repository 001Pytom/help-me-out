import { createClient } from "./client";

export async function getCurrentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

// export async function getUserVideos(userId: string) {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from("videos")
//     .select("*")
//     .eq("user_id", userId)
//     .order("created_at", { ascending: false });

//   if (error) throw error;
//   return data;
// }