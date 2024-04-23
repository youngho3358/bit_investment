const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const insert = {    
    btc: async (coin) => {
        // console.log("coin : ", coin);
        for(let i = 0; i < coin.length; i++){
            if (coin[i] == "") {
                console.log("aaaaaaaaaaaaaaaa");
            }else if(coin[i] == undefined){
                console.log("bbbbbbbbbbbbbbbbbb");
            }
        }
        const con = await oracledb.getConnection(dbConfig);
        //console.log("길이 : ", coin.length);
        for(let i = 0; i < coin.length; i++){
            await con.execute(`insert into coin_info(coin_name, coin_eng_name, high_price, low_price, now_price, closing_price, change_rate, change_price, trans_price, trans_volume, coin_date) 
                                             values('${coin[i].name}', '${coin[i].eng_name}', ${coin[i].high_price}, ${coin[i].low_price}, ${coin[i].now_price}, ${coin[i].closing_price},'${coin[i].change_rate}', ${coin[i].change_price}, ${coin[i].trans_price}, ${coin[i].trans_volume}, systimestamp + 9/24)`);
        }
    },
}


module.exports = {insert}