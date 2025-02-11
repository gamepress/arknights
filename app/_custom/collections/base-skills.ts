import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const BaseSkills: CollectionConfig = {
   slug: "base-skills",
   labels: { singular: "Base Skill", plural: "Base Skills" },
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
         name: "description",
         type: "text",
      },
      {
         name: "room",
         type: "relationship",
         relationTo: "base-rooms",
      },
      {
         name: "operators",
         type: "relationship",
         relationTo: "operators",
         hasMany: true,
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
