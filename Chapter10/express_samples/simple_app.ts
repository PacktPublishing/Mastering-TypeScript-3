import express from 'express';
import { processRequest } from './SimpleModuleHandler';

// import {ServerMain} from './ServerMain';
// import {ServerMainIndex} from './ServerMainIndex';

let app = express();

// app.get('/', (req: express.Request, res: express.Response) => {
//     res.send('Hello World');
// });

app.get('/', processRequest);

app.listen(3000, () => {
    console.log(`listening on port 3000`);
});