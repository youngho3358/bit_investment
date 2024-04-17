const { seMId } = require("../../controller/board_write/bw_controller");
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

const boardInsert = {
    write : async (body, file, fileValidation ) => {
        let msg, url;
        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form";
            return getMessage(msg, url);
        }
        console.log(fileValidation);

        console.log("file : ", file);
        if( file !== undefined ){
            //body.origin_file_name = file.originalname;
            body.img = file.filename;
        }else{
            //body.origin_file_name = "non";
            body.img  = "non";
        }
        console.log("ser_body : ", body);
        const result = await dao.boardInsert.write( body );
        if( result.rowsAffected === 1 ){
            msg = "등록되었습니다!!!";
            url = "/board/list";
        }else{
            msg = "문제 발생!!!";
            url = "board_write/write_form";
        }
        return getMessage(msg, url);
    }
}

module.exports = {boardInsert, 
    timeModify, sessionCheck, getMessage}