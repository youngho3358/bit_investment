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
        console.log("마지막 : ",insertedId); 
          
        return
    }
}

const boardInsert = {
    
    write : async ( body, member )=>{
        console.log("DAO member.member_id : ", member.member_id)
        const sql = 
`insert into board(MEMBER_ID, BOARD_TITLE, BOARD_CONTENT, IMAGE_LINK, CATEGORY_ID) 
VALUES(:1, :2, :3, :4, :5)`;
    const result = await (await con).execute(sql, [member.member_id, body.title, body.content, body.img, body.category]);

        return result;
    },
    
/* 게시글 작성 완료하면 리스트가 아니라 방금 쓴 글을 볼 수 있게 하려고 작업하다가 실패한것, 수정예정
    write: async (body, member) => {
        console.log("DAO member.member_id : ", member.member_id);
        console.log("DAO body : ", body)
        const sql = `INSERT INTO board (MEMBER_ID, BOARD_TITLE, BOARD_CONTENT, IMAGE_LINK, CATEGORY_ID)
                     VALUES (${member.member_id}, :title, :content, :img, :category)`;
                     //VALUES (${member.member_id}, ${body.title}, ${body.content}, ${body.img}, ${body.dategory})`;
        const result = await (await con).execute(sql);
    
        //const lastInsertedId = result[0].insertId;
        //console.log('Inserted board_id:', lastInsertedId);
    
       //return { result, lastInsertedId };
       return result;
    },
    */

    cmtRegister : async (comment, member, BId) => {
        console.log("dao comment : ", comment)
        console.log("dao BId : ", BId)
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
    }
}
const board_Delete = {
    delete : async (BId) => {
        const sql = `delete from board where BOARD_ID = ${BId}`
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