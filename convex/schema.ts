import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  portfolio: defineTable({
    section: v.string(),
    content: v.string(),
    lastUpdated: v.number(),
  }).index("by_section", ["section"]),
  
  terminalLogs: defineTable({
    command: v.string(),
    output: v.string(),
    timestamp: v.number(),
    user: v.string(),
  }).index("by_timestamp", ["timestamp"]),

  contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    timestamp: v.number(),
    status: v.string(), // "new", "read", "responded"
  }).index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
