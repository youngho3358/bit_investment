const dbConfig = { 
    user : "admin", 
    password : "Oracle1234567",

    // 기존 시카고 region 주소
    // connectString : "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-chicago-1.oraclecloud.com))(connect_data=(service_name=g72f610f5f11b4c_orcl_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))" 

    // 한국 춘천 region 주소
    connectString : "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.ap-chuncheon-1.oraclecloud.com))(connect_data=(service_name=g793afe984bf47c_orcl_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))" 
}
module.exports = dbConfig;
    
    