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
        const sql = `select count(*) from BOARD`;
        const totalContent = await con.execute(sql);
        return totalContent.rows[0]['COUNT(*)'];
    },

    categoryById : async(category_id) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from BOARD where CATEGORY_ID ='${category_id}'`;
        const result = await con.execute(sql);
        //console.log("res:",result.rows.length);
        return result.rows;
    },
    searchPosts : async(keyword) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `SELECT * FROM BOARD WHERE BOARD_TITLE LIKE ? OR BOARD_CONTENT LIKE ?`;
        const params =[`%${keyword}%`,`%${keyword}%`];
        const results = await con.execute(sql,params);
        console.log("asdf : " ,sql,params)
        return results.rows;
    },
    incrementViews: async (BOARD_ID) => {
        try{
        const con = await oracledb.getConnection(dbConfig)
        await con.execute(`UPDATE BOARD SET HIT = HIT +1 WHERE BOARD_ID =?`,[BOARD_ID])
        await con.release();
        console.log("조회수 증가 완료")
    } catch(error){
        console.error("조회수 증가 오류",error);
        throw error;
        }
    },
    getPostById: async (BOARD_ID) => {
        const con = await oracledb.getConnection(dbConfig);
        const [rows] = await con.execute('SELECT * FROM BOARD WHERE BOARD_ID = ?', [BOARD_ID]);
        return rows[0];
    }
}

module.exports={boardRead}