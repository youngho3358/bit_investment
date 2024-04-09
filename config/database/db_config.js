const dbConfig = { 
    user : "admin", 
    password : "Oracle1234567",
    connectString : "(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.us-chicago-1.oraclecloud.com))(connect_data=(service_name=g72f610f5f11b4c_orcl_high.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))" 
}
module.exports = dbConfig;
    
    