import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RightscreenComponent } from './rightscreen/rightscreen.component';
import { IMediatorImpl, Mediator, StateType } from './StateMediator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent { }

