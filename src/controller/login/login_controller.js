const service = require("../../service/login/login_service");

const views = {
    login_input : (req, res) => {
        res.render("./login/login_input");
    }
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