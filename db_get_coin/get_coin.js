const jwt = require("jsonwebtoken");
const {v4: uuidv4} = require('uuid');
const WebSocket = require("ws");
const dao = require("../src/database/get_coin/get_coin_dao");


const payload = {
    access_key: "Bx6sc5IRHtdszeVWxA16WhsfAVXp19DV6AzBWagK", 
    nonce: uuidv4(),
};

const jwtToken = jwt.sign(payload, "iO8qTl49ZyRol24LubFcDLvgN045jh5LxUkYQkqx");

const ws = new WebSocket("wss://api.upbit.com/websocket/v1", {
    headers: {
        authorization: `Bearer ${jwtToken}`
    }
});

ws.on("open", async () => {
    console.log("connected!");
    ws.send('[{"ticket":"test example"},{"type":"ticker", "codes":["KRW-BTC", "KRW-ETH", "KRW-SHIB", "KRW-BCH", "KRW-ETC", "KRW-BTG", "KRW-SOL", "KRW-DOGE", "KRW-XRP", "KRW-ID", "KRW-PUNDIX", "KRW-STX", "KRW-AAVE", "KRW-DOT", "KRW-AVAX", "KRW-GAS", "KRW-SBD", "KRW-ONG", "KRW-SEI", "KRW-ONT"]}]');
});



ws.on("error", console.error);


const btc = {};
const eth = {};
const shib = {};
const bch = {};
const etc = {};
const btg = {};
const sol = {};
const doge = {};
const xrp = {};
const id = {};
const pundix = {};
const stx = {};
const aave = {};
const dot = {};
const avax = {};
const gas = {};
const sbd = {};
const ong = {};
const sei = {};
const ont = {};

ws.on("message", async (data) => {
    const parsedData = await JSON.parse(data.toString());

    if (parsedData.code == "KRW-BTC") {
        btc.name = "비트코인";
        btc.eng_name = parsedData.code;
        btc.high_price = parsedData.high_price;
        btc.low_price = parsedData.low_price;
        btc.now_price = parsedData.trade_price;
        btc.closing_price = parsedData.prev_closing_price;
        btc.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        btc.change_price = parsedData.signed_change_price;
        btc.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        btc.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-ETH") {
        eth.name = "이더리움";
        eth.eng_name = parsedData.code;
        eth.high_price = parsedData.high_price;
        eth.low_price = parsedData.low_price;
        eth.now_price = parsedData.trade_price;
        eth.closing_price = parsedData.prev_closing_price;
        eth.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        eth.change_price = parsedData.signed_change_price;
        eth.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        eth.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-SHIB") {
        shib.name = "시바이누";
        shib.eng_name = parsedData.code;
        shib.high_price = parsedData.high_price;
        shib.low_price = parsedData.low_price;
        shib.now_price = parsedData.trade_price;
        shib.closing_price = parsedData.prev_closing_price;
        shib.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        shib.change_price = parsedData.signed_change_price;
        shib.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        shib.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-BCH") {
        bch.name = "비트코인캐시";
        bch.eng_name = parsedData.code;
        bch.high_price = parsedData.high_price;
        bch.low_price = parsedData.low_price;
        bch.now_price = parsedData.trade_price;
        bch.closing_price = parsedData.prev_closing_price;
        bch.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        bch.change_price = parsedData.signed_change_price;
        bch.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        bch.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-ETC") {
        etc.name = "이더리움클래식";
        etc.eng_name = parsedData.code;
        etc.high_price = parsedData.high_price;
        etc.low_price = parsedData.low_price;
        etc.now_price = parsedData.trade_price;
        etc.closing_price = parsedData.prev_closing_price;
        etc.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        etc.change_price = parsedData.signed_change_price;
        etc.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        etc.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-BTG") {
        btg.name = "비트코인골드";
        btg.eng_name = parsedData.code;
        btg.high_price = parsedData.high_price;
        btg.low_price = parsedData.low_price;
        btg.now_price = parsedData.trade_price;
        btg.closing_price = parsedData.prev_closing_price;
        btg.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        btg.change_price = parsedData.signed_change_price;
        btg.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        btg.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-SOL") {
        sol.name = "솔라나";
        sol.eng_name = parsedData.code;
        sol.high_price = parsedData.high_price;
        sol.low_price = parsedData.low_price;
        sol.now_price = parsedData.trade_price;
        sol.closing_price = parsedData.prev_closing_price;
        sol.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        sol.change_price = parsedData.signed_change_price;
        sol.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        sol.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-DOGE") {
        doge.name = "도지코인";
        doge.eng_name = parsedData.code;
        doge.high_price = parsedData.high_price;
        doge.low_price = parsedData.low_price;
        doge.now_price = parsedData.trade_price;
        doge.closing_price = parsedData.prev_closing_price;
        doge.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        doge.change_price = parsedData.signed_change_price;
        doge.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        doge.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-XRP") {
        xrp.name = "리플";
        xrp.eng_name = parsedData.code;
        xrp.high_price = parsedData.high_price;
        xrp.low_price = parsedData.low_price;
        xrp.now_price = parsedData.trade_price;
        xrp.closing_price = parsedData.prev_closing_price;
        xrp.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        xrp.change_price = parsedData.signed_change_price;
        xrp.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        xrp.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-ID") {
        id.name = "스페이스아이디";
        id.eng_name = parsedData.code;
        id.high_price = parsedData.high_price;
        id.low_price = parsedData.low_price;
        id.now_price = parsedData.trade_price;
        id.closing_price = parsedData.prev_closing_price;
        id.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        id.change_price = parsedData.signed_change_price;
        id.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        id.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-PUNDIX") {
        pundix.name = "펀디엑스";
        pundix.eng_name = parsedData.code;
        pundix.high_price = parsedData.high_price;
        pundix.low_price = parsedData.low_price;
        pundix.now_price = parsedData.trade_price;
        pundix.closing_price = parsedData.prev_closing_price;
        pundix.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        pundix.change_price = parsedData.signed_change_price;
        pundix.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        pundix.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-STX") {
        stx.name = "스택스";
        stx.eng_name = parsedData.code;
        stx.high_price = parsedData.high_price;
        stx.low_price = parsedData.low_price;
        stx.now_price = parsedData.trade_price;
        stx.closing_price = parsedData.prev_closing_price;
        stx.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        stx.change_price = parsedData.signed_change_price;
        stx.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        stx.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-AAVE") {
        aave.name = "에이브";
        aave.eng_name = parsedData.code;
        aave.high_price = parsedData.high_price;
        aave.low_price = parsedData.low_price;
        aave.now_price = parsedData.trade_price;
        aave.closing_price = parsedData.prev_closing_price;
        aave.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        aave.change_price = parsedData.signed_change_price;
        aave.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        aave.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-DOT") {
        dot.name = "폴카닷";
        dot.eng_name = parsedData.code;
        dot.high_price = parsedData.high_price;
        dot.low_price = parsedData.low_price;
        dot.now_price = parsedData.trade_price;
        dot.closing_price = parsedData.prev_closing_price;
        dot.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        dot.change_price = parsedData.signed_change_price;
        dot.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        dot.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-AVAX") {
        avax.name = "아발란체";
        avax.eng_name = parsedData.code;
        avax.high_price = parsedData.high_price;
        avax.low_price = parsedData.low_price;
        avax.now_price = parsedData.trade_price;
        avax.closing_price = parsedData.prev_closing_price;
        avax.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        avax.change_price = parsedData.signed_change_price;
        avax.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        avax.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-GAS") {
        gas.name = "가스";
        gas.eng_name = parsedData.code;
        gas.high_price = parsedData.high_price;
        gas.low_price = parsedData.low_price;
        gas.now_price = parsedData.trade_price;
        gas.closing_price = parsedData.prev_closing_price;
        gas.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        gas.change_price = parsedData.signed_change_price;
        gas.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        gas.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-SBD") {
        sbd.name = "스팀달러";
        sbd.eng_name = parsedData.code;
        sbd.high_price = parsedData.high_price;
        sbd.low_price = parsedData.low_price;
        sbd.now_price = parsedData.trade_price;
        sbd.closing_price = parsedData.prev_closing_price;
        sbd.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        sbd.change_price = parsedData.signed_change_price;
        sbd.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        sbd.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-ONG") {
        ong.name = "온돌로지가스";
        ong.eng_name = parsedData.code;
        ong.high_price = parsedData.high_price;
        ong.low_price = parsedData.low_price;
        ong.now_price = parsedData.trade_price;
        ong.closing_price = parsedData.prev_closing_price;
        ong.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        ong.change_price = parsedData.signed_change_price;
        ong.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        ong.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-SEI") {
        sei.name = "세이";
        sei.eng_name = parsedData.code;
        sei.high_price = parsedData.high_price;
        sei.low_price = parsedData.low_price;
        sei.now_price = parsedData.trade_price;
        sei.closing_price = parsedData.prev_closing_price;
        sei.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        sei.change_price = parsedData.signed_change_price;
        sei.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        sei.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }else if(parsedData.code == "KRW-ONT") {
        ont.name = "온돌로지";
        ont.eng_name = parsedData.code;
        ont.high_price = parsedData.high_price;
        ont.low_price = parsedData.low_price;
        ont.now_price = parsedData.trade_price;
        ont.closing_price = parsedData.prev_closing_price;
        ont.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        ont.change_price = parsedData.signed_change_price;
        ont.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        ont.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));
    }
});

const insert = async () => {
    const coin = [];
    coin.push(btc);
    coin.push(eth);
    coin.push(shib);
    coin.push(bch);
    coin.push(etc);
    coin.push(btg);
    coin.push(sol);
    coin.push(doge);
    coin.push(xrp);
    coin.push(id);
    coin.push(pundix);
    coin.push(stx);
    coin.push(aave);
    coin.push(dot);
    coin.push(avax);
    coin.push(gas);
    coin.push(sbd);
    coin.push(ong);
    coin.push(sei);
    coin.push(ont);
    //console.log("coin : ", coin);
    
    try {
        await dao.insert.btc(coin);
    } catch (error) {
        console.log(error);
    }  
};
setInterval(insert, 1000);

ws.on("close", () => console.log("closed!"));