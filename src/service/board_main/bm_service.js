const dao = require("../../database/board_main/bm_dao");
const { search } = require("../../routers/board_main/bm_router");
const common = require("./ser_common");

// boardUpdate = {
//     Hit : (num) =>{
//         dao.boardRead.Hit(num);
//     },
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

// }
const boardRead ={
    data : async (num)=>{
        let data = await dao.boardRead.data(num);
        data = common.timeModify(data.rows);
        
        return data[0];
    },
    cmtdata : async (num) =>{
        let cmtdata = await dao.boardRead.cmtdata(num);
        
        for(let i =0 ; i < cmtdata.length ; i++){
            cmtdata[i].COMMENT_CREATE_DATA = common.formatDate(cmtdata[i].COMMENT_CREATE_DATA);
            console.log("Again Service What is cmtdata? : ", cmtdata)
        }
        
        return cmtdata;
    },
    list : async (start) =>{
        const totalCounter = await dao.boardRead.totalContent();
        start = (start && start > 1)?Number(start) : 1;
        const page = pageOperation(start, totalCounter);
        let list = await dao.boardRead.list(page.startNum, page.endNum);
        //console.log(data)
        data = {};
        data.totallpage = page.totPage;
        data.start = start;
        data.list = list;
        return data;
    },

    replyData : async (groupNum) =>{
        let repData = await dao.boardRead.replyData(groupNum);
        repData = common.timeModify(repData.rows);
        console.log("re : ", repData)
        return repData;
    },
    category_id : async(category_id) =>{
        let data = await dao.boardRead.categoryById(category_id);
        // data = common.timeModify(data.rows);
        return data;
    },
    searchPosts : async(keyword)=>{
            const results = await dao.searchPosts(keyword);
            return results;
    },
    incrementViews: async (BOARD_ID) => {
        await dao.incrementViews(BOARD_ID);
    },

    getPost: async (BOARD_ID) => {
        return await dao.getPostById(BOARD_ID);
    }
};

    // start = 몇번째 페이지, totalCounter = 총 게시물 개수
    // totpage = 총 페이지 개수
    // startNum = start가 알려준 페이지의 첫번쨰 게시물 번호
    // endNum = start가 알려준 페이지의 마지막 게시물 번호
    const pageOperation = (start, totalCounter)=>{
        let page = {};
        const pageNum = 30;
        const num = (totalCounter % pageNum === 0)? 0 : 1;

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

module.exports ={boardRead,pageOperation,getMessage};