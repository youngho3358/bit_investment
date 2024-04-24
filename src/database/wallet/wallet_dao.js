const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
oracledb.outFormat = oracledb.OBJECT;
oracledb.autoCommit = true;

const get = {
    have_KRW : async (member_id) => {
        const con = await oracledb.getConnection(dbConfig);
        let result = await con.execute(`select money from member where member_id='${member_id}'`);
        return result;
    },
    // 매수했던 각 코인의 갯수를 Object 형태로 담는 함수
    had_coin_num : async (member_id) => {
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
        let coin_list = ["btc","eth","shib","bch","etc","btg","sol","doge","xrp","id","pudix","stx","aave","dot","avax","gas","sbd","ong","sei","ont"];
        const con = await oracledb.getConnection(dbConfig);
        for(let i=0; i<coin_list.length; i++){
            // 구매 코인의 총 갯수를 가진 DB 결과 Object
            let coin_num_object = await con.execute(`select coin_num from trade where coin_name='${coin_list[i]}' and member_id = '${member_id}' and status = 1`);
            
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
        return had_coin_num;
    },
    // 매수했던 각 코인의 가격의 합을 Object 형태로 담는 함수
    had_coin_cost : async (member_id) => {
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
        let coin_list = ["btc","eth","shib","bch","etc","btg","sol","doge","xrp","id","pudix","stx","aave","dot","avax","gas","sbd","ong","sei","ont"];
        const con = await oracledb.getConnection(dbConfig);
        for(let i=0; i<coin_list.length; i++){
            // 구매 코인의 총 갯수를 가진 DB 결과 Object
            let coin_cost_object = await con.execute(`select buy_cost from trade where coin_name='${coin_list[i]}' and member_id = '${member_id}' and status = 1`);
            
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
        return had_coin_cost;
    },
    // 현재 보유 중인 코인의 갯수를 구하는 함수
    have_coin_num : async (member_id) => {
        const con = await oracledb.getConnection(dbConfig);
        let have_coin_num = await con.execute(`select btc,eth,shib,bch,etc,btg,sol,doge,xrp,id,pundix,stx,aave,dot,avax,gas,sbd,ong,sei,ont from member_account where member_id = '${member_id}'`);
        return have_coin_num.rows[0];
    },
    // 현재 코인의 가격 20개를 구하는 함수
    now_coin_cost : async () => {
        const con = await oracledb.getConnection(dbConfig);
        let now_coin_cost_object = await con.execute(`select * from (select * from coin_info order by order_column desc) where rownum <= 20`);
        return now_coin_cost_object.rows;
    }
}

module.exports = {get}