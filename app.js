const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());

const router = require("./src/routers/root_router")(app);