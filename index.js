const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const {connect} = require("./config/db");
const path = require('path');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'bolita2122', 
  api_key: '545567842977346', 
  api_secret: 'rM94HAGK_VwoOmfRvHG_DJfpoYg' 
});

const plantsRoutes = require("./api/routes/plants.routes");
const flowersRoutes = require("./api/routes/flowers.routes");
const usersRoutes = require("./api/routes/users.routes");


const server = express();
connect();
const PORT = 5000;
//HEADERS-CABECERAS
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

//CORS
server.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

//DEFINO LA SECRETKEY
server.set("secretKey", "supercalifragilisticuespialodoso");  

//USO EL LOGGER
server.use(logger("dev"));


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/plants", plantsRoutes);
server.use("/flowers", flowersRoutes);
server.use("/users", usersRoutes);


server.listen(PORT,()=> {
    console.log(`Server listening on http://localhost:${PORT}`)
})