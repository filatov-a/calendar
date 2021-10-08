const express = require("express");
const app = express();

const bodyParser = require('body-parser')
const config = require('./config/project');

const routes = require("./routes/main.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/", routes);

app.listen(config.app.port, () => {
  console.log(`Example app listening at http://localhost:${config.app.port}`)
});
