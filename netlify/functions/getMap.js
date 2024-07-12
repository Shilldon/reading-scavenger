
import fetch from 'node-fetch';
exports.handler = async (event, context) => {
  const apiKey = process.env.MAP;
  const { lat, lng } = JSON.parse(event.body);

  //const response = await fetch(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`);
  //const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(apiKey),
  };
};