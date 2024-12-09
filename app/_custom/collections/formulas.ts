import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Formulas: CollectionConfig = {
   slug: "formulas",
   labels: { singular: "Formula", plural: "Formulas" },
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
         name: "type",
         type: "select",
         options: [
            { label: "Factory", value: "FACTORY" },
            { label: "Workshop", value: "WORKSHOP" },
         ],
      },
      {
         name: "material",
         type: "relationship",
         relationTo: "materials",
      },
      {
         name: "formulas",
         type: "array",
         fields: [
            {
               {
                  name: "count",
                  type: "number",
               },
               {
                  name: "time",
                  type: "number",
                  admin: {
                     condition: (_, siblingData) => siblingData.type == "FACTORY",
                  },
               },
               {
                  name: "moodCost",
                  type: "number",
                  admin: {
                     condition: (_, siblingData) => siblingData.type == "WORKSHOP",
                  },
               },
               {
                  name: "lmdCost",
                  type: "number",
                  admin: {
                     condition: (_, siblingData) => siblingData.type == "WORKSHOP",
                  },
               },
               {
                  name: "extraByproductRate",
                  type: "number",
                  admin: {
                     condition: (_, siblingData) => siblingData.type == "WORKSHOP",
                  },
               },
               {
                  name: "Extrabyproducts",
                  type: "array",
                  admin: {
                     condition: (_, siblingData) => siblingData.type == "WORKSHOP",
                  },
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
                     {
                        name: "weight",
                        type: "number",
                     },
                  ],
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
                  name: "requiredRooms",
                  type: "array",
                  fields: [
                     {
                        name: "room",
                        type: "relationship",
                        relationTo: "base-rooms",
                     },
                     {
                        name: "requiredLevel",
                        type: "number",
                     },
                     {
                        name: "requiredCount",
                        type: "number",
                     },
                  ],
               },
               //{
               //   name: "requiredStages",
               //   type: "array",
               //   fields: [
               //      {
               //         name: "stage",
               //         type: "relationship",
               //         relationTo: "stages",
               //      },
               //      {
               //         name: "requiredRank",
               //         type: "number",
               //      },
               //   ],
               //},
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
