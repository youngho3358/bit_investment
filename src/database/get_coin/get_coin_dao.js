const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const insert = {    
    btc: async (coin) => {
        const con = await oracledb.getConnection(dbConfig);
        //let data1 = data
        console.log("dao에서 받아온 값 : ", coin);
        console.log("길이 : ", coin.length);
        console.log("첫번째 : ", coin[0].change_price);
    },
}


module.exports = {insert}