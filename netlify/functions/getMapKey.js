exports.handler = async (event, context) => {
    const apiKey = process.env.MAP;
  
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey }),
    };
  };