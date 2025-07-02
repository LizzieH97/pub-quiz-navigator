// lib/api.ts
import { supabase } from "./supabase";

export async function fetchPubs() {
  const { data, error } = await supabase.from("pub-list").select("*");
  if (error) throw new Error(error.message);
  return data;
}
export async function fetchPubsByDate(day: String) {
  const { data, error } = await supabase
    .from("pub-list")
    .select("*")
    .eq("day", day);
  if (error) throw new Error(error.message);
  console.log(data);
  return data;
}
