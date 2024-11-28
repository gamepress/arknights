import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Paradoxes: CollectionConfig = {
   slug: "paradoxes",
   labels: { singular: "Paradox", plural: "Paradoxes" },
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
         name: "description",
         type: "text",
      },
      {
         name: "promotion",
         type: "number",
      },
      {
         name: "level",
         type: "number",
      },
      {
         name: "rewards",
         type: "array",
         fields: [
            {
               name: "material",
               type: "relationship",
               relationTo: "materials",
            },
            {
               name: "quantity",
               type: "number",
            },
         ],
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
