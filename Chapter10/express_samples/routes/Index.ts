import express from 'express';
var router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
    //let userName = req.session['username'];
    // res.send(`Index module processed ${req.url}`);

    res.render('index',
        {
            title: 'Express'
            , username: req.session!['username']
        }
    );
});

export { router };