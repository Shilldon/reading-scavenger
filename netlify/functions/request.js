export default async (req, context) => {
  return new Response({
    "map":process.env.MAP,
    "site":process.env.SUPABASE
  });
};