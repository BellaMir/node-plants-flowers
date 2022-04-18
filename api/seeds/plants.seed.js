const mongoose = require("mongoose");
const Plant = require("../models/plants.model");

const plantsJson = [
  {
    name: "Ornamental",
    image:
      "https://agriculturers.com/wp-content/uploads/2020/06/Como-se-clasifican-las-plantas-1000x500.jpg",
    origin: "China",
  },
  {
    name: "Trepadoras",
    image:
      "https://www.ambientum.com/wp-content/uploads/2019/06/plantas-cyclamen-696x453.jpg",
    origin: "Pakistán",
  },
  {
    name: "Interior",
    image:
      "https://blog.gardencenterejea.com/wp-content/uploads/2019/08/Cuidados-tulipanes.jpg",
    origin: "Colombia",
  },
];

const cadaUnoDeLosPlants = plantsJson.map(
  (plant) => new Plant(plant)
);

mongoose
  .connect(`mongodb+srv://BellaMir:Bolita2122!@cluster0.gqnsw.mongodb.net/cuarto_servi?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allPlants = await Plant.find();
    if (allPlants.length) {
      await Plant.collection.drop();
    }
  })
  .catch((err) => console.log("Error deleting plantas", err))
  .then(async () => {
      await Plant.insertMany(cadaUnoDeLosPlants);
      console.log("Ya tienes las plantas en la DB")
  }).catch((err) => console.log("No puedes crear las plantas", err))
  .finally(() => mongoose.disconnect());