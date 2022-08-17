const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes.js");
const app = express();
const port = process.env.PORT;

//cors policy
app.use(cors());

//json
app.use(express.json());

//for Loading Routes
app.use("/user", userRoutes);
 

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
