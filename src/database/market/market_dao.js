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
        let data4 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 4)`);
        let data5 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 5)`);
        let data6 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 6)`);
        let data7 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 7)`);
        let data8 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 8)`);
        let data9 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 9)`);
        let data10 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 10)`);
        let data11 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 11)`);
        let data12 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 12)`);
        let data13 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 13)`);
        let data14 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 14)`);
        let data15 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 15)`);
        let data16 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 16)`);
        let data17 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 17)`);
        let data18 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 18)`);
        let data19 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 19)`);
        let data20 = await con.execute(`select * from coin_info where (coin_date, trans_price) = (select coin_date, trans_price from (select coin_date, trans_price, ROW_NUMBER() OVER (ORDER BY coin_date DESC, trans_price DESC) AS row_num from coin_info) where row_num = 20)`);

        let data = [];

        data.push( data1.rows[0]);
        data.push( data2.rows[0]);
        data.push( data3.rows[0]);
        data.push( data4.rows[0]);
        data.push( data5.rows[0]);
        data.push( data6.rows[0]);
        data.push( data7.rows[0]);
        data.push( data8.rows[0]);
        data.push( data9.rows[0]);
        data.push( data10.rows[0]);
        data.push( data11.rows[0]);
        data.push( data12.rows[0]);
        data.push( data13.rows[0]);
        data.push( data14.rows[0]);
        data.push( data15.rows[0]);
        data.push( data16.rows[0]);
        data.push( data17.rows[0]);
        data.push( data18.rows[0]);
        data.push( data19.rows[0]);
        data.push( data20.rows[0]);

        return data;
    }
}
 
module.exports = {views}