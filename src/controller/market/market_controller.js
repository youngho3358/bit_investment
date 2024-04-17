const fs = require("fs");
const path = require("path");

const views = {
    market_form : (req, res) => {
        const logoPath = "../../../img/logo/banner_logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;
        
        const copyrightPath = "../../../img/logo/logo.png";
        const copyrightBase64 = fs.readFileSync(path.join(__dirname, copyrightPath), 'base64');
        const copyrightDataURI = `data:image/jpeg;base64,${copyrightBase64}`;
        
        console.log("세션 : ", req.session.member);
        let member = req.session.member;
        
        res.render("./market/market_form", {member : member, logoDataURI : logoDataURI, copyrightDataURI : copyrightDataURI});
    }
}

module.exports = {views};