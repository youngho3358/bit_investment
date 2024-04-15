const service = require("../../service/register/register_service")
const fs = require("fs");
const path = require("path");

const views = {
    register_input : (req, res) => {
        const logoPath = "../../../img/logo/logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

        res.render("./register/register_input", {logoDataURI : logoDataURI});
    },
}

const process = {
    register_check : async (req, res) => {
        if (req.body.userId == "") {
            res.send(`<script>alert("아이디를 입력해주세요");location.href="/register"</script>`);
        }
        if (req.body.userPwd == "") {
            res.send(`<script>alert("비밀번호를 입력해주세요");location.href="/register"</script>`);
        }
        if (req.body.userPwdChk == "") {
            res.send(`<script>alert("비밀번호 재확인을 입력해주세요");location.href="/register"</script>`);
        }
        if (req.body.userName == "") {
            res.send(`<script>alert("이름을 입력해주세요");location.href="/register"</script>`);
        }
        if ((req.body.userPhone_1 == "") || (req.body.userPhone_2 == "") || (req.body.userPhone_3 == "")) {
            res.send(`<script>alert("휴대전화를 입력해주세요");location.href="/register"</script>`);
        }
        if ((req.body.userAge == "NaN") || (req.body.userAgeMonth == undefined) || (req.body.userAgeDay == undefined)) {
            res.send(`<script>alert("생년월일을 입력해주세요");location.href="/register"</script>`);
        }
        if (req.body.userGender == "") {
            res.send(`<script>alert("성별을 입력해주세요");location.href="/register"</script>`);
        }
        if ((req.body.userEmail_id == "")) {
            res.send(`<script>alert("이메일을 입력해주세요");location.href="/register"</script>`);
        }else{
            if ((req.body.userEmail_domain_auto != "type") || (req.body.userEmail_domain_write != "")) {
                //console.log("이메일 입력했구나!!")
            }else{
                res.send(`<script>alert("이메일을 입력해주세요");location.href="/register"</script>`);
            }
        }
        if (req.body.userNickname == "") {
            res.send(`<script>alert("닉네임을 입력해주세요");location.href="/register"</script>`);
        }

        let register_member = {};
        register_member.id = req.body.userId;
        register_member.pwd = req.body.userPwd;
        register_member.pwdChk = req.body.userPwdChk;
        register_member.name = req.body.userName;

        userPhone = (req.body.userPhone_1).concat(req.body.userPhone_2, req.body.userPhone_3);
        register_member.phone = userPhone;

        userAge = 2024 - parseFloat(req.body.userAge) + 1;
        register_member.age = userAge;

        register_member.month = req.body.userAgeMonth;
        register_member.day = req.body.userAgeDay;

        if (req.body.userEmail_domain_write == undefined) {
            userEmail = (req.body.userEmail_id).concat("@", req.body.userEmail_domain_auto);
        }else{
            userEmail = (req.body.userEmail_id).concat("@", req.body.userEmail_domain_write);
        }
        register_member.email = userEmail;

        register_member.nickname = req.body.userNickname;
        register_member.loginType = 1;
        register_member.grade = 1;

        // console.log(register_member);

        let result_id = await service.check.id_check(register_member.id);
        if (result_id == 1) {
            if (register_member.pwd == register_member.pwdChk) {
                let result_email = await service.check.email_check(register_member.email);
                if (result_email == 1) {
                    let result_nick = await service.check.nickname_check(register_member.nickname);
                    if (result_nick == 1) {
                        let result = await service.check.register_check(register_member);
                        if (result == 1) {
                            res.send(`<script>alert("회원가입이 완료되었습니다");location.href="/login"</script>`);
                        }else{
                            res.send(`<script>alert("회원가입을 실패하였습니다");location.href="/register"</script>`);
                        }
                    }else{
                        res.send(`<script>alert("닉네임 중복확인을 해주세요");location.href="/register"</script>`);
                    }
                }else{
                    res.send(`<script>alert("이메일 중복확인을 해주세요");location.href="/register"</script>`);
                }
            }else{
                res.send(`<script>alert("비밀번호를 확인해주세요");location.href="/register"</script>`);
            }
        }else{
            res.send(`<script>alert("아이디 중복확인을 해주세요");location.href="/register"</script>`);
        }
    },
    id_check : async (req, res) => {
        let userId = req.body.userId;
        let result = await service.check.id_check(userId);
        res.json(result);
    },
    nickname_check : async (req, res) => {
        let userNickname = req.body.userNickname;
        let result = await service.check.nickname_check(userNickname);
        res.json(result);
    },
    email_check : async (req, res) => {
        let userEmail = req.body.userEmail;
        let result = await service.check.email_check(userEmail);
        res.json(result);
    }
}

module.exports = {views, process};