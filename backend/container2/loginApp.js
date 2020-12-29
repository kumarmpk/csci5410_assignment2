const express = require('express');
const app = express();
const dbcalls = require('./src/loginDBCalls');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Welcome to backend server. Backend server is up and running.');
});


app.post('/login', (req, res) => {
    
    console.log('login 1');
    let obj = req.body;

    dbcalls.login(obj, (output1)=>{
        console.log('login 2');
        if(output1 === '3'){
            console.log('login 3');
            obj.state='online';

            dbcalls.insertState(obj, (insertOutput) => {
                console.log('login 4');
                res.send(insertOutput);
            });
        } else {
            console.log('login 5');
            res.send(output1);
        }
    });
});


app.post('/forcelogin', (req, res) => {

    let obj = req.body;
    console.log('for ob 1', obj);
    dbcalls.updateState(obj, (output1)=>{
    
        if(output1 === '7'){
            console.log('for ob 2', obj);
            dbcalls.login(obj, (output2)=>{

                if(output2 === '3'){

                    obj.state= 'online';

                    dbcalls.insertState(obj, (output3) => {
                        console.log('for ob 3', obj);
                        return res.send(output3);
                    });
                } else {
                    return res.send(output2);
                }
            });
        } else {
            return res.send(output1);
        }
    });
    console.log('for ob 4', obj);
});
    

const port = 3002;

app.listen(port, () => {
    console.log(`listening to ${port}...`);
});

module.exports = app;

