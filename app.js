const express = require('express');
const app = express();
const db = require('./mysql');
const queries = require('./queries');
var bodyParser = require('body-parser');
var port = 10240;

app.use(bodyParser.json());

app.listen(port, () => { console.log(`APPLICATION STARTED ON PORT ${port}`) });

// Account APIs
app.post('/account/login', (req, res) => {
    try {
        var email = req.body.email;
        var password = req.body.pass;

        db.run(queries.Login(email, password),
            (message) => {
                var id = '';
                if (message.length > 0)
                    id = message[0].ID;

                if (id > 0) {
                    res.write(`Login was successful, UserId: ${id}`);
                    console.log(`Login was successful, UserId: ${id}`);
                }
                else {
                    res.write(`Login ecnountered error! Please specify valid EMAIL and PASSWORD`);
                    console.log('Login ecnountered error! Please specify valid EMAIL and PASSWORD. ');
                }

                res.end();
                return;
            },
            (error) => {
                res.write(`Login ecnountered error! Please specify valid EMAIL and PASSWORD`);
                console.log('Login ecnountered error! Please specify valid EMAIL and PASSWORD. ', error);
                res.end();
                return;
            });

    } catch (er) {
        res.send('Error: ' + er)
    }

});
app.post('/account/register', (req, res) => {

    try {
        var email = req.body.email;
        var password = req.body.pass;

        db.run(queries.Register(email, password),
            (message) => {

                res.write(`Register was successful`);
                console.log(`Register was successful`);
                res.end();
                return;
            },
            (error) => {
                res.write(`Register ecnountered error! Please specify valid EMAIL and PASSWORD`);
                console.log('Register ecnountered error! Please specify valid EMAIL and PASSWORD. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});

// Weather APIs
app.post('/weather/save', (req, res) => {
    try {
        var userId = req.body.userId;
        var sun = req.body.sun;
        var water = req.body.water;
        var progress = req.body.progress;

        db.run(queries.Save(userId, sun, water, progress),
            (message) => {

                res.write(`Weather information saved successfully.`);
                console.log(`Weather information saved successfully.`);
                res.end();
                return;
            },
            (error) => {
                res.write(`Error saving weather information`);
                console.log('Error saving weather information. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});
app.get('/weather/fetch', (req, res) => {
    try {
        var userId = req.query['user'];

        db.run(queries.Fetch(userId),
            (message) => {

                res.send(message);
                console.log(`Weather information read successfully.`);
                return;
            },
            (error) => {
                res.write(`Error saving weather information`);
                console.log('Error saving weather information. ', error);
                res.end();
                return;
            });
    } catch (er) {
        res.send('Error: ' + er)
    }
});
