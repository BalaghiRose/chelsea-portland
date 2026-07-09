import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    title: v.string(),

    description: v.array(v.string()),

    icon: v.optional(v.id("_storage")),

    thumbnail: v.optional(v.id("_storage")),

    altText: v.string(),

    sortOrder: v.optional(v.number()),

    createdAt: v.number(),

    updatedAt: v.number(),
  }),

  sectionSettings: defineTable({
    key: v.string(),

    title: v.string(),

    updatedAt: v.number(),
  }).index("by_key", ["key"]),

  caseStudies: defineTable({
    slug: v.string(),

    title: v.string(),

    paras: v.string(),

    featured: v.boolean(),

    thumbnail: v.optional(v.id("_storage")),

    altText: v.string(),

    metaTitle: v.optional(v.string()),

    metaDescription: v.optional(v.string()),

    metaKeywords: v.optional(v.array(v.string())),

    sortOrder: v.optional(v.number()),

    createdAt: v.number(),

    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"]),
});
