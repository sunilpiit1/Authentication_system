const mysql  = require('mysql');
const pool  = mysql.createPool({

    host:"db4free.net" , port:3306,
    user:"jesse1254" ,password:"Yadpal@1111",
    database:"data_base_1111" , connectionLimit:100,
    multipleStatements:true
});
module.exports = pool;
