const dao = require("../../database/board_write/bw_dao");
const con = require("../../database/root_dao");

const sessionCheck = (member) => {
    if( !member || !member.id ){
        msg = "로그인이 필요합니다";
        url = "/login";
        return getMessage(msg, url);
    }
    return 0;
}
const modifyCheck = (member, BId) => {
    if( !member || !member.id ){
        msg = "로그인이 필요합니다";
        url = "/login";
        return getMessage(msg, url);
    }
    const result = dao.boardCheck.modifyCheck(member, BId)

    if(result != 0)
        return 1;
    return 0;
}

const getMessage = (msg, url) => {
    return `<script>
        alert('${msg}');
        location.href="${url}";
    </script>`;
}

const timeModify = (list) => {
    list = list.map((data)=>{
        data.SAVE_DATE = data.SAVE_DATE.toLocaleString();
        return data; 
    })
    return list;
}
const boardRead = {
    modify_form : async (BId) => {
        let data = await dao.boardRead.modify_form(BId);

        //data = timeModify(data.rows);
        return data;
    },
    cmtmodify_form : async (CId)=>{
        const result = await dao.boardRead.cmtmodify_form(CId);
        return result;
    }
}
const boardInsert = {
    write : async (body, file, fileValidation, member) => {
    
        let msg, url;
        let message = {}; 

        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form";
            return getMessage(msg, url);
        }
        if( file !== undefined ){
            body.img = file.filename;
        }else{
            body.img  = "non";
        }

        if(body.category == 5){
           msg = '카테고리를 선택해주세요';
           url = "/board/write_form"

            message.msg = msg;
            message.url = url;
            return message;
        }
        if(body.category == 1){
            if(member.gread != 0)
            msg = '공지는 관리자 계정만 작성할 수 있습니다';
            url = "/board/write_form"
 
             message.msg = msg;
             message.url = url;
             return message;
         }
        if(body.title == ''){
            msg = '제목을 입력해주세요';
            url = "/board/write_form"

            message.msg = msg;
            message.url = url;
             return message;
        }
        if(body.content == ''){
            msg = '내용을 입력해주세요';
            url = "/board/write_form"

            message.msg = msg;
            message.url = url;
            return message;      
        }
  
        const result = await dao.boardInsert.write( body, member );

        message.result = result.rowsAffected;
        if( result.rowsAffected === 1 ){
            msg = "등록되었습니다!!!";
            url = "/board";

        }else{
            msg = "문제 발생!!!";
            url = "/board/write_form";
        }
        message.msg = msg;
        message.url = url;
        return message;
    },
    cmtRegister : async (comment, member, BId) => {
        const result = await dao.boardInsert.cmtRegister(comment, member, BId);

        if( result.rowsAffected === 1 ){
            return 1;
        }else{
            return 2;
        }
    }
}

const boardUpdate = {
    modify : async (body, file)=>{
       // if(file !== undefined) {
       //     body.img = file.filename;
       // }
       if( file !== undefined ){
           body.img = file.filename;
       }else{
           body.img  = "non";
       }

        const result = await dao.boardUpdate.modify(body);

        let msg, url;
        let message = {};
        message.result = result.rowsAffected;
        if(result !== 0){
            msg = "수정 되었습니다";
            url = `/board/data/${body.BOARD_ID}`
        }else {
            msg = "문제 발생"
            url = `/board/modify_form/${body.BOARD_ID}`
        }
        message.msg = getMessage(msg, url);
        return message;
       
    }
}
const boardDelete = {
    delete : (BId) => {
        const result = dao.board_Delete.delete(BId);

        let msg, url;
        let message = {};
        message.result = result.rowsAffected;
        if(result !== 0){
            msg = "삭제 되었습니다";
            url = `/board/news`
        }else {
            msg = "문제 발생"
            url = `/board/data/${body.BOARD_ID}`
        }
        message.msg = getMessage(msg, url);
        return message;
    },
    cmtDelete : async (CId)=>{
        const result = await dao.board_Delete.cmtDelete(CId);
        return result;
    }
}

module.exports = {boardRead, boardInsert, boardUpdate, boardDelete, 
    timeModify, sessionCheck, getMessage, modifyCheck}