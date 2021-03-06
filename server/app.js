const express = require("express");
const axios = require("axios");
const app = express();
const ART_API = "https://www.thecocktaildb.com/api/json/v1/1";

const INGREDIENTS = [
  {
    name: "Vodka",
    id: "Vodka",
    image: "https://www.thecocktaildb.com/images/ingredients/vodka-Small.png",
  },
  {
    name: "Gin",
    id: "Gin",
    image: "https://www.thecocktaildb.com/images/ingredients/gin-Small.png",
  },
];

const cocktailConvertor = (cocktail) => ({
  name: cocktail.strDrink,
  image: cocktail.strDrinkThumb,
  id: cocktail.idDrink,
})

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/ingredients", async (req, res) => {
  return res.json(INGREDIENTS);
});

app.get("/api/cocktails", async (req, res) => {
  const {
    data: { drinks: cocktails },
  } = await axios.get(`${ART_API}/filter.php?i=${req.query.ingredient}`);
  console.log("cocktails", cocktails);
  res.send(cocktails.map(cocktail => cocktailConvertor(cocktail)));
});

app.get("/api/cocktails/:cocktailId", async (req, res) => {
  const {
    data: {
      drinks: [cocktail],
    },
  } = await axios.get(`${ART_API}/lookup.php?i=${req.params.cocktailId}`);
  console.log("cocktail:", cocktail);
  res.send(cocktail);
});

module.exports = app;
