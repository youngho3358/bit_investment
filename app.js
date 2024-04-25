const express = require("express");
const app = express();

const sessionConfig = require("./config/cookie_session/cookie_session_config");
const session = require("express-session");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session(sessionConfig.sessionConfig));

const router = require("./src/routers/root_router")(app);
app.use("/", router);

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("3000 서버 구동");
});