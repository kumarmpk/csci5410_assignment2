const express = require('express');
const app = express();
const dbcalls = require('./src/regDBCalls');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('Welcome to backend server. Backend server is up and running.');
});



app.post('/register', (req, res) => {
    
    const obj = req.body;
    
    dbcalls.register(obj, (output) => {
        return res.send(output);
    });

});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`listening to ${port}...`);
});

module.exports = app;