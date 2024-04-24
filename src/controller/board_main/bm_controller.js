const ser = require("../../service/board_main/bm_service")
const common = require("../../service/board_main/ser_common")
const fs = require("fs");

const path = require("path");


const logoPath = "../../../img/logo/banner_logo.png";
const logoBase64 = fs.readFileSync(path.join(__dirname, logoPath), 'base64');
const logoDataURI = `data:image/jpeg;base64,${logoBase64}`;

const bm_input = async (req, res) => {
    const data = await ser.boardRead.list(req.query.start);

    res.render("board/bm_input",{
        data,
        category_id : 4,
        list : data.list,
        start : data.start,
        totalPage : data.totalPage,
        logoDataURI
    });
}

const board_views = {
    data : async (req,res) => {
        const data = await ser.boardRead.data(req.params.num)
        const cmtdata = await ser.boardRead.cmtdata(req.params.num)
        // const username = req.session.username;
        console.log("data 잘들어와? : ", data)
        console.log("cmtdata 잘들어와? : ", cmtdata)
        res.render("board/data",{
            data,
            // username,       
            list : data.list,
            start : data.start,
            totalPage : data.totalPage, cmtdata,
            logoDataURI
        });
    },

    bm_free : async (req,res)=> {
        const data = await ser.boardRead.list(req.query.start);
        res.render("board/bm_free",{
            data,
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
            
    });
},
    news : async (req,res)=>{
        const data = await ser.boardRead.list(req.query.start);
        res.render("board/news", {
            data,
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
    });
    },
    bm_notice : async (req,res)=> {
        const data = await ser.boardRead.list(req.query.start);
        console.log("list : ", data.list);
        res.render("board/bm_notice",{
            data,
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
    })
},
    category_id : async (req,res) =>{
        let category_id = req.params.category_id;
        let list;
        if(category_id == 0 ){
            list = await ser.boardRead.category_id(category_id);
            console.log("list : ", list.length);
            num = list.length%20 == 0 ? 0 : 1;
            // console.log(num);
            page = Math.floor(list.length / 20) + num;
            // console.log(page)/;
        }else if(category_id ==1){
            list = await ser.boardRead.category_id(category_id)

        }else if(category_id ==2){
            list = await ser.boardRead.category_id(category_id)

        }  
        res.render("board/bm_input", {logoDataURI, list : list, category_id : category_id, page : page, start : 1});

    //  const category_id = await ser.boardRead.category_id(req.params.category_id);
    //  res.render("board/:category_id",{
    //     category_id,
    //     list : data.list,
    //     start : data.start,
    //     totalPage : data.totalPage,
    //     logoDataURI
    //  })   
    }


    // rep_register : async(req,res)=>{
    //     const data = await ser.boardInsert.register(req.body);
    //     console.log("ddd:" ,data)
    //     res.json(data)
    // }

}
rep_views = {
replyData : async (req,res)=>{
    const result = await ser.boardRead.replyData(req.params.groupNum);
    res.json(result);
}
}
module.exports ={bm_input,board_views,rep_views}