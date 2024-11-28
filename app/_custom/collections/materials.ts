import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Materials: CollectionConfig = {
   slug: "materials",
   labels: { singular: "Material", plural: "Materials" },
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
         name: "slug",
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
         name: "description",
         type: "text",
      },
      {
         name: "rarity",
         type: "relationship",
         relationTo: "rarities",
      },
      //{
      //   name: "type",
      //   type: "select",
      //   options: [ ],
      //},
      {
         name: "sortId",
         type: "number",
      },
      {
         name: "usage",
         type: "text",
      },
      {
         name: "obtainApproach",
         type: "text",
      },
      {
         name: "availability",
         type: "select",
         hasMany: true,
         options: [
            { label: "NA", value: "na" },
         ],
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
