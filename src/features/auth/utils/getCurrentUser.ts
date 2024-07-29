"use server";

import { createClient } from "@/services/database/server";

export const getCurrentUser = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  return data.user;
};
