import * as express from 'express';
import { serverLog } from '../main';

// https://jwt.io/
// import * as _ from 'lodash';
var router = express.Router();

import * as jwt from "jsonwebtoken";
const jwtSecret = '0e4253ef-5e4f-4d62-8eeb-c80e36a68c8a';

router.post(`/login`, (req: any, res: any, next: any) => {
    serverLog(`POST /login`);

    if (req.body.username && req.body.username.length > 0
        && req.body.password && req.body.password.length > 0) {

        let user_context = {
            username: req.body.username
        }

        var token = jwt.sign(user_context, jwtSecret);
        res.json(token);

    } else {
        serverLog(`/login - Error : Invalid username or password`);
        res.status(401).send('Invalid username or password');
    }

});

router.post(`/validate-user`, (req: any, res: any, next: any) => {
    serverLog(`POST /validate-user`);

    console.log(`req.body : ${JSON.stringify(req.body)}`);

    if (req.body.token && req.body.token.length > 0) {

        try {
            let verifiedJwt = jwt.verify(req.body.token, jwtSecret);
            return res.json(verifiedJwt);
        } catch (err) {
            serverLog(`/validate-user : token error`);
            res.status(401).send('invalid auth token');
        }
    } else {
        serverLog(`/validate-user : token not found error`);
        res.status(401).send('Invalid auth token');
    }

});

// try {
//     if (req.headers) {
//         let req_cookie = req.get('XSRF-TOKEN');
//         var verifiedJwt = jwt.verify(req_cookie, `${Config.jwtSecret}-${Config.apiKey}`);
//         return res.json(verifiedJwt);
//     }
// } catch (err) {
//     console.log(`/${Config.wildflyUrl}/usersession - Error : ${JSON.stringify(err)}`);
// }
// return res.json({});

router.post(`/login-google`, (req: any, res: any, next: any) => {
    serverLog(`POST /login-google`);
    if (req.body.name && req.body.name.length > 0) {

        let user_context = {
            username: req.body.name
        }

        var token = jwt.sign(user_context, jwtSecret);
        res.json(token);

    } else {
        serverLog(`/login-google - Error : Invalid google token`);
        res.status(401).send('Invalid google token');
    }

});

export { router };