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

  return data;
}
export async function fetchPubById(id: number) {
  const { data, error } = await supabase
    .from("pub-list")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);

  return data;
}
export async function signUpUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Sign-up error:", error.message);
    return { success: false, error };
  }

  return { success: true, user: data.user };
}

export async function updateProfile(userId: string, profileData: any) {
  if (!userId) {
    console.error("No userId provided to updateProfile");
    return { success: false, error: new Error("Missing user ID") };
  }

  // Ensure the userId is included in the data to upsert (as primary key)
  const dataToUpsert = { id: userId, ...profileData };

  // TypeScript-safe workaround to allow returning: 'minimal'
  const { error } = await supabase.from("quiz-enjoyer").upsert(dataToUpsert, {
    onConflict: "id",
    // @ts-ignore: 'returning' is valid but not typed correctly
    returning: "minimal",
  });

  if (error) {
    console.error("Error upserting profile:", error.message);
    return { success: false, error };
  }

  return { success: true };
}

export async function uploadAvatar(userId: string, file: File) {
  if (!file || !file.name) {
    return { success: false, error: new Error("Invalid file selected") };
  }

  const fileExt = file.name.split(".").pop();
  if (!fileExt) {
    return {
      success: false,
      error: new Error("Cannot determine file extension"),
    };
  }

  const fileName = `${userId}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Avatar upload error:", error.message);
    return { success: false, error };
  }

  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const publicUrl = publicUrlData?.publicUrl;

  return { success: true, url: publicUrl };
}
