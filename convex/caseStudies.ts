import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCaseStudies = query({
  handler: async (ctx) => {
    const caseStudies = await ctx.db.query("caseStudies").order("desc").collect();

    const sortedCaseStudies = [...caseStudies].sort((a, b) => {
      const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (orderA === orderB) {
        return b.createdAt - a.createdAt;
      }

      return orderA - orderB;
    });

    return await Promise.all(
      sortedCaseStudies.map(async (study) => ({
        ...study,
        thumbnailUrl: study.thumbnail
          ? await ctx.storage.getUrl(study.thumbnail)
          : null,
      }))
    );
  },
});

export const getCaseStudyBySlug = query({
  args: {
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { slug } = args;
    if (!slug) {
      return null;
    }

    const study = await ctx.db
      .query("caseStudies")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (!study) {
      return null;
    }

    return {
      ...study,
      thumbnailUrl: study.thumbnail
        ? await ctx.storage.getUrl(study.thumbnail)
        : null,
    };
  },
});

export const getCaseStudiesSectionSettings = query({
  handler: async (ctx) => {
    const settings = await ctx.db
      .query("sectionSettings")
      .withIndex("by_key", (q) => q.eq("key", "caseStudies"))
      .unique();

    return settings ?? {
      key: "caseStudies",
      title: "Case Studies",
      updatedAt: Date.now(),
    };
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createCaseStudy = mutation({
  args: {
    slug: v.string(),
    title: v.string(),
    paras: v.string(),
    featured: v.boolean(),
    thumbnail: v.optional(v.id("_storage")),
    altText: v.string(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("caseStudies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (existing) {
      throw new Error("A case study with this slug already exists.");
    }

    const existingCaseStudies = await ctx.db.query("caseStudies").collect();
    const maxSortOrder = existingCaseStudies.reduce((max, study) => {
      return Math.max(max, study.sortOrder ?? 0);
    }, 0);

    const now = Date.now();

    return await ctx.db.insert("caseStudies", {
      ...args,
      sortOrder: maxSortOrder + 1,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateCaseStudy = mutation({
  args: {
    id: v.id("caseStudies"),
    slug: v.string(),
    title: v.string(),
    paras: v.string(),
    featured: v.boolean(),
    thumbnail: v.optional(v.id("_storage")),
    altText: v.string(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    metaKeywords: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;

    const caseStudy = await ctx.db.get(id);

    if (!caseStudy) {
      throw new Error("Case study not found.");
    }

    const existing = await ctx.db
      .query("caseStudies")
      .withIndex("by_slug", (q) => q.eq("slug", data.slug))
      .unique();

    if (existing && existing._id !== id) {
      throw new Error("A case study with this slug already exists.");
    }

    const patchData: {
      slug: string;
      title: string;
      paras: string;
      featured: boolean;
      altText: string;
      metaTitle?: string;
      metaDescription?: string;
      metaKeywords?: string[];
      thumbnail?: typeof args.thumbnail;
      updatedAt: number;
    } = {
      slug: data.slug,
      title: data.title,
      paras: data.paras,
      featured: data.featured,
      altText: data.altText,
      updatedAt: Date.now(),
    };

    if (data.thumbnail !== undefined) {
      patchData.thumbnail = data.thumbnail;
    }
    if (data.metaTitle !== undefined) {
      patchData.metaTitle = data.metaTitle;
    }
    if (data.metaDescription !== undefined) {
      patchData.metaDescription = data.metaDescription;
    }
    if (data.metaKeywords !== undefined) {
      patchData.metaKeywords = data.metaKeywords;
    }

    await ctx.db.patch(id, patchData);

    return id;
  },
});

export const deleteCaseStudy = mutation({
  args: {
    id: v.id("caseStudies"),
  },
  handler: async (ctx, args) => {
    const caseStudy = await ctx.db.get(args.id);

    if (!caseStudy) {
      throw new Error("Case study not found.");
    }

    if (caseStudy.thumbnail) {
      await ctx.storage.delete(caseStudy.thumbnail);
    }

    await ctx.db.delete(args.id);

    return {
      success: true,
      message: "Case study deleted successfully.",
    };
  },
});

export const reorderCaseStudies = mutation({
  args: {
    ids: v.array(v.id("caseStudies")),
  },
  handler: async (ctx, args) => {
    await Promise.all(
      args.ids.map((id, index) =>
        ctx.db.patch(id, {
          sortOrder: index + 1,
          updatedAt: Date.now(),
        })
      )
    );

    return { success: true };
  },
});

export const upsertCaseStudiesSectionSettings = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sectionSettings")
      .withIndex("by_key", (q) => q.eq("key", "caseStudies"))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        updatedAt: Date.now(),
      });

      return existing._id;
    }

    return await ctx.db.insert("sectionSettings", {
      key: "caseStudies",
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});
