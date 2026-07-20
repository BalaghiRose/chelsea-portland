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

export const getPublishedSections = query({
  args: {
    sections: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const requestedSections = args.sections.filter(
      (section): section is string => Boolean(section?.trim())
    );

    if (requestedSections.length === 0) {
      return {};
    }

    const results = await Promise.all(
      requestedSections.map(async (section) => {
        const existing = await ctx.db
          .query("cmsSections")
          .withIndex("by_section", (q) => q.eq("section", section))
          .unique();

        return [section, existing?.isPublished ? existing : null] as const;
      })
    );

    return Object.fromEntries(
      results.filter(([, record]) => Boolean(record))
    ) as Record<string, { content?: unknown; section?: string; isPublished?: boolean }>;
  },
});