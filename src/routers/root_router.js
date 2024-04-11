module.exports = (app) => {
  
  // 각자 사용할 router 정의

  // login 부분 router 정의
  const loginRouter = require("./login/login_router")(app);
  const bm_router = require("./board_main/bm_router");
  app.use("/board", bm_router);
  app.use("/login", loginRouter);
  // root경로의 router
  const router = require("express").Router();
  router.get("/", (req, res) => {
    res.render("root")
  })

  return router;
};
