const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

let pool;

async function initialize() {
    try {
        pool = await oracledb.createPool(dbConfig);
        console.log("Connection pool 생성됨");
    } catch (error) {
        console.error("Connection pool 생성 중 오류:", error);
    }
}

initialize();

const insert = {  
    btc: async (coin) => {
        let connection;
        try {
            console.log(coin.length)
            connection = await pool.getConnection();
            for(let i = 0; i < coin.length; i++){
                await connection.execute(`insert into coin_info(coin_name, coin_eng_name, high_price, low_price, now_price, closing_price, change_rate, change_price, trans_price, trans_volume, coin_date, order_column) 
                                        values('${coin[i].name}', '${coin[i].eng_name}', ${coin[i].high_price}, ${coin[i].low_price}, ${coin[i].now_price}, ${coin[i].closing_price},'${coin[i].change_rate}', ${coin[i].change_price}, ${coin[i].trans_price}, ${coin[i].trans_volume}, systimestamp + 9/24, order_column.nextval)`);
            }
            await connection.close();
        } catch (error) {
            console.error("쿼리 실행 중 오류:", error);
            if (connection) {
                try {
                    await connection.close(); // 오류 발생 시 연결 닫기
                } catch (closeError) {
                    console.error("연결 닫기 오류:", closeError);
                }
            }
        }
    },
}
module.exports = {insert}