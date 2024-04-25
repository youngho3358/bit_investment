const dbConfig = require("../../../config/database/db_config");
const con = require("../root_dao");

const boardRead = {
    modify_form : async(BId) => {
        const sql = `select * from board where board_id ='${BId}'`;
        const data = await ((await con).execute(sql));

        return data.rows[0];
    },
    lastWrite : async() => {
        const sql = `SELECT id FROM board ORDER BY id DESC LIMIT 1;`
        const insertedId = await (await con).execute(sql);
          
        return
    },
    cmtmodify_form : async ( CId )=>{
    const sql = `select * from board_comment where COMMENT_ID ='${CId}'`;
    const data = await ((await con).execute(sql));

    return data.rows[0];
    }
}

const boardInsert = {
    
    write : async ( body, member )=>{
        const sql = 
`insert into board(MEMBER_ID, BOARD_TITLE, BOARD_CONTENT, IMAGE_LINK, CATEGORY_ID) 
VALUES(:1, :2, :3, :4, :5)`;
    const result = await (await con).execute(sql, [member.member_id, body.title, body.content, body.img, body.category]);

        return result;
    },

    cmtRegister : async (comment, member, BId) => {

        const sql = 
            `insert into board_comment(BOARD_ID, MEMBER_ID, NICKNAME, COMMENT_CONTENT)
            values('${BId}', '${member.member_id}', '${member.nickname}', '${comment}')`;
        const result = await (await con).execute( sql );
        return result;
    }
}

const boardUpdate = {
    modify : async ( body )=>{
        //const date = new Date();

        const sql = `update board set 
            BOARD_TITLE = :title,
            BOARD_CONTENT = :content, 
            IMAGE_LINK = :img, 
            CATEGORY_ID = :category
            
            where BOARD_ID = :BOARD_ID`;


        //BOARD_MODIFY_DATE = ${date}    console.log('Date.toString(): ' + date.toString());
        //console.log('Date.toUTCString(): ' + date.toUTCString());

        const result = await (await con).execute(sql, body)
        return result;
    },
    cmtmodify : async ( CId )=>{
    const sql = `up`
    }
}
const board_Delete = {
    delete : async (BId) => {
        const sql = `delete from board where BOARD_ID = ${BId}`;
            `delete from board_comment where BOARD_ID = ${BId}`;
        const result = await (await con).execute(sql);
        return result;
    },
    cmtDelete : async (CId)=>{
        const sql = `delete from board_comment where COMMENT_ID = ${CId}`
        const result = await (await con).execute(sql);
        return result;
    }
}

const boardCheck = {
    modifyCheck : async (member, BId) => {
        const sql = `select * from board where BOARD_ID = ${BId} and MEMBER_ID = ${member.member_id}`
        const result = await (await con).execute(sql);
        return result;
    }
}

module.exports = {boardRead, boardInsert, boardUpdate, board_Delete, boardCheck}