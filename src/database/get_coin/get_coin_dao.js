const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;


const insert = {  
    btc: async (coin) => {
        const con = await oracledb.getConnection(dbConfig);
        //console.log("aaaaaaaaaaaaa: ", coin);
        console.log(coin.length)
        //console.log("Asdfas", coin[0].name);
        // 인덱스 0 = 거래대금이 가장 큰 코인
        // 인덱스 19 = 거래대금이 가장 작은 코인
        // for(let i = (coin.length - 1); i >= 0; i--){
        //     await con.execute(`insert into coin_info(coin_name, coin_eng_name, high_price, low_price, now_price, closing_price, change_rate, change_price, trans_price, trans_volume, coin_date, order_column) 
        //                             values('${coin[i].name}', '${coin[i].eng_name}', ${coin[i].high_price}, ${coin[i].low_price}, ${coin[i].now_price}, ${coin[i].closing_price},'${coin[i].change_rate}', ${coin[i].change_price}, ${coin[i].trans_price}, ${coin[i].trans_volume}, systimestamp + 9/24, order_column.nextval)`);
        // }
        for(let i = 0; i < coin.length; i++){
            await con.execute(`insert into coin_info(coin_name, coin_eng_name, high_price, low_price, now_price, closing_price, change_rate, change_price, trans_price, trans_volume, coin_date, order_column) 
                                    values('${coin[i].name}', '${coin[i].eng_name}', ${coin[i].high_price}, ${coin[i].low_price}, ${coin[i].now_price}, ${coin[i].closing_price},'${coin[i].change_rate}', ${coin[i].change_price}, ${coin[i].trans_price}, ${coin[i].trans_volume}, systimestamp + 9/24, order_column.nextval)`);
        }
    },
}
module.exports = {insert}