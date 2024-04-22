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

    // 로그아웃 || 세션 삭제
    router.get("/logout", loginCtrl.process.logout);

    // 유저 개인정보 확인
    router.get("/userInfo", loginCtrl.views.userInfo);

    // 계정 삭제 확인 문구 출력
    router.get("/delete_id", loginCtrl.process.deleteId);

    // 계정 삭제
    router.get("/deleteMember", loginCtrl.process.deleteMember);

    // 닉네임 변경 화면 출력
    router.get("/change_nickname", loginCtrl.views.changeNickname);

    // 닉네임 변경
    router.post("/change_nickname_submit", loginCtrl.process.changeNickname);

    // 회원정보 수정 화면 출력
    router.get("/edit_info_form", loginCtrl.views.editInfoForm);

    // 전화번호 변경
    router.post("/change_phone", loginCtrl.process.changePhone);

    // 이메일 변경
    router.post("/change_email", loginCtrl.process.changeEmail);

    // 아이디 비밀번호 찾기
    router.get("/find", loginCtrl.views.find);

    // 아이디 찾기
    router.post("/find_id", loginCtrl.process.findId);
    
    // 비밀번호 찾기
    router.post("/find_pwd", loginCtrl.process.findPwd);

    // 비밀번호 변경 화면 출력
    router.get("/change_pwd_form", loginCtrl.views.changePwdForm);

    // 비밀번호 변경
    router.post("/change_pwd", loginCtrl.process.changePwd);

    return router;
}