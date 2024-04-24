const fs = require("fs");
const path = require("path");
const service = require("../../service/board_write/bw_service");


/*
session
addr , age , email , grade , id , login_type , 
member_id , name , nickname , phone

greade : 관리자>0 일반회원>1

login type : 일반>0 카카오>1 네이버>2
*/
const logoPath = "../../../img/logo/banner_logo.png";
const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;



const board_views = {
    writeForm : (req, res) => {
        
        let member = req.session.member;
       
        const msg = service.sessionCheck( member );
        if( msg !== 0 ){
            return res.send( msg );
        }
        res.render("board_write/write_form",
            {logoDataURI, member});
        
    },
    modify_form : async (req, res) => {
        const BId = req.params.BId;
        let member = req.session.member;
       
        const msg2 = service.modifyCheck( member, BId );
        if( msg2 !== 1 ){
            return res.send( msg2 );
        }
        const data = await service.boardRead.modify_form(BId);
       
        res.render("board_write/modify_form", {logoDataURI, data })
    }
}

const board_Insert = {
    write : async (req, res) => {
        let member = req.session.member;
        console.log("ctrl member? : ", member);
        const message = await service.boardInsert.write(
            req.body, req.file, req.fileValidation, member
        );
            res.json( message);
    } ,
    
    cmtRegister : async (req,res) => {
        const BId = req.params.BId;
        let member = req.session.member;
        let comment = req.body.comment;
        if(!member){
            res.json(0);
            return;
        }

        const result = await service.boardInsert.cmtRegister(comment, member, BId);
        res.json(result);
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
        res.send(message.msg);
    }

    }       


const board_delete = {
    delete : (req, res) => {
        let member = req.session.member;
       
        const msg = service.sessionCheck( member );
        if( msg !== 0 ){
            return res.send( msg );
        }

        board_delete.deleteImg(req.params.Img);
        const message = service.boardDelete.delete(req.params.BId);
        res.send(message.msg);



    },
    deleteImg : (Img) => {
        console.log("이미지 삭제 가동")
        if(Img !== 'non'){
            try{
                console.log("이미지 이름 : ", Img)
            fs.unlinkSync(`./upload_file/${Img}`)
            }catch(err){
                console.log(err)
            }
        }
    }
}

module.exports = {board_views, board_Insert, board_Update, board_delete}