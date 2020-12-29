const express = require('express');
const app = express();
const dbcalls = require('./src/homeDBCalls');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Welcome to backend server. Backend server is up and running.');
});

app.get('/home', (req, res) => {

    console.log('get home');
    let returnObj;

    dbcalls.getUserDetails((getUserDetailsOutput) => {
        if(getUserDetailsOutput !== '0' || getUserDetailsOutput !== 0){
            returnObj = {
                status: '9',
                records: getUserDetailsOutput
            } 
            console.log('returnObj', returnObj);
            return res.send(returnObj);
        } else {
            returnObj = {
                status: '0'
            } 
            console.log('returnObj', returnObj);
            return res.send(returnObj);
        } 
    });
});


app.post('/logout', (req, res) => {
    
    console.log('logout');
    console.log('req', req);

    let obj = req.body;

    console.log('obj', obj);

    console.log('email', obj.email);

    dbcalls.logout(obj.email, (output1)=>{
        return res.send(output1);
    });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log(`listening to ${port}...`);
});

module.exports = app;