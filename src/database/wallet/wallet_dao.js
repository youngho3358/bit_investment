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

const get = {
    have_KRW : async (member_id) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let result = await connection.execute(`select money from member where member_id='${member_id}'`);
            await connection.close();
            return result;
        }catch(err){
            console.log(err);
        }
    },
    // 매수했던 각 코인의 갯수를 Object 형태로 담는 함수
    had_coin_num : async (member_id) => {
        let connection;
        try{
            let had_coin_num = {
                btc : 0,
                eth : 0,
                shib : 0,
                bch : 0,
                etc : 0,
                btg : 0,
                sol : 0,
                doge : 0,
                xrp : 0,
                id : 0,
                pundix : 0,
                stx : 0,
                aave : 0,
                dot : 0,
                avax : 0,
                gas : 0,
                sbd : 0,
                ong : 0,
                sei : 0,
                ont : 0
            };
            let coin_list = ["btc","eth","shib","bch","etc","btg","sol","doge","xrp","id","pundix","stx","aave","dot","avax","gas","sbd","ong","sei","ont"];
            connection = await pool.getConnection();
            for(let i=0; i<coin_list.length; i++){
                // 구매 코인의 총 갯수를 가진 DB 결과 Object
                let coin_num_object = await connection.execute(`select coin_num from trade where coin_name='${coin_list[i]}' and member_id = '${member_id}' and status = 1`);
                
                // 코인의 구매 이력이 없는 경우
                if(coin_num_object.rows[0] === undefined){
                    had_coin_num[coin_list[i]] = 0;
                    continue;
                }

                let each_coin_num = 0;
                coin_num_object.rows.forEach(coin => {
                    if(coin.COIN_NUM == null){
                        coin.COIN_NUM = 0;
                    }
                    each_coin_num += coin.COIN_NUM;
                })
                had_coin_num[coin_list[i]] = each_coin_num
            }
            await connection.close();
            return had_coin_num;
        }catch(err){
            console.log(err);
        }
    },
    // 매수했던 각 코인의 가격의 합을 Object 형태로 담는 함수
    had_coin_cost : async (member_id) => {
        let connection;
        try{
            let had_coin_cost = {
                btc : 0,
                eth : 0,
                shib : 0,
                bch : 0,
                etc : 0,
                btg : 0,
                sol : 0,
                doge : 0,
                xrp : 0,
                id : 0,
                pundix : 0,
                stx : 0,
                aave : 0,
                dot : 0,
                avax : 0,
                gas : 0,
                sbd : 0,
                ong : 0,
                sei : 0,
                ont : 0
            };
            let coin_list = ["btc","eth","shib","bch","etc","btg","sol","doge","xrp","id","pundix","stx","aave","dot","avax","gas","sbd","ong","sei","ont"];
            connection = await pool.getConnection();
            for(let i=0; i<coin_list.length; i++){
                // 구매 코인의 총 가격을 가진 DB 결과 Object
                let coin_cost_object = await connection.execute(`select buy_cost from trade where coin_name='${coin_list[i]}' and member_id = '${member_id}' and status = 1`);
                
                // 코인의 구매 이력이 없는 경우
                if(coin_cost_object.rows[0] === undefined){
                    had_coin_cost[coin_list[i]] = 0;
                    continue;
                }

                let each_coin_cost = 0;
                coin_cost_object.rows.forEach(coin => {
                    if(coin.BUY_COST == null){
                        coin.BUY_COST = 0;
                    }
                    each_coin_cost += coin.BUY_COST;
                })
                had_coin_cost[coin_list[i]] = each_coin_cost
            }
            await connection.close();
            return had_coin_cost;
        }catch(err){
            console.log(err)
        }
    },
    // 현재 보유 중인 코인의 갯수를 구하는 함수
    have_coin_num : async (member_id) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let have_coin_num = await connection.execute(`select btc,eth,shib,bch,etc,btg,sol,doge,xrp,id,pundix,stx,aave,dot,avax,gas,sbd,ong,sei,ont from member_account where member_id = '${member_id}'`);
            await connection.close();
            return have_coin_num.rows[0];
        }catch(err){
            console.log(err)
        }
    },
    // 현재 코인의 가격 20개를 구하는 함수
    now_coin_cost : async () => {
        let connection;
        try{
            connection = await pool.getConnection();
            let now_coin_cost_object = await connection.execute(`select * from (select * from coin_info order by order_column desc) where rownum <= 20`);
            await connection.close();
            return now_coin_cost_object.rows;
        }catch(err){
            console.log(err);
        }
    },
    each_now_coin_cost : async (coin) => {
        let connection;
        try{
            connection = await pool.getConnection();
            let each_now_coin_cost = await connection.execute(`select * from (select * from (select * from coin_info order by order_column desc) where rownum <= 20) where coin_name = '${coin}'`);
            await connection.close();
            return each_now_coin_cost.rows[0].NOW_PRICE;
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = {get}