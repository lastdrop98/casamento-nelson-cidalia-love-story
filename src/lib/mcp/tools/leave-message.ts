import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { errorResult, getWeddingId, jsonResult, supabaseAnon } from "../supabase";

export default defineTool({
  name: "leave_message",
  title: "Leave a guestbook message",
  description: "Post a public guestbook message to the couple.",
  inputSchema: {
    guest_name: z.string().trim().max(120).describe("Name of the guest signing the message."),
    message: z.string().trim().min(1).max(1000).describe("The message text."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ guest_name, message }) => {
    const weddingId = await getWeddingId();
    const supabase = supabaseAnon();
    const { error } = await supabase
      .from("messages")
      .insert({ wedding_id: weddingId, guest_name: guest_name || null, message });
    if (error) return errorResult(error.message);
    return jsonResult({ ok: true });
  },
});
