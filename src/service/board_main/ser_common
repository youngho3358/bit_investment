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
    list = list.map((data) =>{
        data.SAVE_DATE = data.SAVE_DATE.toLocalString();
        return data;
    })
    return list;
}
module.exports ={timeModify,session, getMesaage};
