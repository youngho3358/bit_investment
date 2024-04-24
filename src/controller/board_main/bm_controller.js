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
    },
    search : async (req, res) => {
            const keyword = req.query.keyword;
            const results = await ser.searchPosts(keyword);
            res.render('search', { results });
    },
    getPost: async (req, res) => {
        const BOARD_ID = req.params.BOARD_ID;
        try {
            await ser.incrementViews(BOARD_ID);
            const post = await ser.getPost(BOARD_ID); // 게시물 데이터 가져오기
            res.render("data", { post }); // 게시물 데이터를 전달하여 data.ejs를 렌더링
        } catch (error) {
            console.log("조회수 증가 오류", error);
            res.status(500).send("조회수 증가 중 오류가 발생했습니다.");
        }
    }
}
rep_views = {
replyData : async (req,res)=>{
    const result = await ser.boardRead.replyData(req.params.groupNum);
    res.json(result);
}
}
module.exports ={bm_input,board_views,rep_views}