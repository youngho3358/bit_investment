const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
// const boardInsert ={
//     // register : async(body)=>{
//     //     const con = await oracledb.getConnection(dbConfig);
//     //     const sql = `insert into BOARD_COMMENT(COMMENT_ID,COMMENT_CONTENT,COMMENT_CREATE_DATE) values(:comment_id,:comment_content,2002-02-02)`
//     //     console.log(sql)
//     //     const result = con.execute(sql, body);
//     //     return result;
//     // }
// }

const boardRead ={
    data : async(num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from BOARD where BOARD_ID ='${num}'`;
        const data = await con.execute(sql);
        return data;
    },
    list : async (start, end) =>{
        const con = await oracledb.getConnection(dbConfig);
        const list = await con.execute(`select * from (select rownum rn, A.* from (select * from BOARD order by BOARD_ID desc)A) where rn between ${start} and ${end}`);
        return list.rows;
},
    totalContent : async() =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select count(*) from BOARD";
        const totalContent = await con.execute(sql);
        return totalContent.rows[0]['COUNT(*)'];
    },
    replyData : async(groupNum) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from BOARD_COMMENT where BOARD_ID='${groupNum}'`;
        const result = await con.execute(sql);
        console.log("result: " , result);
        return result;
    },
    Hit : async(num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update BOARD set hit = hit + 1 where BOARD_ID ='${num}'`;
        await con.execute(sql)
    }
}

module.exports={boardRead}