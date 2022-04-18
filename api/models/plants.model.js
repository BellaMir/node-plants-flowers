const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  origin: { type: String, required: false },
  //Flower viene de AQUÍ ---> const Flower = require("../models/flowers.model");
  flowerss: [{ type: mongoose.Types.ObjectId, ref: 'Flower', required: false }],
},
{
  timestamps: true,
}
);

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;