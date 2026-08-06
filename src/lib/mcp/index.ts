import { defineMcp } from "@lovable.dev/mcp-js";
import getWeddingDetails from "./tools/get-wedding-details";
import listSchedule from "./tools/list-schedule";
import listGallery from "./tools/list-gallery";
import listGifts from "./tools/list-gifts";
import listMessages from "./tools/list-messages";
import leaveMessage from "./tools/leave-message";

export default defineMcp({
  name: "nelson-cidalia-s-love-story",
  title: "Nelson & Cidália's Love Story",
  version: "0.1.0",
  instructions:
    "Public tools for Nelson & Cidália's wedding invitation. Use `get_wedding_details` for date, venues and dress code, `list_schedule` for the day programme, `list_gallery` for photos, `list_gifts` for the gift registry, `list_messages` to read the guestbook and `leave_message` to sign it. Private RSVP data is not exposed.",
  tools: [getWeddingDetails, listSchedule, listGallery, listGifts, listMessages, leaveMessage],
});
