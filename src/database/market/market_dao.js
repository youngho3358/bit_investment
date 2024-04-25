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

const views = {
    coin_insert : async () => {
        let connection;
        try {
            // Connection pool에서 연결 얻기
            connection = await pool.getConnection();
            // 쿼리 실행
            let data = [];
            let data1 = await connection.execute('SELECT * FROM (SELECT * FROM coin_info ORDER BY order_column DESC) WHERE ROWNUM <= 20');
            // 데이터 처리 등 추가 로직 수행

            // 사용이 끝난 연결 풀로 반환
            await connection.close();
            
            const price = {btc: data1.rows[19].TRANS_PRICE, eth: data1.rows[18].TRANS_PRICE, shib: data1.rows[17].TRANS_PRICE, 
                            bch: data1.rows[16].TRANS_PRICE, etc: data1.rows[15].TRANS_PRICE, btg: data1.rows[14].TRANS_PRICE, 
                            sol: data1.rows[13].TRANS_PRICE, doge: data1.rows[12].TRANS_PRICE, xrp: data1.rows[11].TRANS_PRICE, 
                            id: data1.rows[10].TRANS_PRICE, pundix: data1.rows[9].TRANS_PRICE, stx: data1.rows[8].TRANS_PRICE, 
                            aave: data1.rows[7].TRANS_PRICE, dot: data1.rows[6].TRANS_PRICE, avax: data1.rows[5].TRANS_PRICE, 
                            gas: data1.rows[4].TRANS_PRICE, sbd: data1.rows[3].TRANS_PRICE, ong: data1.rows[2].TRANS_PRICE,
                            sei: data1.rows[1].TRANS_PRICE, ont: data1.rows[0].TRANS_PRICE};
            const sortedKeys = Object.keys(price).sort((a, b) => price[b] - price[a]);
            const sortedObject = {};
            sortedKeys.forEach(key => {
                sortedObject[key] = price[key];
            });
            //console.log(Object.keys(sortedObject)[0]);
            for(let i = 0; i < Object.keys(sortedObject).length; i++){
                if (Object.keys(sortedObject)[i] == "btc") {
                    data.push(data1.rows[19])
                }else if (Object.keys(sortedObject)[i] == "eth") {
                    data.push(data1.rows[18])
                }
                else if (Object.keys(sortedObject)[i] == "shib") {
                    data.push(data1.rows[17])
                }
                else if (Object.keys(sortedObject)[i] == "bch") {
                    data.push(data1.rows[16])
                }
                else if (Object.keys(sortedObject)[i] == "etc") {
                    data.push(data1.rows[15])
                }
                else if (Object.keys(sortedObject)[i] == "btg") {
                    data.push(data1.rows[14])
                }
                else if (Object.keys(sortedObject)[i] == "sol") {
                    data.push(data1.rows[13])
                }
                else if (Object.keys(sortedObject)[i] == "doge") {
                    data.push(data1.rows[12])
                }
                else if (Object.keys(sortedObject)[i] == "xrp") {
                    data.push(data1.rows[11])
                }
                else if (Object.keys(sortedObject)[i] == "id") {
                    data.push(data1.rows[10])
                }
                else if (Object.keys(sortedObject)[i] == "pundix") {
                    data.push(data1.rows[9])
                }
                else if (Object.keys(sortedObject)[i] == "stx") {
                    data.push(data1.rows[8])
                }
                else if (Object.keys(sortedObject)[i] == "aave") {
                    data.push(data1.rows[7])
                }
                else if (Object.keys(sortedObject)[i] == "dot") {
                    data.push(data1.rows[6])
                }
                else if (Object.keys(sortedObject)[i] == "avax") {
                    data.push(data1.rows[5])
                }
                else if (Object.keys(sortedObject)[i] == "gas") {
                    data.push(data1.rows[4])
                }
                else if (Object.keys(sortedObject)[i] == "sbd") {
                    data.push(data1.rows[3])
                }
                else if (Object.keys(sortedObject)[i] == "ong") {
                    data.push(data1.rows[2])
                }
                else if (Object.keys(sortedObject)[i] == "sei") {
                    data.push(data1.rows[1])
                }
                else if (Object.keys(sortedObject)[i] == "ont") {
                    data.push(data1.rows[0])
                }
            }
            return data;

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
        
    }
}
 
module.exports = {views}