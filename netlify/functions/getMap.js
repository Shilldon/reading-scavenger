const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const { lat, lng } = JSON.parse(event.body);

  const response = await fetch(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};