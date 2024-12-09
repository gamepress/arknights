import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const BaseRooms: CollectionConfig = {
   slug: "base-rooms",
   labels: { singular: "Base Room", plural: "Base Rooms" },
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
         name: "text",
      },
      {
         name: "maxCount",
         type: "number",
      },
      //{
      //   name: "upgrades",
      //   type: "array",
      //   fields: []
      //},
      {
         name: "checksum",
         type: "text",
         required: true,
      },
   ],
};
