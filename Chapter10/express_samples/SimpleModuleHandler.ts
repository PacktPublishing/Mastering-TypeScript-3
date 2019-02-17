
import express from 'express';

export function processRequest(req: express.Request, res: express.Response) {
    console.log(`SimpleModuleHandler.processRequest`);
    res.send('Hello World');
};
