export default async (req, context) => {
  return new Response([process.env.MAP,process.env.SUPABASE]);
};