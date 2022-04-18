const express = require("express");
const Flower = require("../models/flowers.model");
const router = express.Router();
const { upload, uploadToCloudinary } =require("../../middlewares/file.middleware")
const {isAuth} = require("../../middlewares/auth.middleware")

router.get("/", async (req, res, next) => {
  try {
    const flowers = await Flower.find();
    return res.status(200).json(flowers);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
 console.log(req.params.id);
  try {
    const flowers = await Flower.findById(req.params.id);
    return res.status(200).json(flowers);
  } catch (error) {
    return next(error);
  }
});

router.post("/", [upload.single('image'), uploadToCloudinary], async (req, res, next) => {
  try {
    console.log(req.body.name);
    console.log(req.file_url);
    console.log(req.body.origin);
    const newFlower = new Flower({
      name: req.body.name,
      image: req.file_url,
      origin: req.body.origin,
    });

    const createdFlower = await newFlower.save();
    return res.status(201).json(createdFlower);
  } catch (error) {
    next(error);
  }
});


router.post("/newFlower", async (req, res, next) => {
  console.log('newFlower');
  try {
      const newFlower = new Flower({
      name: req.body.name,
      image: req.body.image,
      origin: req.body.origin,
    });
    
    const createdFlower = await newFlower.save();
    return res.status(201).json(createdFlower);
  } catch (error) {
    next(error);
  }
});

   router.put('/:id', async (req, res, next) => {
      try {
          const { id } = req.params //Recuperamos el id de la url
          const flowerModify = new Flower(req.body) //instanciamos un nuevo Character con la información del body
          flowerModify._id = id //añadimos la propiedad _id al personaje creado
          const flowerUpdated = await Flower.findByIdAndUpdate(id , flowerModify, { new: true })
          return res.status(200).json(flowerUpdated)//Este personaje que devolvemos es el anterior a su modificación
      } catch (error) {
          return next(error)
      }
    });



router.get("/searchByName/:name", async (req, res) => {
  const { name } = req.params;

  try {
    const flowerByName = await Flower.find({ name });
    return res.status(200).json(flowerByName);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/searchByOrigin/:origin", async (req, res) => {
  const { origin } = req.params;

  try {
    const flowerByOrigin = await Flower.find({ origin });
    return res.status(200).json(flowerByOrigin);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
      const {id} = req.params;
      // No será necesaria asignar el resultado a una variable ya que vamos a eliminarlo
      await Flower.findByIdAndDelete(id);
      return res.status(200).json('Flower deleted!');
  } catch (error) {
      return next(error);
  }
});

module.exports = router;