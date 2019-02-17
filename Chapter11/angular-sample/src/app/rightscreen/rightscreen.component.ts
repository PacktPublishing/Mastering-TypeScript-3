import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-rightscreen',
    templateUrl: './rightscreen.component.html',
    styleUrls: ['./rightscreen.component.css']
})
export class RightscreenComponent implements OnInit {

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
