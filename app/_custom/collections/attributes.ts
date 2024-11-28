import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Attributes: CollectionConfig = {
   slug: "attributes",
   labels: { singular: "Attribute", plural: "Attributes" },
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
         name: "icon",
         type: "upload",
         relationTo: "images",
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
