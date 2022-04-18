const express = require("express");
const Plant = require("../models/plants.model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const plants = await Plant.find().populate('flowerss');
    return res.status(200).json(plants);
  } catch (error) {
    return next(error);
  }
});

router.get("/searchByName/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const plantByName = await Plant.find({ name });
    return res.status(200).json(plantByName);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/searchByOrigin/:origin", async (req, res) => {
  const { origin } = req.params;

  try {
    const plantByOrigin = await Plant.find({ origin });
    return res.status(200).json(plantByOrigin);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/newPlant", async (req, res, next) => {
  try {
    const newPlant = new Plant({
      name: req.body.name,
      image: req.body.image,
      origin: req.body.origin,
    });

    const createdPlant = await newPlant.save();
    return res.status(201).json(createdPlant);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
      const {id} = req.params;
      // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
      await Plant.findByIdAndDelete(id);
      return res.status(200).json('Plant deleted!');
  } catch (error) {
      return next(error);
  }
});

// router.put('/add-flower', async (req, res, next) => {
//   try {
//       const { plantId } = req.body;
//       const { flowerId } = req.body;
//       const updatedPlant = await Plant.findByIdAndUpdate(
//           plantId,
//           { $push: { flowerss: flowerId } },
//           { new: true }
//       );
//       return res.status(200).json(updatedPlant);
//   } catch (error) {
//       return next(error);
//   }
// });

//   router.put('/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params //Recuperamos el id de la url
//         const plantModify = new Plant(req.body) //instanciamos un nuevo Character con la información del body
//         plantModify._id = id //añadimos la propiedad _id al personaje creado
//         const plantUpdated = await Plant.findByIdAndUpdate(id , plantModify, { new: true })
//         return res.status(200).json(plantUpdated)//Este personaje que devolvemos es el anterior a su modificación
//     } catch (error) {
//         return next(error)
//     }
//   });

router.post('/create', async (req, res, next) => {
  try {
    const newPlant = new Plant({
      name: req.body.name,
      image: req.body.image,
      origin: req.body.origin,
      flowerss: req.body.flowerss
    });
      const createdPlant = await newPlant.save();
      return res.status(201).json(createdPlant);
  } catch (error) {
      next(error);
  }
});



module.exports = router;