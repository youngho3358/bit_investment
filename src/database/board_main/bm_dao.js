const con = requrie("")
const boardRead ={
    data : async(num) =>{
        const sql = `select * from board where write_no ='${num}'`;
        const data = (await con).execute(sql);
        return data;
    },
    list : async (start, end)=>{
    }
}