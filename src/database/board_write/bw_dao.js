const dbConfig = require("../../../config/database/db_config")
const con = require("../root_dao");

const boardInsert = {
    write : async ( body )=>{
        const sql = 
`insert into board(MEMBER_ID, BOARD_TITLE, BOARD_CONTENT, IMAGE_LINK, CATEGORY_ID) 
values(9, :title, :content, :img, :category)`;
        const result = await (await con).execute(sql, body);
        console.log("result : ", result);
        return result;
    } 
}

const boardUpdate = {

}

module.exports = {boardInsert, boardUpdate}