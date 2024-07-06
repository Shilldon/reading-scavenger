export default async (req, context) => {
  return new Response.json({
    "map":process.env.MAP,
    "supabase": process.env.SUPABASE,
    "site":process.env.SUPABASE_SITE
  });
};