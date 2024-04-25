const dao = require("../../database/wallet/wallet_dao");
const bcrypt = require("bcrypt");

const get = {
    have_KRW : async (member_id) => {
        let result = await dao.get.have_KRW(member_id);
        return result.rows[0];
    },
    // 총 매수 금액을 구하는 함수
    total_buy_coin_cost : async (member_id) => {
        // 매수했던 각 코인의 갯수를 구하는 함수
        let had_coin_num = await dao.get.had_coin_num(member_id);

        // 매수했던 각 코인의 가격의 합을 구하는 함수
        let had_coin_cost = await dao.get.had_coin_cost(member_id);
        
        // 각 코인별 매수 평균가를 담은 had_coin_aver
        let had_coin_aver = {
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
        // 매수 평균가 담는 식
        for(let i=0; i<coin_list.length; i++){
            let had_coin_aver_cost = had_coin_cost[coin_list[i]] / had_coin_num[coin_list[i]];
            // 0/0 이 작동될 시 NaN 이 출력되므로 0으로 명시
            if(isNaN(had_coin_aver_cost)){
                had_coin_aver_cost = 0;
            }
            had_coin_aver[coin_list[i]] = parseInt(had_coin_aver_cost);
        }
        
        // 현재 들고 있는 코인의 갯수를 구하는 함수
        let have_coin_num = await dao.get.have_coin_num(member_id);

        let lower_have_coin_num = {};

        // 현재 들고 있는 코인의 갯수의 키가 대문자 > 소문자로 변환하여
        // lower_have_coin_num 이라는 변수에 다시 담음
        for (let key in have_coin_num) {
            lower_have_coin_num[key.toLowerCase()] = have_coin_num[key];
        }

        // 총 매수 금액 담을 변수
        let tot_buy_coin_cost = 0;

        // 총 매수 금액 = had_coin_aver * have_coin_num
        for(let i=0; i<coin_list.length; i++){
            let each_aver = had_coin_aver[coin_list[i]];
            let each_num = lower_have_coin_num[coin_list[i]];

            if(each_aver == 0 || each_num == 0){
                continue;
            }

            tot_buy_coin_cost += parseInt(each_aver * each_num);
        }
        return tot_buy_coin_cost;
    },
    total_buy_coin_result_cost : async (member_id) => {
        // 현재 코인 가격 실시간으로 객체 형태로 받아오기
        let now_coin_cost_object = await dao.get.now_coin_cost();

        // 가격을 담을 변수
        let now_coin_cost = {
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

        for(let i=0; i<now_coin_cost_object.length; i++) {
            let coin = await now_coin_cost_object[i];
            
            if(coin.COIN_ENG_NAME == 'KRW-BTC'){
                now_coin_cost.btc = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-ETH'){
                now_coin_cost.eth = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-SHIB'){
                now_coin_cost.shib = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-BCH'){
                now_coin_cost.bch = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-ETC'){
                now_coin_cost.etc = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-BTG'){
                now_coin_cost.btg = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-SOL'){
                now_coin_cost.sol = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-DOGE'){
                now_coin_cost.doge = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-XRP'){
                now_coin_cost.xrp = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-ID'){
                now_coin_cost.id = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-PUNDIX'){
                now_coin_cost.pundix = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-STX'){
                now_coin_cost.stx = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-AAVE'){
                now_coin_cost.aave = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-DOT'){
                now_coin_cost.dot = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-AVAX'){
                now_coin_cost.avax = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-GAS'){
                now_coin_cost.gas = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-SBD'){
                now_coin_cost.sbd = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-ONG'){
                now_coin_cost.ong = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-SEI'){
                now_coin_cost.sei = coin.NOW_PRICE;
            }else if(coin.COIN_ENG_NAME == 'KRW-ONT'){
                now_coin_cost.ont = coin.NOW_PRICE;
            }else{
                console.log("wallet_service.js 에서 오류 발생.... 분류되지 않은 코인");
            }
        }

        // 현재 가지고 있는 coin 갯수를 구한 객체
        // ( 키가 대문자라 소문자로 변환과정 거침 - lower_have_coin_num )
        let have_coin_num = await dao.get.have_coin_num(member_id);
        let lower_have_coin_num = {};

        for (let key in have_coin_num) {
            lower_have_coin_num[key.toLowerCase()] = have_coin_num[key];
        }

        // 총 평가금액 = (현재 코인 가격 * 가지고 있는 코인의 갯수) 를 모두 합한 값
        // 총 평가금액을 담을 변수 = total_buy_coin_result_cost
        let total_buy_coin_result_cost = 0;

        for(let i=0; i<coin_list.length; i++){
            let now_cost = now_coin_cost[coin_list[i]];
            let each_num = lower_have_coin_num[coin_list[i]];

            if(now_cost == 0 || each_num == 0){
                continue;
            }

            total_buy_coin_result_cost += parseInt(now_cost * each_num);
        }

        // 총 평가 금액이 담긴 total_buy_coin_result_cost 를 반환
        return total_buy_coin_result_cost;
    },
    // 현재 가지고 있는 코인만 Object 형으로 반환
    have_coin_num : async (member_id) => {
        let have_coin_num = await dao.get.have_coin_num(member_id);
        let lower_have_coin_num = {};

        // 소문자로 변환
        for (let key in have_coin_num) {
            lower_have_coin_num[key.toLowerCase()] = have_coin_num[key];
        }

        let coin_list = ["btc","eth","shib","bch","etc","btg","sol","doge","xrp","id","pundix","stx","aave","dot","avax","gas","sbd","ong","sei","ont"];

        // 코인의 갯수가 없는 경우 
        for(let i=0; i<coin_list.length; i++){
            if(lower_have_coin_num[coin_list[i]] == 0){
                delete lower_have_coin_num[coin_list[i]];
            }
        }

        return lower_have_coin_num;
    },
    // 코인 1개 구매 당 평균 매수가를 담는 함수
    each_coin_had_cost : async (member_id) => {
        let had_coin_cost = await dao.get.had_coin_cost(member_id);
        let had_coin_num = await dao.get.had_coin_num(member_id);

        let each_coin_had_cost = {
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

        for(let i=0; i<coin_list.length; i++){
            if(isNaN(had_coin_cost[coin_list[i]] / had_coin_num[coin_list[i]])){
                delete each_coin_had_cost[coin_list[i]];
            }else{
                each_coin_had_cost[coin_list[i]] = had_coin_cost[coin_list[i]] / had_coin_num[coin_list[i]];
            }
        }
        return each_coin_had_cost;
    },
    each_now_coin_cost : async (coin) => {
        let result = dao.get.each_now_coin_cost(coin);
        return result;
    }
}

module.exports = {get}