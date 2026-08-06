import { defineTool } from "@lovable.dev/mcp-js";
import { errorResult, getWeddingId, jsonResult, supabaseAnon } from "../supabase";

export default defineTool({
  name: "list_schedule",
  title: "List wedding schedule",
  description: "List the wedding day programme (events with times and descriptions) in order.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const weddingId = await getWeddingId();
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("schedule")
      .select("*")
      .eq("wedding_id", weddingId)
      .order("sort_order", { ascending: true });
    if (error) return errorResult(error.message);
    return jsonResult(data ?? []);
  },
});
