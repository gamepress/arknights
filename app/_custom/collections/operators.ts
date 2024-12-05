import type { CollectionConfig } from "payload/types";

import { isStaff } from "../../db/collections/users/users.access";

export const Operators: CollectionConfig = {
   slug: "operators",
   labels: { singular: "Operator", plural: "Operators" },
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
         name: "displayNo",
         type: "text",
      },
      {
         name: "rarity",
         type: "relationship",
         relationTo: "rarities",
      },
      {
         name: "position",
         type: "relationship",
         relationTo: "positions",
      },
      {
         name: "profession",
         type: "relationship",
         relationTo: "professions",
      },
      {
         name: "subProfession",
         type: "relationship",
         relationTo: "professions",
      },
      {
         name: "nation",
         type: "relationship",
         relationTo: "factions",
      },
      {
         name: "team",
         type: "relationship",
         relationTo: "factions",
      },
      {
         name: "group",
         type: "relationship",
         relationTo: "factions",
      },
      {
         name: "obtainApproach",
         type: "text",
      },
      {
         name: "potentialItem",
         type: "relationship",
         relationTo: "materials",
      },
      {
         name: "tags",
         type: "relationship",
         relationTo: "tags",
         hasMany: true,
      },
      {
         name: "availability",
         type: "select",
         hasMany: true,
         options: [
            { label: "NA", value: "na" },
         ],
      },
      // These are "skins" but since they're just the default / elite skins, we hold them here.
      // We don't want these in the skin collection because they're not actual "skins" in the game.
      {
         name: "illustrators",
         type: "relationship",
         relationTo: "illustrators",
         hasMany: true,
      },
      {
         name: "promotionAssets",
         type: "array",
         fields: [
            {
               name: "promotion",
               type: "number",
            },
            {
               name: "icon",
               type: "upload",
               relationTo: "images",
            },
            {
               name: "splash",
               type: "upload",
               relationTo: "images",
            },
         ],
      },
      {
         name: "trait",
         type: "array",
         fields: [
            {
               name: "requiredPromotion",
               type: "number",
            },
            {
               name: "requiredLevel",
               type: "number",
            },
            {
               name: "requiredPotential",
               type: "number",
            },
            {
               name: "description",
               type: "text",
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
         name: "promotions",
         type: "array",
         fields: [
            {
               name: "promotion",
               type: "number",
            },
            {
               name: "maxLevel",
               type: "number",
            },
            {
               name: "range",
               type: "relationship",
               relationTo: "ranges",
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
                     "name": "base",
                     "type": "number",
                  },
                  {
                     "name": "max",
                     "type": "number",
                  },
               ],
            },
         ],
      },
      {
         name: "trust",
         type: "array",
         fields: [
            {
               name: "attribute",
               type: "relationship",
               relationTo: "attributes",
            },
            {
               name: "value",
               type: "number",
            },
         ],
      },
      {
         name: "potentials",
         type: "array",
         fields: [
            {
               name: "potential",
               type: "number",
            },
            {
               name: "description",
               type: "text",
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
         name: "talents",
         type: "array",
         fields: [
            {
               name: "name",
               type: "text",
            },
            {
               name: "upgrades",
               type: "array",
               fields: [
                  {
                     name: "requiredPromotion",
                     type: "number",
                  },
                  {
                     name: "requiredLevel",
                     type: "number",
                  },
                  {
                     name: "requiredPotential",
                     type: "number",
                  },
                  {
                     name: "description",
                     type: "text",
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
         ],
      },
      {
         name: "skills",
         type: "array",
         fields: [
            {
               name: "requiredPromotion",
               type: "number",
            },
            {
               name: "requiredLevel",
               type: "number",
            },
            {
               name: "skill",
               type: "relationship",
               relationTo: "skills",
            },
            {
               name: "cost",
               type: "array",
               fields: [
                  {
                     name: "requiredPromotion",
                     type: "number",
                  },
                  {
                     name: "requiredLevel",
                     type: "number",
                  },
                  {
                     name: "upgradeTime",
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
               ],
            },
         ],
      },
      {
         name: "baseSkillUpgradeCost",
         type: "array",
         fields: [
            {
               name: "skillLevel",
               type: "number",
            },
            {
               name: "potential",
               type: "number",
            },
            {
               name: "level",
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
         ]
      },
      {
         name: "baseSkills",
         type: "array",
         fields: [
            {
               name: "upgrades",
               type: "array",
               fields: [
                  {
                     name: "requiredPromotion",
                     type: "number",
                  },
                  {
                     name: "requiredLevel",
                     type: "number",
                  },
                  {
                     name: "skill",
                     type: "relationship",
                     relationTo: "base-skills",
                  },
               ],
            },
         ],
      },
      {
         name: "modules",
         type: "relationship",
         relationTo: "modules",
         hasMany: true,
      },
      {
         name: "paradoxSimulation",
         type: "relationship",
         relationTo: "paradoxes",
      },
      {
         name: "skins",
         type: "relationship",
         relationTo: "skins",
         hasMany: true,
      },
      {
         name: "stories",
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
         ],
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
