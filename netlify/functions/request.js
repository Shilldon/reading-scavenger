export default async (req, context) => {
  return new Response(JSON.stringify({
    "map":process.env.GOOGLE_MAPS_API_KEY,
    "supabase": process.env.SUPABASE,
    "site":process.env.SUPABASE_SITE
  }));
};