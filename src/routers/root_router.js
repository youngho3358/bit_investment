const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  
  // 각자 사용할 router 정의

  // login 부분 router 정의
  const loginRouter = require("./login/login_router")(app);
  app.use("/login", loginRouter);

  // root경로의 router
  const router = require("express").Router();
  router.get("/", (req, res) => {
    const logoPath = "../../img/logo/banner_logo.png";
    const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
    const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

    res.render("root", {logoDataURI})
  })

  return router;
};
