const fs = require("fs");
const path = require("path");
const service = require("../../service/board_write/bw_service");


/*
session
addr , age , email , grade , id , login_type , 
member_id , name , nickname , phone
*/
const seMId = 9;
const seNick = "일평";

const board_views = {
    writeForm : (req, res) => {
        const logoPath = "../../../img/logo/banner_logo.png";
        const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
        const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

        /*
        const session = req.session;
        const ID = req.session.userId;
        const msg = service.sessionCheck( session );
        if( msg !== 0 ){
            return res.send( msg );
        }, ID : session.id
        */

        res.render("board_write/write_form",
            {logoDataURI, seNick});
    }
}
const board_Insert = {
    write : async (req, res) => {
        const msg = await service.boardInsert.write(
            req.body, req.file, req.fileValidation
        );
        res.send( msg );
    }
    
}

module.exports = {seMId, seNick, board_views, board_Insert}