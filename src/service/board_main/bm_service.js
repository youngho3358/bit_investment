const dao = require("../../database/board_main/bm_dao")
const common = require("./ser_common");

boardUpdate = {
    Hit : (num) =>{
        dao.boardUpdate.Hit(num);
    },
    // delete : (BOARD_ID) =>{
    //     dao.boardUpdate.delete(BOARD_ID);
    // },
    // modify : async (body,file)=>{
    //     if(file !== undefined){
    //         body.orifin_file_name = file.originalname;
    //         body.change_file_name = file.filename;
    //     }
    //     let result = 0;
    //     try{
    //         result = await dao.boardUpdate.modify(body);
    //     }catch(err){
    //     }
    //     let msg, url;
    //     let message = {};
    //     if(result !== 0 ){
    //         msg = "수정 되었습니다.";
    //         url = `/board/data/${body.BOARD_ID}`;
    //     }else{
    //         msg = ""
    //     }
    // }

}
const boardRead ={
    data : async (num)=>{
        boardUpdate.Hit(num);
        let data = await dao.boardRead.data(num);
        data = common.timeModify(data.rows);
        return data[0];
    },
    list : async (start) =>{
        const totalCounter = await dao.boardRead.totalContent();
        start = (start && start >1)?Number(start) :1;
        const page = pageOperation(start, totalCounter);
        let list = await dao.boardRead.list(page.startNum, page.endNum);
        //console.log(data)
        data = {};
        data.totalpage = page.totpage;
        data.start = start;
        data.list = list;
        return data;
    },
    
    replyData : async (groupNum) =>{
        let replyData = await dao.boardRead.replyData(groupNum);
        replyData = common.timeModify(replyData.rows);
        return replyData;
    }
}

    // start = 몇번째 페이지, totalCounter = 총 게시물 개수
    // totpage = 총 페이지 개수
    // startNum = start가 알려준 페이지의 첫번쨰 게시물 번호
    // endNum = start가 알려준 페이지의 마지막 게시물 번호
    const pageOperation = (start, totalCounter)=>{
        let page = {};
        const pageNum = 20;
        const num = (totalCounter % pageNum === 0)?0:1;

        page.totPage = parseInt(totalCounter/pageNum)+num;
        page.startNum = (start-1) * pageNum +1;
        page.endNum = start * pageNum;
        return page;   
}

// const boardInsert = {
//     // write : async (body, file, fileValidation ) => {
//     //     let msg, url;
//     //     if( fileValidation ){
//     //         msg = fileValidation;
//     //         url = "/board/write_form";
//     //         return common.getMessage(msg, url);
//     //     }
//     //     console.log("file : ", file);
//     //     if( file !== undefined ){
//     //         body.origin_file_name = file.originalname;
//     //         body.change_file_name = file.filename;
//     //     }else{
//     //         body.origin_file_name = "nan";
//     //         body.change_file_name = "nan";
//     //     }
//     // },
//      register : async (body) => {
//             const result = await dao.boardInsert.register(body);
//             console.log("result L" ,result)
//             return result.rowsAffected;
//         }
// }
const  getMessage = (msg, url) =>{
    return `<script>alert('${msg}'); location.href="${url}";</script>`;
}

module.exports ={boardUpdate,boardRead,pageOperation,getMessage};