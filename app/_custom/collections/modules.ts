import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Modules: CollectionConfig = {
   slug: "modules",
   labels: { singular: "Module", plural: "Modules" },
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
         name: "type",
         type: "select",
         options: [
            { label: "Initial", value: "INITIAL", },
            { label: "Advanced", value: "ADVANCED", },
         ],
      },
      {
         name: "operator",
         type: "relationship",
         relationTo: "operators",
      },
      {
         name: "level",
         type: "number",
      },
      {
         name: "trust",
         type: "number",
      },
      {
         name: "missions",
         type: "array",
         fields: [
            {
               name: "description",
               type: "text",
            },
            //{
            //   name: "stage",
            //   type: "relationship",
            //   relationTo: "stages",
            //}
         ],
      },
      {
         name: "stages",
         type: "array",
         fields: [
            {
               name: "number",
               type: "number",
            },
            {
               name: "cost",
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
               name: "attributes",
               type: "array",
               fields: [
                  {
                     "name": "attribute",
                     "type": "relationship",
                     "relationTo": "attributes",
                  },
                  {
                     "name": "value",
                     "type": "number",
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
