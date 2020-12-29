const config = require('./regConfig');
const mysql = require('mysql');

let dbname = "use " + config.dbname;

let connec = mysql.createConnection({
    host : config.host,
    user : config.user,
    password : config.password,
    port : config.port
});

connec.connect(function(error1) {
    if (error1){
        throw error1;
    }
    connec.query(dbname, function (error2, result) {
        if (error2) {
            throw error2;
        }
    });
});

module.exports.register = function (object, callback) {

    let selectUserDetails = `select * From user_details where email = '${object.email}';`;

    connec.query(selectUserDetails, (error1, result1) => {
        if(error1){
            return callback('0');
        } 
        else if(result1 && result1.length > 0) {
            return callback('5');
        } 
        else {

            let insertQuery = `insert into user_details (name, email, password, topic) values 
                            ('${object.name}', '${object.email}', '${object.password}', '${object.topic}');`;

            connec.query(insertQuery, (error2, result2) => {
                if(error2) {
                    return callback('0');
                }
                else{
                    return callback('6');
                }
            });
        }
    });

};

