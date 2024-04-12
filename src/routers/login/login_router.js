module.exports = (app) => {
    const router = require("express").Router();
    const loginCtrl = require("../../controller/login/login_controller");

    router.get("/", loginCtrl.views.login_input);
    router.get("/kakao_login", loginCtrl.views.kakaoLogin);
    
    // 홈페이지 자체 로그인 시 검증절차
    router.post("/loginCheck", loginCtrl.process.loginCheck);
    
    // 닉네임 중복체크
    router.post("/nicknameCheck", loginCtrl.process.nicknameCheck);

    // 카카오 회원정보 DB 등록
    router.post("/kakaoRegister", loginCtrl.process.kakaoRegister);

    return router;
}