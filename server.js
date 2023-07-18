/* eslint-disable no-param-reassign */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('./server');
console.log({ starting: true });

const app  = express();
const DATA_FILE = path.join(__dirname,'data.json');

app.set('port',process.env.PORT||3000);

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

// handle GET -> /api/timers
app.get('/api/timers',(req,res)=>{

    fs.readFile(DATA_FILE,(err,data)=>{
        res.setHeader('Cache-Control','no-cache');
        res.json(JSON.parse(data));
    });

});

// handle post to /api/timers
app.post('/api/timers',(req,res)=>{

    fs.readFile(DATA_FILE,(err,data)=>{
        const timers = JSON.parse(data);

        const newTimer ={
            id: req.body.id,
            title: req.body.title,
            project: req.body.project,
            elapsed:0,
            runningSince:null
        };

        timers.push(newTimer);
        fs.writeFile(DATA_FILE,JSON.stringify(timers,null,4),()=>{
            res.setHeader('Cache-Control','no-cache');
            res.json(timers);
        });

    });
});

app.listen(app.get('port'),()=>{
    console.log({ running: true });
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
})