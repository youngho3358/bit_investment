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
module.exports ={timeModify,session, getMesaage};
