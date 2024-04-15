const service = require("../../service/login/login_service")
const fs = require("fs");
const path = require("path");


// 흰 로고
const whitelogoPath = "../../../img/logo/banner_logo.png";
const whitelogoBase64 = fs.readFileSync(path.join(__dirname, whitelogoPath), 'base64');
const whitelogo = `data:image/jpeg;base64,${whitelogoBase64}`;

// 로고 이미지 사용
const blacklogoPath = "../../../img/logo/logo.png";
const blacklogoBase64 = fs.readFileSync(path.join(__dirname, blacklogoPath), 'base64');
const blacklogo = `data:image/jpeg;base64,${blacklogoBase64}`;

const views = {
    login_input : (req, res) => {
        if(req.session.member){
            res.send(`<script>
                        alert("이미 로그인되어 있습니다.");
                        location.href = "/";
                        </script>`);
            return;
        }

        // 카카오 로그인 이미지 사용
        const kakao_loginPath = "../../../img/login/kakao_login.png";
        const kakao_loginBase64 = fs.readFileSync(path.join(__dirname, kakao_loginPath), 'base64');
        const kakao_loginDataURI = `data:image/jpeg;base64,${kakao_loginBase64}`;

        // 네이버 로그인 이미지 사용
        const naver_loginPath = "../../../img/login/naver_login.png";
        const naver_loginBase64 = fs.readFileSync(path.join(__dirname, naver_loginPath), 'base64');
        const naver_loginDataURI = `data:image/jpeg;base64,${naver_loginBase64}`;

        res.render("./login/login_input", {blacklogo, kakao_loginDataURI, naver_loginDataURI});
    },
    kakaoLogin : (req, res) => {
        // 카카오 email 값 전달
        let email = req.body.email;

        res.render("./login/kakao_login", {email, blacklogo});
    },
    userInfo : (req, res) => {
        if(req.session.member){
            let member = req.session.member;
            console.log(req.session.member);
            res.render("./login/user_info", {member, whitelogo});
        }else{
            res.send(`<script>
                        alert("로그인 정보가 없습니다.");
                        location.href = "/";
                        </script>`);
            return;
        }
    }
}

const process = {
    loginCheck : async (req, res) => {
        let result = await service.memberCheck.loginCheck(req.body);
        if(result){
            let member = {
                member_id : result.MEMBER_ID,
                email : result.EMAIL,
                name : result.NAME,
                age : result.AGE,
                addr : result.ADDR,
                phone : result.PHONE,
                nickname : result.NICKNAME,
                grade : result.GRADE,
                login_type : result.LOGIN_TYPE,
                id : result.ID
            }
            req.session.member = member;
            res.redirect("/");
            return;
        }
        res.send(`<script>alert("로그인 정보를 확인하세요"); location.href="/login";</script>`)
    },
    nicknameCheck : async (req, res) => {
        let inputNickname = req.body.nickname;
        let result = await service.duplicationCheck.nicknameCheck(inputNickname);
        // 아이디가 존재할 시 result : 1
        // 아이디가 존재하지 않을시 result : 0
        res.json(result);
    },
    emailCheck : async (req, res) => {
        let email = req.body.email;
        let result = await service.duplicationCheck.emailCheck(email);
        // 닉네임이 존재할 시 테이블의 정보가 담긴 result 반환
        res.json(result);
    },
    kakaoRegister : async (req, res) => {
        let email = req.body.email;
        let nickname = req.body.nickname;

        let result = await service.register.kakaoRegister(email, nickname);
        res.json(result);
    },
    success_kakao_login : (req, res) => {
        // 카카오 로그인 성공 후 세션 발급하여 루트 위치로 이동
        console.log(req.body);
        req.session.member = req.body;
        res.redirect("/")
    },
    logout : (req, res) => {
        // 세션 삭제 후 루트 위치로 이동
        req.session.destroy();
        res.redirect("/");
    }
}

module.exports = {views, process};