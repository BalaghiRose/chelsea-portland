import { query } from "../_generated/server";
import { v } from "convex/values";

export const getSection = query({
  args: {
    section: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();
  },
});

export const getAllSections = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("cmsSections")
      .order("desc")
      .collect();
  },
});

export const getPublishedSection = query({
  args: {
    section: v.string(),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("cmsSections")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .unique();

    return existing?.isPublished ? existing : null;
  },
});