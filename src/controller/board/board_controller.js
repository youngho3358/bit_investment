const fs = require("fs");
const path = require("path");

const board_views = {
    list : (req, res) => {
        const logoPath = "../../../img/logo/banner_logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;
        res.render("board/list",{logoDataURI});
    }
}

module.exports = {board_views}