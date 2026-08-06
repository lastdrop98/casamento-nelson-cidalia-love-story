import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, getWeddingId, jsonResult, supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_messages",
  title: "List guest messages",
  description: "List the most recent public guestbook messages left for the couple.",
  inputSchema: {
    limit: z.number().int().min(1).max(100).default(20).describe("How many messages to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit }) => {
    const weddingId = await getWeddingId();
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("messages")
      .select("guest_name, message, created_at")
      .eq("wedding_id", weddingId)
      .order("created_at", { ascending: false })
      .limit(limit ?? 20);
    if (error) return errorResult(error.message);
    return jsonResult(data ?? []);
  },
});
