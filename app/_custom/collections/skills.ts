import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Skills: CollectionConfig = {
   slug: "skills",
   labels: { singular: "Skill", plural: "Skills" },
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
         name: "type",
         type: "select",
         options: [
            { label: "Passive", value: "PASSIVE", },
            { label: "Manual", value: "MANUAL", },
            { label: "Auto", value: "AUTO", },
         ],
      },
      {
         name: "levels",
         type: "array",
         fields: [
            {
               name: "level",
               type: "number",
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
               name: "range",
               type: "relationship",
               relationTo: "ranges",
            },
            {
               name: "duration",
               type: "number",
            },
            {
               name: "spCost",
               type: "number",
            },
            {
               name: "initialSp",
               type: "number",
            },
            {
               name: "modifiers",
               type: "array",
               fields: [
                  {
                     name: "type",
                     type: "text", // TODO(dim): Maybe select for enumeration?
                  },
                  {
                     name: "value",
                     type: "number",
                  },
               ],
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
