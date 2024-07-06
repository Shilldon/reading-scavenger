export default async (req, context) => {
  return new Response(process.env);
};