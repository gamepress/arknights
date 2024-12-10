import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const FurnitureGroups: CollectionConfig = {
   slug: "furniture-groups",
   labels: { singular: "Furniture Group", plural: "Furniture Groups" },
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
         name: "theme",
         type: "relationship",
         relationTo: "furniture-themes",
      },
      {
         name: "comfort",
         type: "number",
      },
      {
         name: "furnitures",
         type: "relationship",
         relationTo: "furnitures",
         hasMany: true,
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
