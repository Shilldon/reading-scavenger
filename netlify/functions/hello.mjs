/*
export default async (req, context) => {
    return new Response("Hello, world!");
  };
  */

  export const handler = async () => {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Hello World!',
      }),
    }
  }