const express = require("express");
const app = express();


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

const router = require("./src/routers/root_router")(app);
app.use("/", router);


app.set("views", "./src/views");
app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("3000 서버 구동");
});
