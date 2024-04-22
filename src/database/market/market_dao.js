const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;
const views = {
    coin_insert : async () => {
        const con = await oracledb.getConnection(dbConfig);
        let data1 = await con.execute(`select * from (select * from coin_info ORDER BY coin_date DESC, trans_price DESC) where rownum=1`);
        let data2 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 2)`);
        let data3 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 3)`);
        let data = [];
        data.push( data1.rows[0]);
        data.push( data2.rows[0]);
        data.push( data3.rows[0]);
        return data;
    }
}
 
module.exports = {views}