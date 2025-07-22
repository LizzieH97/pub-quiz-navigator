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
export async function fetchReviewsByPubId(id: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("pub_id", id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return data;
}
export async function uploadReview(
  userId: string,
  name: string,
  message: string,
  rating: number,
  pubId: number
) {
  if (!userId) {
    console.error("No userId provided to uploadReview");
    return { success: false, error: new Error("Please sign in first!") };
  }

  const { error } = await supabase.from("reviews").upsert(
    [
      {
        user_id: userId, // include this if your table expects it!
        name,
        message,
        rating,
        pub_id: pubId,
      },
    ],
    {
      onConflict: "id", // or another unique key if you don't want to overwrite by default
      // @ts-ignore: 'returning' is valid but not typed correctly
      returning: "minimal",
    }
  );

  if (error) {
    console.error("Error uploading review:", error.message);
    return { success: false, error };
  }

  return { success: true };
}
export async function updatePub(userId: string, pubData: any) {
  if (!userId) {
    console.error("No userId provided to updatePub");
    return { success: false, error: new Error("Missing user ID") };
  }

  const dataToUpsert = { id: userId, ...pubData };

  const { error } = await supabase.from("pub-users").upsert(dataToUpsert, {
    onConflict: "id",
  });

  if (error) {
    console.error("updatePub error:", error);
    return { success: false, error };
  }

  return { success: true };
}
