import { Component, OnInit } from '@angular/core';
import { IManufacturer, IBoardType, BoardService } from '../services/board.service';
import { BroadcastService } from '../services/broadcast.service';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';

export interface IManufacturerCheck extends IManufacturer {
    checked: boolean;
}

export interface IBoardTypeCheck extends IBoardType {
    checked: boolean;
}


@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    manufacturerCheckList: IManufacturerCheck[] = [];
    boardTypeCheckList: IBoardTypeCheck[] = [];

    constructor(private boardService: BoardService,
        private broadcastService: BroadcastService) { }


    ngOnInit() {
        let manufacturerListObservable = this.boardService.getManufacturerList();
        let boardTypesListObservable = this.boardService.getBoardTypesList();

        forkJoin([manufacturerListObservable, boardTypesListObservable]).subscribe((results) => {
            for (let manufacturer of <any>results[0]) {
                manufacturer.checked = true;
            }
            this.manufacturerCheckList = <any>results[0];
            console.log(`Sidenav : manufacturerCheckList : ${JSON.stringify(this.manufacturerCheckList)}`)

            for (let boardType of <any>results[1]) {
                boardType.checked = true;
            }
            this.boardTypeCheckList = <any>results[1];

        }, (err: Error) => {
            console.log(`error : ${JSON.stringify(err)}`);
        });
    }

    closeNav() {
        document.getElementById('mySidenav')
            .style.width = "0px";
    }

    showNav() {
        document.getElementById('mySidenav')
            .style.width = "250px";
    }

    onManufacturerChanged() {
        let checkedItems = _.where(this.manufacturerCheckList, { checked: true });

        let manufIds = _.map(checkedItems, (manufacturer) => { return manufacturer.id });
        console.log(`onManufacturerChanged : checked : ${JSON.stringify(manufIds)}`);

        this.broadcastService.broadcast('manufacturer-changed', manufIds);

    }

    onBoardTypeChanged() {

        let checkedItems = _.where(this.boardTypeCheckList, { checked: true });

        let boardTypes = _.map(checkedItems, (boardType) => { return boardType.id });

        this.broadcastService.broadcast('board-types-changed', boardTypes);
    }

}
