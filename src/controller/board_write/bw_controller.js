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

const logoPath = "../../../img/logo/banner_logo.png";
const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

const board_views = {
    writeForm : (req, res) => {

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
    },
    modify_form : async (req, res) => {
        const data = await service.boardRead.modify_form(req.params.BId);
       
        res.render("board_write/modify_form", {logoDataURI, data })
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

const board_Update = {
    modify : async (req,res) => {

        //const deleteFile = req.body.img;
      
        const message = await service.boardUpdate.modify(req.body, req.file);
        /*
        if(req.file !== undefined && message.result === 1) {
           this.file_process.delete(deleteFile);
        }
        */
        let data = req.body
        res.send(message.msg);
    }        
}

const board_delete = {
    delete : (req, res) => {
        board_delete.deleteImg(req.params.img);
        service.boardDelete.delete(req.params.BId);
        res.send(message.msg);
        res.redirect("/board")


    },
    deleteImg : (img) => {
        if(img !== 'non'){
            try{
            fs.unlinkSync(`./upload_file/${img}`)
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = {seMId, seNick, board_views, board_Insert, board_Update, board_delete}