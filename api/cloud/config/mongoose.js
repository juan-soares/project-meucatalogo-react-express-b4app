const mongoose = require("mongoose");

//Deixar comentado quando for fazer deploy p/ b4pp
require("dotenv").config();


mongoose
  .connect(
    process.env.DATABASE_URL
  )
  .then(() => console.log("Database Ok!"))
  .catch((e) => console.log(e));
