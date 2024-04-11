module.exports = (app) => {
    const router = require("express").Router();
    const loginCtrl = require("../../controller/login/login_controller");

    router.get("/", loginCtrl.views.login_input);
    router.post("/loginCheck", loginCtrl.process.loginCheck);
    router.get("/kakao_login", loginCtrl.process.kakaoLogin);

    return router;
}