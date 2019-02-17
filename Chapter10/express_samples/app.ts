import express from 'express';
let app = express();

import * as Index from './routes/Index';
import * as Login from './routes/Login';

import * as path from 'path';
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ secret: 'asdf' }));

// existing code
app.use('/', Index.router);
app.use('/', Login.router);

app.listen(3000, () => {
    console.log(`listening on port 3000`);
});