export default async (request, context) => {
    const value = Netlify.env.get("MAP");
    return new Response(`Value of MY_IMPORTANT_VARIABLE for ${context.site.name} is ${value}.`, {
      headers: { "content-type": "text/html" },
    });
  };