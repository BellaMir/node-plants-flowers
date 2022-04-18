const mongoose = require("mongoose");
const Flower = require("../models/flowers.model");

const flowersJson = [
  {
    name: "Orquídea",
    image:
      "https://media.admagazine.com/photos/618a616c8124d089603b1cb7/master/w_1600%2Cc_limit/85878.jpg",
    origin: "Venezuela",
  },
  {
    name: "Rosa",
    image:
      "https://www.jardineriaon.com/wp-content/uploads/2015/10/rosa-te.jpg",
    origin: "Francia",
  },
  {
    name: "Tuplipan",
    image:
      "https://blog.gardencenterejea.com/wp-content/uploads/2019/08/Cuidados-tulipanes.jpg",
    origin: "Tokyo",
  },
];

const cadaUnoDeLosFlowers = flowersJson.map(
  (flower) => new Flower(flower)
);

mongoose
  .connect(`mongodb+srv://BellaMir:Bolita2122!@cluster0.gqnsw.mongodb.net/cuarto_servi?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allFlowers = await Flower.find();
    if (allFlowers.length) {
      await Flower.collection.drop();
    }
  })
  .catch((err) => console.log("Error deleting monsters", err))
  .then(async () => {
      await Flower.insertMany(cadaUnoDeLosFlowers);
      console.log("Ya tienes las flores en la DB")
  }).catch((err) => console.log("No puedes crear las flores", err))
  .finally(() => mongoose.disconnect());