"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { supabase } from "@/lib/supabase";

type FavToggleProps = {
  pubId: number;
};

export default function FavToggle({ pubId }: FavToggleProps) {
  const { profile, refetch } = useUserProfile();
  const [checked, setChecked] = useState(false);

  // ✅ Set toggle based on whether pubId is in favourites
  useEffect(() => {
    if (profile?.favourites?.includes(pubId)) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [profile, pubId]);

  const handleToggle = async () => {
    if (!profile) return;

    const currentFavs: number[] = profile.favourites || [];
    let updatedFavs: number[];

    if (checked) {
      // Remove pubId
      updatedFavs = currentFavs.filter((id) => id !== pubId);
    } else {
      // Add pubId
      updatedFavs = [...currentFavs, pubId];
    }

    // ✅ 1️⃣ Update the user's favourites array
    const { error: favsError } = await supabase
      .from("quiz-enjoyer")
      .update({ favourites: updatedFavs })
      .eq("id", profile.id);

    if (favsError) {
      console.error("Failed to update favourites:", favsError);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("pub-list")
      .select("fav_count")
      .eq("id", pubId)
      .single();

    if (fetchError) {
      console.error("Failed to fetch pub favouritecount:", fetchError);
      return;
    }

    const increment = checked ? -1 : 1;
    const newCount = (data?.fav_count || 0) + increment;

    const { data: updateData, error: countError } = await supabase
      .from("pub-list")
      .update({ fav_count: newCount })
      .eq("id", pubId)
      .select();

    if (countError) {
      console.error("Failed to update pub fav_count:", countError);
      return;
    }

    console.log("Updated pub-list rows:", updateData);

    setChecked(!checked);
    refetch?.();
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={handleToggle}
      />

      <div className="group peer ring-0 bg-rose-400 rounded-full outline-none duration-300 after:duration-300 w-20 h-8 shadow-md peer-checked:bg-emerald-500 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-8 after:w-8 after:left-1 after:top-1/2 after:-translate-y-1/2 after:flex after:justify-center after:items-center peer-checked:after:translate-x-10 peer-hover:after:scale-95 flex items-center justify-around">
        <img src="/star.png" alt="On" className="w-6 h-6" />
        <img src="/staroutline.png" alt="Off" className="w-6 h-6" />
      </div>
    </label>
  );
}
