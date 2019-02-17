import { Component, OnInit } from '@angular/core';
import { BoardService, IBoard, IBoardSize, IBoardType } from '../services/board.service';
import { from, forkJoin } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';
import { BroadcastService, IBroadcastEvent } from '../services/broadcast.service';
import * as _ from 'underscore';

export interface IBoardExtended extends IBoard {
    sizes?: IBoardSize[];
    types?: IBoardType[];
}

@Component({
    selector: 'app-board-list',
    templateUrl: './board-list.component.html',
    styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

    boardList: IBoardExtended[] = [];
    selectedManufacturerList: number[] = [];
    selectedBoardTypeList: number[] = [];

    constructor(private boardService: BoardService,
        private broadcastService: BroadcastService) {
        _.bindAll(this, [`onManufacturerSelectedEvent`, `onBoardTypeSelectedEvent`]);
        this.broadcastService.on('manufacturer-changed').subscribe(this.onManufacturerSelectedEvent);
        this.broadcastService.on('board-types-changed').subscribe(this.onBoardTypeSelectedEvent);
    }

    onManufacturerSelectedEvent(event: IBroadcastEvent) {
        this.selectedManufacturerList = event.data;
        this.loadAndFilterBoardList();
    }

    onBoardTypeSelectedEvent(event: IBroadcastEvent) {
        this.selectedBoardTypeList = event.data;
        this.loadAndFilterBoardList();
    }

    buttonClickedDetail(board: IBoard) {
        this.broadcastService.broadcast('board-detail-clicked', board);
    }

    ngOnInit() {
        this.loadAndFilterBoardList();
    }

    loadAndFilterBoardList() {
        this.boardService.getBoardsList().subscribe((result: IBoardExtended[]) => {
            let boardSizes = from(<IBoard[]>result).pipe(
                concatMap(
                    // first function
                    (board: IBoardExtended) => {
                        return this.boardService.getBoardSizes(board.id);
                    },
                    // second function
                    (board: IBoardExtended, sizes: IBoardSize[]) => {
                        board.sizes = sizes;
                        return result;
                    })
            );
            let boardListTypes = from(<IBoard[]>result).pipe(
                
                concatMap((board: IBoardExtended) => {
                    return this.boardService.getBoardTypes(board.id);
                }, (board: IBoardExtended, types: IBoardType[]) => {
                    board.types = types;
                    return result;
                })
            );

            forkJoin([boardSizes, boardListTypes]).subscribe((result) => {
                this.boardList = [];

                from(result[0]).pipe(filter((board: IBoardExtended) => {

                    let boardTypeIds = _.map(board.types, (type: IBoardType) => { return type.board_type_id });

                    let boardTypeFound = true;
                    if (this.selectedBoardTypeList.length > 0) {
                        boardTypeFound = false;
                        for (let type of boardTypeIds) {
                            if (_.contains(this.selectedBoardTypeList, type)) {

                                boardTypeFound = true;
                                break;
                            }
                        }
                    }

                    if (this.selectedManufacturerList.length > 0) {
                        return (_.contains(this.selectedManufacturerList, board.mfid) && boardTypeFound);
                    } else {
                        return boardTypeFound;
                    }
                })).subscribe((board: IBoard) => {
                    this.boardList.push(board);
                });

            });

        });
    }



}
