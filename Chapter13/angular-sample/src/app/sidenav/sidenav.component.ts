import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    closeNav() {
        document.getElementById('mySidenav')
            .style.width = "0px";
    }

    showNav() {
        document.getElementById('mySidenav')
            .style.width = "250px";
    }

}
