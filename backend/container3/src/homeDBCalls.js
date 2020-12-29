const config = require('./homeConfig');
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

module.exports.logout = function (email, callback) {

    let updateState = `update user_state set logouttime = sysdate(), userstate='offline' where email = '${email}' 
                            and userstate = 'online';`;
        
    connec.query(updateState, (error1, result1) => {
        if(error1) {
            return callback('0');
        }
        else {
            return callback('12');
        }
    });
};


module.exports.getUserDetails = function (callback) {

    let getUserDetailsQuery = `select dtls.name as name, dtls.email as email from user_state state, user_details dtls
                                where dtls.email = state.email and state.userstate = 'online';`;

    connec.query(getUserDetailsQuery, (error, result) => {
        if(error){
            return callback('0');
        } else {
            return callback(result);
        }
    });

}
