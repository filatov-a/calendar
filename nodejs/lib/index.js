const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const config = require("./config/project");

const routes = require("./routes/main.js");

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use("/", routes);

app.listen(config.app.port, () => {
	console.log(`Example app listening at http://localhost:${config.app.port}`);
});
