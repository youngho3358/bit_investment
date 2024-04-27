const service = require("../../service/market/market_service");
const fs = require("fs");
const path = require("path");


const views = {
    market_form : async (req, res) => {
        const logoPath = "../../../img/logo/banner_logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;
        
        const copyrightPath = "../../../img/logo/logo.png";
        const copyrightBase64 = fs.readFileSync(path.join(__dirname, copyrightPath), 'base64');
        const copyrightDataURI = `data:image/jpeg;base64,${copyrightBase64}`;

        const searchPath = "../../../img/main/search.png";
        const searchBase64 = fs.readFileSync(path.join(__dirname, searchPath), 'base64');
        const searchDataURI = `data:image/jpeg;base64,${searchBase64}`;
        
        let member = req.session.member;

        let coin_name = req.params.coin_name;
        let coin_info;
        if (coin_name) {
            coin_info = await service.views.coin_info(coin_name);
        }else{
            coin_info = await service.views.coin_info("KRW-BTC");
        }

        res.render("./market/market_form", {member : member, logoDataURI : logoDataURI, copyrightDataURI : copyrightDataURI, searchDataURI : searchDataURI, coin_name : coin_name, coin_info : coin_info});
    },
    market_coin_list : async (req, res) => {
        let data = await service.views.coin_insert();
        res.json(data);
    },
    
}

module.exports = {views};