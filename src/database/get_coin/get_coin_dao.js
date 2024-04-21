const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const insert = {    
    btc: (coin) => {
        //const con = await oracledb.getConnection(dbConfig);
        //let data1 = data
        console.log("dao에서 받아온 값 : ", coin);
        //setInterval(console.log("받아온 값 : ", data1), 3000);
    },
}


module.exports = {insert}