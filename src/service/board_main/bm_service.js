const dao = require("../../database/board_main/bm_dao")
const common = require("./ser_common");

boardUpdate ={
    upHit : (num) =>{
        dao.boardUpdate.upHit(num);
    }
}
const boardRead ={
    data : async (num)=>{
        dao.boardUpdate.upHit(num);
        data = common.timeModify(data.rows);
        return data[0];
    },
    list : async (start) =>{
        const totalCounter = await dao.boardRead.totalContent();
        start = (start && start >1)?Number(start) :1;
        const page = pageOperation(start, totalCounter);

        let list = await dao.boardRead.list(page.startNum, page.endNum);
        data = {};
        data.totalpage = page.totpage;
        data.start = start;
        data.list = list;
        return data;
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

const boardInsert = {
    write : async (body, file, fileValidation ) => {
        let msg, url;
        if( fileValidation ){
            msg = fileValidation;
            url = "/board/write_form";
            return common.getMessage(msg, url);
        }
        console.log("file : ", file);
        if( file !== undefined ){
            body.origin_file_name = file.originalname;
            body.change_file_name = file.filename;
        }else{
            body.origin_file_name = "nan";
            body.change_file_name = "nan";
        }
    }
}

module.exports ={boardUpdate,boardRead,pageOperation,boardInsert};