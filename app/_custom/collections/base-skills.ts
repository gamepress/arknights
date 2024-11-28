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
         type: "select",
         options: [
            { label: "Control Center", value: "CONTROL" },
            { label: "Power Plant", value: "POWER" },
            { label: "Factory", value: "MANUFACTURE" },
            { label: "Dormitory", value: "DORMITORY" },
            { label: "Reception Room", value: "MEETING" },
            { label: "Office", value: "HIRE" },
            { label: "Trading Post", value: "TRADING" },
            { label: "Workshop", value: "WORKSHOP" },
            { label: "Training Room", value: "TRAINING" },
         ],
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
