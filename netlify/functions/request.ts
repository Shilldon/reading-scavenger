import type { Context, Config } from "@netlify/edge-functions";

export default async (req, context) => {
  return Response.json({
    "map":process.env.MAP,
    "supabase": process.env.SUPABASE,
    "site":process.env.SUPABASE_SITE
  });
};

export const config: Config = {
  path: "/json",
};