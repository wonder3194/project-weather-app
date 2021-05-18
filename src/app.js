const path = require("path");
const express = require("express");
const hbs = require("hbs");

const getCoords = require("./utils/getCoords");
const getForecast = require("./utils/getForecast");

const app = express();

//express path config
const pathVar = path.join(__dirname, "..", "/public");
const partialsPath = path.join(__dirname, "../templates/partials");
const viewsPath = path.join(__dirname, "../templates/views");

app.use(express.static(pathVar));

//set handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.get("", (req, res) => res.render("index", { title: "Weather app" }));

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About this site" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address query field must be provided",
    });
  }
  getCoords(req.query.address, (error, { lat, longi, place } = {}) => {
    if (error) {
      return res.send({ error });
    }

    getForecast(lat, longi, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: data,
        place,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) =>
  res.render("error", { errorMsg: "Help article not found!" })
);

app.get("*", (req, res) =>
  res.render("error", { errorMsg: "Page not found!" })
);

app.listen("3000", () => console.log("Server's up and running..."));
