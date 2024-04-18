const WebSocket = require('websocket').client;

const ws = new WebSocket();

ws.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

ws.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });

    connection.on('message', function(message) { 
        data = message.type;
        console.log("message 수신 : ", data);
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    // ticker 채널 구독
    connection.send(JSON.stringify({
        "type": "ticker",
        "codes": ["KRW-BTC", "KRW-ETH", "KRW-XRP"] // 원하는 코인 코드들을 여기에 추가
    }));
});

// 웹소켓 엔드포인트
const endpoint = 'wss://api.upbit.com/websocket/v1';

ws.connect(endpoint);