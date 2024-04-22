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


ws.on("open", () => {
    console.log("connected!");
    ws.send('[{"ticket":"test example"},{"type":"ticker", "codes":["KRW-BTC", "KRW-ETH", "KRW-SHIB"]}]');
    
});



ws.on("error", console.error);


const btc = {};
const eth = {};
const shib = {};

ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());
    // 코인명, 고가, 저가, 현재가, 전일대비, 거래대금
    // console.log("코인명 : ", parsedData.code); // string
    // console.log("고가 : ", parsedData.high_price); // number
    // console.log("저가 : ", parsedData.low_price); // number
    // console.log("현재가 : ", parsedData.trade_price); // number
    // console.log("전일대비 : ", (parsedData.signed_change_rate * 100).toFixed(2)); // string
    // console.log("거래대금 : ", Math.round(parsedData.acc_trade_price_24h / 1000000)); // number
    // console.log("거래량 : ",  parseFloat(parsedData.acc_trade_volume_24h.toFixed(3))); // number
    // console.log("날짜 : ", currentDateTime); // string

    if (parsedData.code == "KRW-BTC") {
        btc.name = "비트코인";
        btc.eng_name = parsedData.code;
        btc.high_price = parsedData.high_price;
        btc.low_price = parsedData.low_price;
        btc.now_price = parsedData.trade_price;
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
        shib.change_rate = (parsedData.signed_change_rate * 100).toFixed(2);
        shib.change_price = parsedData.signed_change_price;
        shib.trans_price = Math.round(parsedData.acc_trade_price_24h / 1000000);
        shib.trans_volume = parseFloat(parsedData.acc_trade_volume_24h.toFixed(3));

    }

});

const insert = () => {
    const coin = [];
    // const order = { btc: btc.trans_price, eth: eth.trans_price, shib: shib.trans_price}; 
    // const sortedEntries = Object.entries(order).sort((a, b) => b[1] - a[1]);
    // const sortedOrder = Object.fromEntries(sortedEntries);
    // console.log(Object.keys(sortedOrder)[0]); 
    coin.push(btc);
    coin.push(eth);
    coin.push(shib)
    dao.insert.btc(coin);
}

setInterval(insert, 1000);
    
ws.on("close", () => console.log("closed!"));