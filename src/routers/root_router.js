module.exports = (app) => {
  
  // 각자 사용할 router 정의

  // login 부분 router 정의
  const loginRouter = require("./login/login_router")(app);
  app.use("/login", loginRouter);

  // root경로의 router
  const router = require("express").Router();
  router.get("/", (req, res) => {
    res.render("root")
  })

  return router;
};
