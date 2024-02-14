import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/access";

export const RangesData: CollectionConfig = {
   slug: "rangesData",
   labels: { singular: "rangeData", plural: "rangesData" },
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
         name: "grids",
         type: "array",
         fields: [
            {
               name: "row",
               type: "number",
            },
            {
               name: "col",
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
