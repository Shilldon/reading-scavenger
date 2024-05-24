/*
export default async (req, context) => {
    return new Response("Hello, world!");
  };
  */

  exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'World'
    return {
        statusCode: 200,
        body: `Hello ${subject}!`,
    }
}