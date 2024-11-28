import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Skins: CollectionConfig = {
   slug: "skins",
   labels: { singular: "Skin", plural: "Skins" },
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
         name: "content",
         type: "text",
      },
      {
         name: "operator",
         type: "relationship",
         relationTo: "operators",
      },
      {
         name: "brand",
         type: "relationship",
         relationTo: "skin-brands",
      },
      {
         name: "illustrators",
         type: "relationship",
         relationTo: "illustrators",
         hasMany: true,
      },
      {
         name: "portrait",
         type: "upload",
         relationTo: "images",
      },
      {
         name: "splash",
         type: "upload",
         relationTo: "images",
      },
      {
         name: "quotes",
         type: "array",
         fields: [
            {
               name: "title",
               type: "text",
            },
            {
               name: "text",
               type: "text",
            },
            {
               name: "unlockCondition",
               type: "select",
               options: [
                  { label: "Trust", value: "FAVOR" },
                  { label: "Promotion", value: "AWAKE" },
               ],
            },
            {
               name: "unlockConditionValue",
               type: "number",
               admin: {
                  condition: (_, siblingData) => siblingData.unlock_cond == "FAVOR"
               }
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
