import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IBoardExtended } from '../board-list/board-list.component';

@Component({
    selector: 'app-rightscreen',
    templateUrl: './rightscreen.component.html',
    styleUrls: ['./rightscreen.component.css']
})
export class RightscreenComponent implements OnInit {

    board: IBoardExtended;

    setBoard(value: IBoardExtended) {
        console.log(`Rightscreen : setBoard received : ${JSON.stringify(value, null, 4)}`);
        this.board = value;
    }

    constructor() { }

    ngOnInit() {
    }

    @Output() notify: EventEmitter<string>
        = new EventEmitter<string>();

    closeClicked() {
        this.notify.emit('Click from nested component');
    }

    closeRightWindow() {
        document.getElementById('myRightScreen')
            .style.transform = "translateX(100%)";
    }

    openRightWindow() {
        document.getElementById('myRightScreen')
            .style.transform = "translateX(0%)";
    }

}
