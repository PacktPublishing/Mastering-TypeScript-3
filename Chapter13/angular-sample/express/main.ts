
import express from 'express';
import path from 'path';
import config from 'config';
import fs from 'fs';
import rfs from "rotating-file-stream";
import moment from 'moment-timezone';
import * as bodyParser from 'body-parser';


import * as userRoutes from './routes/userRoutes';

enum ConfigOptions {
    PORT = 'port',
    TIMEZONE = 'timezone'
}

let timezone = "Australia/Perth";
let port = 9000;

var logDirectory = path.join(__dirname, 'log')

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('main.log', {
    interval: '10s', // rotate every 10 seconds
    path: logDirectory,
    maxFiles: 7
});


if (config.has(ConfigOptions.PORT)) {
    port = config.get(ConfigOptions.PORT);
} else {
    serverLog(`no port configuration found, using default : ${port}`);
}

if (config.has(ConfigOptions.TIMEZONE)) {
    timezone = config.get(ConfigOptions.TIMEZONE);
} else {
    serverLog(`no timezone specified, using ${timezone}`)
}


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

export function serverLog(message: string) {
    let now = moment.tz(timezone);
    let nowISOFormat = now.toISOString();
    let nowLocalFormat = now.format('YYYY-MM-DD HH:mm:ss.SSS');
    let logMessage = `UTC : ${nowISOFormat} : local : ${nowLocalFormat} : ${message}`;
    accessLogStream.write(`${logMessage}\n`);
    console.log(logMessage);
}

app.use('/', userRoutes.router);

app.use(`/`, express.static(__dirname + '/angular-sample'));

app.get(`*`, (req: any, res: any) => {
    res.status(200).sendFile(path.join(__dirname + '/angular-sample/index.html'));
});

// setInterval(() => {
//     serverLog(`timeout reached`);
// }, 500);


app.listen(port, () => {
    serverLog(`Express server listening on PORT: ${port}`);
});

