const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;


const boardRead ={
    data : async(num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `select * from BOARD where BOARD_ID ='${num}'`;
        console.log(num)
        const data = await con.execute(sql);
   
        return data;
    },
    list : async (start, end) =>{
        const con = await oracledb.getConnection(dbConfig);
        const list = await con.execute
        (`select * from (select rownum rn, A.* from (select * from BOARD order by BOARD_ID desc)A) where rn between ${start} and ${end}`);
        console.log("list : ", list.rows);
        return list.rows;
},
    totalContent : async() =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = "select count(*) from BOARD";
        const totalContent = await con.execute(sql);
        return totalContent.rows[0]['COUNT(*)'];
    }
}
boardUpdate ={
    Hit : async(num) =>{
        const con = await oracledb.getConnection(dbConfig);
        const sql = `update BOARD set hit = hit + 1 where BOARD_ID ='${num}'`;
        con.execute(sql)
    }
}
module.exports={boardRead,boardUpdate}