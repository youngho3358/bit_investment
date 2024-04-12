const service = require("../../service/register/register_service")
const fs = require("fs");
const path = require("path");

const views = {
    register_input : (req, res) => {
        // 로고 이미지 사용
        const logoPath = "../../../img/logo/logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

        res.render("./register/register_input", {logoDataURI : logoDataURI});
    },
}

const process = {
    register_check : (req, res) => {
        const asdf = req.body;
        console.log(asdf);
        //console.log(asdf.userPhone_1);

        res.json(asdf);
    },
    id_check : async (req, res) => {
        console.log(req.body);
        let userId = req.body.userId;
        console.log("asdfasdf : ", userId);
        let result = await service.check.id_check(userId);
        res.json(result);
    }
}

module.exports = {views, process};