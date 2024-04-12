const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const con = oracledb.getConnection(dbConfig);

const boardRead ={
    data : async(num) =>{
        const sql = `select * from BOARD where BOARD_ID ='${num}'`;
        const data = (await con).execute(sql);
        return data;
    },
    list : async (start, end) =>{
        const sql = `select * from (select rownum rn, A.* from 
            (select * from BOARD order by BOARD_ID desc)A)
            where rn between ${start} and ${end}`;
            const list = (await con).execute(sql);
            return list;
},
    totalContent : async() =>{
        const sql = "select count(*) from BOARD";
        const totalContent = await (await con).execute(sql);
        return totalContent.rows[0]['COUNT(*)'];
    }
}
module.exports={boardRead}