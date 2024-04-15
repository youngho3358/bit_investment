module.exports = (app) => {
    const router = require("express").Router();
    const loginCtrl = require("../../controller/login/login_controller");

    router.get("/", loginCtrl.views.login_input);
    router.post("/kakao_login", loginCtrl.views.kakaoLogin);
    
    // 홈페이지 자체 로그인 시 검증절차
    router.post("/loginCheck", loginCtrl.process.loginCheck);
    
    // 닉네임 중복체크
    router.post("/nicknameCheck", loginCtrl.process.nicknameCheck);

    // 카카오톡 로그인 시 가입된 이메일 있는지 체크
    router.post("/emailCheck", loginCtrl.process.emailCheck);

    // 카카오 회원정보 DB 등록
    router.post("/kakaoRegister", loginCtrl.process.kakaoRegister);

    // 카카오 회원등록 성공 시 세션 발급 후 메인화면으로 redirect
    router.post("/success_kakao_login", loginCtrl.process.success_kakao_login);

    // 로그아웃
    router.get("/logout", loginCtrl.process.logout);

    // 유저 개인정보 확인
    router.get("/userInfo", loginCtrl.views.userInfo);

    return router;
}