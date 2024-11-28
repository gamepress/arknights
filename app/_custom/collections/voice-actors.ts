import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const VoiceActors: CollectionConfig = {
   slug: "voice-actors",
   labels: { singular: "Voice Actor", plural: "Voice Actors" },
   admin: {
      group: "Custom",
      useAsTitle: "name",
   },
   access: {
      create: isStaff,
      read: () => true,
      update: isStaff,
      delete: isStaff,
   },
   fields: [
      {
         name: "id",
         type: "text",
      },
      {
         name: "name",
         type: "text",
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
