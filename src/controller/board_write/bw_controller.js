const fs = require("fs");
const path = require("path");
const service = require("../../service/board_write/bw_service");

const logoPath = "../../../img/logo/banner_logo.png";
const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

/*
session.member = {
member_id, email , name, age , addr, phone, 
nickname, grade, login_type, id }

greade : 관리자:0 일반회원:1

login type : 일반:0 카카오:1 네이버:2
*/

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
    },
    cmtModify_form : async (req,res) => {
        const CId = req.params.CId;
        const MId = req.params.MId;
        let member = req.session.member;
        if(!member){
            res.json(0);
            return;
        }
        if(member.member_id !== MId){
            res.json(1);
            return;
        }
        const message = await service.boardRead.cmtmodify_form(CId);
        res.json(message)
    }
}

const board_Insert = {
    write : async (req, res) => {
        let member = req.session.member;
        const message = await service.boardInsert.write(
            req.body, req.file, req.fileValidation, member
        );
            res.json( message );
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
      
        const message = await service.boardUpdate.modify(req.body, req.file);

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
            fs.unlinkSync(`./upload_file/${Img}`)
            }catch(err){
                console.log(err)
            }
        }
    },
    cmtDelete : async (req, res) => {
        const CId = req.params.CId;
        const MId = req.params.MId;
        let member = req.session.member;
        if(!member){
            res.json(0);
            return;
        }
        if(member.member_id != MId){
            res.json(1);
            return;
        }
        const result = await service.boardDelete.cmtDelete(CId);
        if( result.rowsAffected === 1 ){
            res.json(2);
            return;
        }else{
            res.json(9);
            return;
        }
        

    }
}

module.exports = {board_views, board_Insert, board_Update, board_delete}