import { defineTool } from "@lovable.dev/mcp-js";
import { errorResult, jsonResult, supabaseAnon, WEDDING_SLUG } from "../supabase";

export default defineTool({
  name: "get_wedding_details",
  title: "Get wedding details",
  description:
    "Get the public wedding details for Nelson & Cidália: date, ceremony and reception venues, times, addresses, dress code, welcome message, story and hashtag.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async () => {
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("weddings")
      .select(
        "slug, display_names, wedding_date, ceremony_venue, ceremony_address, ceremony_time, reception_venue, reception_address, reception_time, dress_code, welcome_message, story, hashtag",
      )
      .eq("slug", WEDDING_SLUG)
      .maybeSingle();
    if (error) return errorResult(error.message);
    if (!data) return errorResult("Wedding not found");
    return jsonResult(data);
  },
});
