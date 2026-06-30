import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get all services
 */
export const getServices = query({
  handler: async (ctx) => {
    const services = await ctx.db
      .query("services")
      .order("desc")
      .collect();

    const sortedServices = [...services].sort((a, b) => {
      const orderA = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

      if (orderA === orderB) {
        return b.createdAt - a.createdAt;
      }

      return orderA - orderB;
    });

    return await Promise.all(
      sortedServices.map(async (service) => ({
        ...service,
        iconUrl: service.icon
          ? await ctx.storage.getUrl(service.icon)
          : null,
        thumbnailUrl: service.thumbnail
          ? await ctx.storage.getUrl(service.thumbnail)
          : null,
      }))
    );
  },
});

export const getServicesSectionSettings = query({
  handler: async (ctx) => {
    const settings = await ctx.db
      .query("sectionSettings")
      .withIndex("by_key", (q) => q.eq("key", "services"))
      .unique();

    return settings ?? {
      key: "services",
      title: "Services",
      updatedAt: Date.now(),
    };
  },
});

/**
 * Generate upload URL for Convex storage
 */
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/**
 * Get single service by ID
 */
export const getServiceById = query({
  args: {
    id: v.id("services"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Create new service
 */
export const createService = mutation({
  args: {
    title: v.string(),
    description: v.array(v.string()),
    icon: v.optional(v.id("_storage")),
    thumbnail: v.optional(v.id("_storage")),
    altText: v.string(),
  },

  handler: async (ctx, args) => {
    const now = Date.now();

    const existingServices = await ctx.db.query("services").collect();
    const maxSortOrder = existingServices.reduce((max, service) => {
      return Math.max(max, service.sortOrder ?? 0);
    }, 0);

    return await ctx.db.insert("services", {
      title: args.title,
      description: args.description,
      icon: args.icon,
      thumbnail: args.thumbnail,
      altText: args.altText,
      sortOrder: maxSortOrder + 1,
      createdAt: now,
      updatedAt: now,
    });
  },
});

/**
 * Update existing service
 */
export const updateService = mutation({
  args: {
    id: v.id("services"),

    title: v.string(),
    description: v.array(v.string()),
    icon: v.optional(v.id("_storage")),
    thumbnail: v.optional(v.id("_storage")),
    altText: v.string(),
  },

  handler: async (ctx, args) => {
    const { id, ...data } = args;

    const service = await ctx.db.get(id);

    if (!service) {
      throw new Error("Service not found.");
    }

    const patchData: {
      title: string;
      description: string[];
      altText: string;
      icon?: typeof args.icon;
      thumbnail?: typeof args.thumbnail;
      updatedAt: number;
    } = {
      title: data.title,
      description: data.description,
      altText: data.altText,
      updatedAt: Date.now(),
    };

    if (data.icon !== undefined) {
      patchData.icon = data.icon;
    }

    if (data.thumbnail !== undefined) {
      patchData.thumbnail = data.thumbnail;
    }

    await ctx.db.patch(id, patchData);

    return id;
  },
});

/**
 * Delete service
 */
export const deleteService = mutation({
  args: {
    id: v.id("services"),
  },

  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.id);

    if (!service) {
      throw new Error("Service not found.");
    }

    if (service.thumbnail) {
      await ctx.storage.delete(service.thumbnail);
    }

    if (service.icon) {
      await ctx.storage.delete(service.icon);
    }

    await ctx.db.delete(args.id);

    return {
      success: true,
      message: "Service deleted successfully.",
    };
  },
});

export const reorderServices = mutation({
  args: {
    ids: v.array(v.id("services")),
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

export const upsertServicesSectionSettings = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("sectionSettings")
      .withIndex("by_key", (q) => q.eq("key", "services"))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("sectionSettings", {
      key: "services",
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});