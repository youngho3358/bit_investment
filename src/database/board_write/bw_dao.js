const dbConfig = require("../../../config/database/db_config");
const { boardDelete } = require("../../service/board_write/bw_service");
const con = require("../root_dao");

const boardRead = {
    modify_form : async(BId) => {
        const sql = `select * from board where board_id ='${BId}'`;
        const data = await ((await con).execute(sql));
        console.log("dao에서 빼온 수정할 data : ", data.rows)
        return data.rows[0];
    }
}

const boardInsert = {
    write : async ( body )=>{
        const sql = 
`insert into board(MEMBER_ID, BOARD_TITLE, BOARD_CONTENT, IMAGE_LINK, CATEGORY_ID) 
values(9, :title, :content, :img, :category)`;
//!!-회원번호 세션에서 받는걸로 바꿔야함
        const result = await (await con).execute(sql, body);
        console.log("result : ", result);
        return result;
    } 
}

const boardUpdate = {
    modify : async ( body )=>{
        //const date = new Date();
        console.log("dao는 body를 받았나? : ", body)
        const sql = `update board set 
            BOARD_TITLE = :title,
            BOARD_CONTENT = :content, 
            IMAGE_LINK = :img, 
            CATEGORY_ID = :category
            
            where BOARD_ID = :BOARD_ID`;


        //BOARD_MODIFY_DATE = ${date}    console.log('Date.toString(): ' + date.toString());
        //console.log('Date.toUTCString(): ' + date.toUTCString());

        const result = await (await con).execute(sql, body);
        console.log("수정 업데이트 하고 난 뒤 result : ", result);
        return result;
    }
}
const board_Delete = {
    delete : async (BId) => {
        const sql = `delete from board where BOARD_ID = ${BId}`
        const result = await (await con).execute(sql)
        return result;
    }
}

module.exports = {boardRead, boardInsert, boardUpdate, board_Delete}