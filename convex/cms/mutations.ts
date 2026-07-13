import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const upsertSection = mutation({
  args: {
    section: v.string(),
    content: v.any(),
    isPublished: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    const nextPayload = {
      section: args.section.trim(),
      content: args.content,
      isPublished: args.isPublished ?? true,
      updatedAt: Date.now(),
    };

    if (existing) {
      await ctx.db.patch(existing._id, nextPayload);
      return existing._id;
    }

    return await ctx.db.insert("cmsSections", {
      ...nextPayload,
      createdAt: Date.now(),
    });
  },
});

export const createSection = mutation({
  args: {
    section: v.string(),
    content: v.any(),
    isPublished: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    if (existing) {
      throw new Error(`Section "${args.section}" already exists.`);
    }

    return await ctx.db.insert("cmsSections", {
      section: args.section,
      content: args.content,
      isPublished: args.isPublished ?? true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateSection = mutation({
  args: {
    section: v.string(),
    content: v.any(),
    isPublished: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    if (!existing) {
      throw new Error(`Section "${args.section}" not found.`);
    }

    await ctx.db.patch(existing._id, {
      content: args.content,
      isPublished: args.isPublished ?? existing.isPublished,
      updatedAt: Date.now(),
    });

    return existing._id;
  },
});

export const togglePublish = mutation({
  args: {
    section: v.string(),
    isPublished: v.boolean(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    if (!existing) {
      throw new Error(`Section "${args.section}" not found.`);
    }

    await ctx.db.patch(existing._id, {
      isPublished: args.isPublished,
      updatedAt: Date.now(),
    });
  },
});

export const deleteSection = mutation({
  args: {
    section: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    if (!existing) {
      throw new Error(`Section "${args.section}" not found.`);
    }

    await ctx.db.delete(existing._id);
  },
});