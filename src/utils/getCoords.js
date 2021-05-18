const request = require("request");
const auth = require("./auth.js");

const getCoords = function (address, callback) {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${auth.geoPass}`;

  request({ url: geoUrl, json: true }, (error, { body }) => {
    if (error) {
      callback("couldn't reach server to look up places", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Please enter a valid url or look up the query string for any invalid info entered!",
        undefined
      );
    } else
      callback(undefined, {
        lat: body.features[0].center[1], //lat:response.body.features[0].center[1],
        longi: body.features[0].center[0],
        place: body.features[0].place_name,
      });
  });
};

module.exports = getCoords;
