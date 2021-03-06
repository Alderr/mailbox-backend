'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.Promise = global.Promise;

const userRouter = require('./routers/userRouter');
const campaignRouter = require('./routers/campaignRouter');
const eventDataRouter = require('./routers/eventDataRouter');
const listRouter = require('./routers/listRouter');
const loginRouter = require('./routers/loginRouter');
const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/campaign', campaignRouter);
app.use('/eventData', eventDataRouter);
app.use('/list', listRouter);
app.use('/login', loginRouter);

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Home!');
});

app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer().catch(err => console.error(err)); // eslint-disable-line
}

module.exports = { runServer, app, closeServer };
