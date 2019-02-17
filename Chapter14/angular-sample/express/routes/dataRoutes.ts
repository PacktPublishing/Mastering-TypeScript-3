import * as express from 'express';
import { serverLog } from '../main';
import { Database } from 'sqlite3';

var router = express.Router();

const databaseName = './database/board_sales_db.db';

router.get(`/boards`, async (req: any, res: any, next: any) => {

    serverLog(`GET /boards`);
    let db = new Database(databaseName);

    let boardsArray: any[] = [];

    db.each(`select b.id, b.name, b.short_description, 
    b.long_description, b.img, 
    bm.manufacturer_id as mfid, 
    mf.name as mfname, 
    mf.logo as mflogo 
    from Board b 
    INNER JOIN BoardManufacturer bm 
    ON b.id = bm.board_id 
    INNER JOIN Manufacturer mf 
    ON bm.manufacturer_id = mf.id`, (err: Error, row: any) => {
            serverLog(`err: ${err}, row : ${row.id} | ${row.name} | ${row.logo}`);
            let board = { id: row.id, name: row.name, short_description: row.short_description, long_description: row.long_description, img: row.img, mfid: row.mfid, mfname: row.mfname, mflogo: row.mflogo };
            boardsArray.push(board);

        }, (err: Error, count: number) => {
            // complete

            if (err) {
                serverLog(`err : ${err}`);
                res.status(503).send(err);
            } else {
                res.json(boardsArray);
            }
        });

});

router.get(`/manufacturers`, (req: any, res: any, next: any) => {

    serverLog(`GET /manufacturers`);
    let db = new Database(databaseName);

    let manufacturersArray: any[] = [];

    db.each(`select id, name, logo from Manufacturer`, (err: Error, row: any) => {
        manufacturersArray.push({ id: row.id, name: row.name, logo: row.logo })

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(manufacturersArray);
        }
    });

});

router.get(`/board-types`, (req: any, res: any, next: any) => {

    serverLog(`GET /board-types`);
    let db = new Database(databaseName);

    let boardTypeArray: any[] = [];

    db.each(`select id, name from BoardType`, (err: Error, row: any) => {
        boardTypeArray.push({ id: row.id, name: row.name });

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(boardTypeArray);
        }
    });

});

router.get(`/board-manufacturers`, (req: any, res: any, next: any) => {

    serverLog(`GET /board-manufacturers`);
    let db = new Database(databaseName);

    let boardTypeArray: any[] = [];

    db.each(`select id, board_id, manufacturer_id from BoardManufacturer`, (err: Error, row: any) => {
        boardTypeArray.push({ id: row.id, board_id: row.board_id, manufacturer_id: row.manufacturer_id });

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(boardTypeArray);
        }
    });

});

router.get(`/boards/:boardId`, (req: any, res: any, next: any) => {

    let boardId = req.params.boardId;
    serverLog(`GET /boards/${boardId}/sizes`);
    let db = new Database(databaseName);

    let board: any = {};

    let sqlString = `select b.id, b.name, b.short_description, b.long_description, b.img, bm.manufacturer_id as mfid, 
        mf.name as mfname, mf.logo as mflogo 
        from Board b 
        INNER JOIN BoardManufacturer bm 
        ON b.id = bm.board_id 
        INNER JOIN Manufacturer mf 
        ON bm.manufacturer_id = mf.id 
        where b.id=${boardId}`;
    db.each(sqlString, (err: Error, row: any) => {
        board = { id: row.id, name: row.name, short_description: row.short_description, long_description: row.long_description, img: row.img, mfid: row.mfid, mfname: row.mfname, mflogo: row.mflogo };

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(board);
        }
    });

});

router.get(`/boards/:boardId/sizes`, (req: any, res: any, next: any) => {

    let boardId = req.params.boardId;
    serverLog(`GET /boards/${boardId}/sizes`);
    let db = new Database(databaseName);

    let boardSizeArray: any[] = [];

    let sqlString = `select board_id, volume, length, width, sail_min, sail_max from BoardSize where board_id=${boardId}`;

    db.each(sqlString, (err: Error, row: any) => {
        boardSizeArray.push({ board_id: row.board_id, volume: row.volume, length: row.length, width: row.width, sail_min: row.sail_min, sail_max: row.sail_max });

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(boardSizeArray);
        }
    });

});

router.get(`/boards/:boardId/types`, (req: any, res: any, next: any) => {

    let boardId = req.params.boardId;
    serverLog(`GET /boards/${boardId}/types`);
    let db = new Database(databaseName);

    let boardSizeArray: any[] = [];

    let sqlString = `select b.id, bbt.board_type_id, bt.name from Board b 
    INNER JOIN BoardBoardType bbt ON b.id = bbt.board_id
    INNER JOIN BoardType bt ON bbt.board_type_id = bt.id
    where b.id = ${boardId}`;

    db.each(sqlString, (err: Error, row: any) => {
        boardSizeArray.push({ board_id: row.id, board_type_id: row.board_type_id, board_type_name: row.name });

    }, (err: Error, count: number) => {
        // complete

        if (err) {
            serverLog(`err : ${err}`);
            res.status(503).send(err);
        } else {
            res.json(boardSizeArray);
        }
    });

});

export { router };

