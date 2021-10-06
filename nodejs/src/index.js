const express = require("express");
const app = express();
const port = 5000;

const routes = require("./routes/main.js");

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
