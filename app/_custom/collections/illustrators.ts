import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Illustrators: CollectionConfig = {
   slug: "illustrators",
   labels: { singular: "Illustrator", plural: "Illustrators" },
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
         name: "operators",
         type: "relationship",
         relationTo: "operators",
         hasMany: true,
      },
      {
         name: "skins",
         type: "relationship",
         relationTo: "skins",
         hasMany: true,
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
