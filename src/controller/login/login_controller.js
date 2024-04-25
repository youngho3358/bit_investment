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
            res.render("./login/user_info", {member, whitelogo});
        }else{
            res.send(`<script>
                        alert("로그인 정보가 없습니다.");
                        location.href = "/";
                        </script>`);
            return;
        }
    },
    changeNickname : (req, res) => {
        if(req.session.member){
            let member = req.session.member;
            res.render("./login/change_nickname", {member, whitelogo});
        }else{
            res.send(`<script>
                        alert("로그인 정보가 없습니다.");
                        location.href = "/";
                        </script>`);
            return;
        }
    },
    editInfoForm : (req, res) => {
        if(req.session.member){
            let member = req.session.member;
            res.render("./login/edit_info_form", {member, whitelogo});
        }else{
            res.send(`<script>
                        alert("로그인 정보가 없습니다.");
                        location.href = "/";
                        </script>`);
            return;
        }
    },
    find : (req, res) => {
        let type = req.query.type;
        res.render("./login/find", {type, whitelogo});
    },
    changePwdForm : (req, res) => {
        if(req.session.member){
            let member = req.session.member;
            res.render("./login/change_pwd_form", {member, whitelogo});
            return;
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
                id : result.ID,
                money : result.MONEY
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
        req.session.member = req.body;
        res.redirect("/")
    },
    logout : (req, res) => {
        // 세션 삭제 후 루트 위치로 이동
        req.session.destroy();
        res.redirect("/");
    },
    deleteId : (req, res) => {
        let nickname = req.session.member.nickname;
        res.send(`<script>if(confirm("${nickname} 님 회원탈퇴를 진행하시겠습니까?")){
            location.href = "/login/deleteMember"
        }else{
            location.href = "/login/userInfo"
        };</script>`);
    },
    deleteMember : async (req, res) => {
        let member_id = req.session.member.member_id;
        // 성공 시 1 반환, 실패 시 promise 반환
        let result = await service.deleteMember.deleteMember(member_id);
        if(result === 1){
            res.send(`
                        <script>alert("회원 삭제가 완료되었습니다.");
                            location.href = "/login/logout";
                        </script>
                    `)
        }else{
            res.send(`
                        <script>alert("회원 삭제를 실패하였습니다.");
                            location.href = "/login/userInfo";
                        </script>
                    `)
        }

    },
    changeNickname : async (req, res) => {
        // 전달받은 변경 닉네임과 기존 닉네임
        let changeNickname = req.body.nickname;
        let originNickname = req.body.originNickname;

        // 성공 시 1 반환, 실패 시 promise 반환
        let result = await service.register.changeNickname(changeNickname, originNickname);
        console.log(result);

        if(result === 1){
            req.session.member.nickname = changeNickname;
            res.send(`
                        <script>alert("닉네임 변경 성공");
                            location.href = "/login/change_nickname";
                        </script>
                    `)
        }else{
            res.send(`
                        <script>alert("닉네임 변경을 실패하였습니다.");
                            location.href = "/";
                        </script>
                    `)
        }
    },
    changePhone : async (req, res) => {
        let changePhone = req.body.changePhone;
        let memberId = req.session.member.member_id;

        // 성공 시 1 반환, 실패 시 promise 반환
        let result = await service.register.changePhone(changePhone, memberId);
        if(result == 1){
            req.session.member.phone = changePhone;
        }
        res.json(result);
    },
    changeEmail : async (req, res) => {
        let changeEmail = req.body.changeEmail;
        let memberId = req.session.member.member_id;

        // 성공 시 1 반환, 실패 시 promise 반환
        let result = await service.register.changeEmail(changeEmail, memberId);
        if(result == 1){
            req.session.member.email = changeEmail;
            return;
        }
        res.json(result);
    },
    findId : async (req, res) => {
        let email = req.body.email;
        let result = await service.find.id(email);
        res.json(result);
    },
    findPwd : async (req, res) => {
        let id = req.body.id;
        let email = req.body.email;
        let result = await service.find.pwd(id, email);
        res.json(result);
    },
    changePwd : async (req, res) => {
        let changePassword = req.body.changePassword;
        let member_id = req.session.member.member_id;
        
        let result = await service.register.changePassword(member_id, changePassword);
        // 성공 시 1 반환, 실패 시 promise 반환
        if(result == 1){
            req.session.destroy();
            res.json(result);
            return;
        }
        res.json(result);
    }
}

module.exports = {views, process};