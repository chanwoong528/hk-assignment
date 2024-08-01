const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize.sync();


let corOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/article", require("./app/controller/articleController.js"))
app.use("/api/order", require("./app/controller/orderController.js"))



// simple route
app.get("/", (req, res) => {
  res.json({ message: "HK_assignment" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}!`);
});