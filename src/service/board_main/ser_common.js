const session = (session) =>{
    if( !session || session.username){
        msg = "로그인을 해야 글작성이 가능합니다"
        url = ""
        return message (msg,url);
    }
    return 0;
}
const getMesaage = (msg,url) =>{
    return `<script> alert('${msg}');
    location.href ="${url}";
    </script>`;
}
const timeModify = (list) =>{
   list = list.map((data) => {
        data.BOARD_CREATE_DATE = data.BOARD_CREATE_DATE.toLocaleString();
        return data;
    })
    return list;
}
function formatDate(serverDate) {
   // 서버에서 가져온 날짜 데이터 (예: '2024-04-24T14:32:02.000Z')
//var serverDate = '2024-04-24T14:32:02.000Z';

// JavaScript Date 객체로 변환
var date = new Date(serverDate);

// 날짜를 원하는 형식으로 변환
var formattedDate = date.getFullYear() + '.' + 
                    ('0' + (date.getMonth() + 1)).slice(-2) + '.' + 
                    ('0' + date.getDate()).slice(-2) + ' ' + 
                    ('0' + date.getHours()).slice(-2) + ':' + 
                    ('0' + date.getMinutes()).slice(-2);

// HTML의 요소에 삽입
return formattedDate;
}
module.exports ={timeModify,session, getMesaage, formatDate};
