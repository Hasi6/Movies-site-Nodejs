const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

module.exports = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log("Connected to the Database");
  } catch (err) {
    console.log(err.message);
    //Exit prosee with failuer

    process.exit(1);
  }
};

