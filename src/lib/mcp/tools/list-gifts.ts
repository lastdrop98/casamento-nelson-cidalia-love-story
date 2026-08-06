import { defineTool } from "@lovable.dev/mcp-js";
import { errorResult, getWeddingId, jsonResult, supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_gifts",
  title: "List gift registry",
  description:
    "List the wedding gift registry items and whether each one is still available or already reserved.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const weddingId = await getWeddingId();
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("gifts")
      .select("id, name, description, price_label, image_url, status, sort_order")
      .eq("wedding_id", weddingId)
      .order("sort_order", { ascending: true });
    if (error) return errorResult(error.message);
    return jsonResult(data ?? []);
  },
});
