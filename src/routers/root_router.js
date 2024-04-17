const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  
  // 각자 사용할 router 정의

  //게시판 메인 라우터
  const boardRouter = require("./board/board_router")
  app.use("/board", boardRouter)
  

  // login 부분 router 정의
  const loginRouter = require("./login/login_router")(app);
  const bm_router = require("./board_main/bm_router");
  app.use("/board", bm_router);
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
