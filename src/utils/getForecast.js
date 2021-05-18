const request = require("request");
const auth = require("./auth.js");

const getForecast = function (lat, longi, callback) {
  let url = `http://api.weatherstack.com/current?access_key=${auth.weatherPass}&query=${lat},${longi}`;

  request({ url, json: true }, (error, /*response*/ { body }) => {
    if (error) {
      callback("couldn't reach server!", undefined);
    } else {
      //if (response.body.error)
      if (body.error) {
        callback(`Error: ${body.error.code} , ${body.error.type}`, undefined);
      } else {
        callback(
          undefined,
          `It is currently ${body.current.temperature} degrees with a ${body.current.precip} % chance of precipitation.`
        );
      }
    }
  });
};

module.exports = getForecast;
