export default async (req, context) => {
  return new Response({
    value: "Hello, world!"
  });
};