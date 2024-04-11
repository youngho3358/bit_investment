const service = require("../../service/login/login_service")
const fs = require("fs");
const path = require("path");

const views = {
    login_input : (req, res) => {
        // 로고 이미지 사용
        const logoPath = "../../../img/logo/logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

        // 카카오 로그인 이미지 사용
        const kakao_loginPath = "../../../img/login/kakao_login.png";
        const kakao_loginBase64 = fs.readFileSync(path.join(__dirname, kakao_loginPath), 'base64');
        const kakao_loginDataURI = `data:image/jpeg;base64,${kakao_loginBase64}`;

        res.render("./login/login_input", {logoDataURI : logoDataURI, kakao_loginDataURI : kakao_loginDataURI});
    },

}

const process = {
    loginCheck : async (req, res) => {
        let result = await service.memberCheck.loginCheck(req.body);
        console.log(result);
        if(result == undefined){
            res.send(`<script>alert("로그인 정보를 확인하세요"); location.href="/login";</script>`)
        }
        res.send("로그인 이후부터 구현해야 함");
    }
}

module.exports = {views, process};