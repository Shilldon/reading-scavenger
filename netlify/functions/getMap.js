// netlify/functions/getMapData.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  const { lat, lng } = JSON.parse(event.body);

  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
