const dao = require("../../database/board_write/bw_dao");

const sessionCheck = (session) => {
    if( !session || !session.id ){
        msg = "로그인이 필요합니다";
        url = "../routers/login/login_router";
        return getMessage(msg, url);
    }
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
    }
}

const boardInsert = {
    write : async (body, file, fileValidation ) => {
        let msg, url;
        /*
        if (!session.member_id) {
            msg = "로그인이 필요합니다";
            url = "/board/login";
            return getMessage(msg, url);
        }
        */

        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form";
            return getMessage(msg, url);
        }
        console.log(fileValidation);


        if( file !== undefined ){
            //body.origin_file_name = file.originalname;
            body.img = file.filename;
        }else{
            //body.origin_file_name = "non";
            body.img  = "non";
        }

        const result = await dao.boardInsert.write( body );
        if( result.rowsAffected === 1 ){
            msg = "등록되었습니다!!!";
            url = "/board";
        }else{
            msg = "문제 발생!!!";
            url = "board_write/write_form";
        }
        return getMessage(msg, url);
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
      
        console.log("삭제할 글 보드아이디 : ", BId)
        dao.board_Delete.delete(BId);

        console.log("삭제 확인용 result : ", result)
        let msg, url;
        let message = {};
        message.result = result.rowsAffected;
        if(result !== 0){
            msg = "삭제 되었습니다";
            url = `/board`
        }else {
            msg = "문제 발생"
            url = `/board/data/${body.BOARD_ID}`
        }
        message.msg = getMessage(msg, url);
        return message;
    }
}

module.exports = {boardRead, boardInsert, boardUpdate, boardDelete, 
    timeModify, sessionCheck, getMessage}