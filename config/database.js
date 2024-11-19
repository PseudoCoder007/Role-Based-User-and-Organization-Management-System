const mongoose = require("mongoose");
const dotenv = require("dotenv");

mongoose.set("strictQuery", false);
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;


mongoose
  .connect(`${MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection is successful with database: ${MONGO_URL}.`);
  })
  .catch((e) => {
    console.error("Could not connect with the database:", e);
  });
