import { defineTool } from "@lovable.dev/mcp-js";
import { defineTool as _unused } from "@lovable.dev/mcp-js";
import { errorResult, getWeddingId, jsonResult, supabaseAnon } from "../supabase";

void _unused;

export default defineTool({
  name: "list_gallery",
  title: "List gallery photos",
  description: "List the wedding gallery photos with temporary viewable image URLs.",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: false },
  handler: async () => {
    const weddingId = await getWeddingId();
    const supabase = supabaseAnon();
    const { data, error } = await supabase
      .from("gallery")
      .select("id, image_path, caption, sort_order")
      .eq("wedding_id", weddingId)
      .order("sort_order", { ascending: true });
    if (error) return errorResult(error.message);

    const items = await Promise.all(
      (data ?? []).map(async (item) => {
        const signed = await supabase.storage
          .from("wedding-gallery")
          .createSignedUrl(item.image_path as string, 60 * 60);
        return {
          id: item.id,
          caption: item.caption,
          sort_order: item.sort_order,
          url: signed.data?.signedUrl ?? null,
        };
      }),
    );
    return jsonResult(items);
  },
});
