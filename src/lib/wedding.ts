import { supabase } from "@/integrations/supabase/client";

export const WEDDING_SLUG = "nelson-cidalia";

export async function fetchWedding() {
  const { data, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("slug", WEDDING_SLUG)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Wedding not found");
  return data;
}

export async function fetchGallery(weddingId: string) {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchSchedule(weddingId: string) {
  const { data, error } = await supabase
    .from("schedule")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function fetchGifts(weddingId: string) {
  const { data, error } = await supabase
    .from("gifts")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function reserveGift(giftId: string, name: string, phone: string) {
  const { error } = await supabase
    .from("gifts")
    .update({ status: "reserved", reserved_by_name: name, reserved_by_phone: phone })
    .eq("id", giftId)
    .eq("status", "available");
  if (error) throw error;
}

export async function fetchMessages(weddingId: string, limit = 20) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("wedding_id", weddingId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function submitMessage(input: { wedding_id: string; guest_name?: string; message: string }) {
  const { error } = await supabase.from("messages").insert(input);
  if (error) throw error;
}

export async function signUrl(bucket: string, path: string | null | undefined) {
  if (!path) return null;
  const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 60 * 60 * 24 * 7);
  return data?.signedUrl ?? null;
}

export async function submitRsvp(input: {
  wedding_id: string;
  guest_name: string;
  attending: boolean;
  guest_count: number;
  message?: string;
}) {
  const { error } = await supabase.from("rsvps").insert(input);
  if (error) throw error;
}
