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
        list : data.list,
        start : data.start,
        totalPage : data.totalPage,
        logoDataURI
    });
}

const board_views = {
    data : async (req,res) => {
        const data = await ser.boardRead.data(req.params.num)
        // const username = req.session.username;
        res.render("board/data",{
            data,
            // username,       
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
        });
    },

    bm_free : async (req,res)=> {
        const data = await ser.boardRead.list(req.query.start);
        res.render("board/bm_free",{
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
            
    });
},
    bm_news : async (req,res)=>{
        const data = await ser.boardRead.list(req.query.start);
        res.render("board/bm_news", {
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
    });
    },
    bm_notice : async (req,res)=> {
        const data = await ser.boardRead.list(req.query.start);
        res.render("board/bm_notice",{
            list : data.list,
            start : data.start,
            totalPage : data.totalPage,
            logoDataURI
    })
},
    rep_views : async (req,res)=>{
        const replyData = await ser.boardRead.replyData(req.params.groupNum);
        res.json(replyData);
    },
    // rep_register : async(req,res)=>{
    //     const data = await ser.boardInsert.register(req.body);
    //     console.log("ddd:" ,data)
    //     res.json(data)
    // }

}
module.exports ={bm_input,board_views}