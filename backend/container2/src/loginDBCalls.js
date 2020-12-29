const config = require('./loginConfig');
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
        console.log('error1',error1);
        throw error1;
    }
    connec.query(dbname, function (error2, result) {
        if (error2) {
            console.log('error2',error2);
            throw error2;
        }
    });
});


module.exports.login = function (object, callback) {

    let userDetailsQuery = `select * from user_details where email = '${object.email}' 
                    and password = '${object.password}' ;`;

    connec.query(userDetailsQuery, (error1, result1) => {
 
        if(error1) {
            return callback('0');
        } else if(result1 && result1.length > 0) {

            let userStateQuery = `select * From user_state where email = '${object.email}' and logouttime is null;`;
            connec.query(userStateQuery, (error2, result2) => {
                if(error2){
                    return callback('0');
                } else if(result2 && result2.length > 0){
                    return callback('2');
                } else {
                    return callback('3');
                }
            });

        } else {
            return callback('1');
        }
    });

};


module.exports.insertState = function (object, callback) {

    let insertUserState = `insert into user_state (email, userstate, logintime, logouttime) values 
                ('${object.email}', '${object.state}', sysdate(), null);`;
    
    connec.query(insertUserState, (error1, result1) => {
        if(error1) {
            console.log(error1);
            return callback('0');
        }
        else{
            return callback('8');
        }
    });

};

module.exports.updateState = function (object, callback) {

    let updateState = `update user_state set logouttime = sysdate(), userstate='offline' where email = '${object.email}' 
                            and userstate = 'online';`;
        
        connec.query(updateState, (error1, result1) => {
            if(error1) {
                return callback('0');
            }
            else {
                return callback('7');
            }
        });
    
};


