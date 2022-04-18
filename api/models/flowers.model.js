const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlowerSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  origin: { type: String, required: false },
},
{
  timestamps: true,
}
);

const Flower = mongoose.model("Flower", FlowerSchema);

module.exports = Flower;