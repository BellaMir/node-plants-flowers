const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoDB = process.env.mongo_DB;

const connect = async () => {
  try {
    const DB = await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const {name, host} = DB.connection;
    
    console.log(`Connected to ${name} DB in host ${host}`);
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = {connect}