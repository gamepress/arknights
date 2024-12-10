import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Furnitures: CollectionConfig = {
   slug: "furnitures",
   labels: { singular: "Furniture", plural: "Furnitures" },
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
         name: "usage",
         type: "text",
      },
      {
         name: "rarity",
         type: "relationship",
         relationTo: "rarities",
      },
      {
         name: "group",
         type: "relationship",
         relationTo: "furniture-groups",
      },
      {
         name: "type",
         type: "select",
         options: [
            { label: "Wallpaper", value: "WALLPAPER" },
            { label: "Floor", value: "FLOOR" },
            { label: "Ceiling", value: "CEILING" },
            { label: "Carpet", value: "CARPET" },
            { label: "Table", value: "TABLE" },
            { label: "Chair", value: "SEATING" },
            { label: "Bed", value: "BEDDING" },
            { label: "Cabinet", value: "CABINET" },
            { label: "Ceiling Light", value: "CEILINGLAMP" },
            { label: "Wall Light", value: "WALLLAMP" },
            { label: "Wall Decoration", value: "WALLDECO" },
            { label: "Decoration", value: "DECORATION" },
         ]
      },
      {
         name: "comfort",
         type: "number",
      },
      {
         name: "amount",
         type: "number",
      },
      {
         name: "width",
         type: "number",
      },
      {
         name: "height",
         type: "number",
      },
      {
         name: "depth",
         type: "number",
      },
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
