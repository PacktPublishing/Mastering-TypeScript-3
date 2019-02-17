import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IMediatorImpl, Mediator, StateType } from 'src/app/StateMediator';
import { SidenavComponent } from 'src/app/sidenav/sidenav.component';
import { RightscreenComponent } from 'src/app/rightscreen/rightscreen.component';

@Component({
    selector: 'app-secure',
    templateUrl: './secure.component.html',
    styleUrls: ['./secure.component.css']
})
export class SecureComponent implements IMediatorImpl, AfterViewInit {
    title = 'angular-sample';
    isSideNavVisible = true;

    @ViewChild(SidenavComponent)
    private sideNav: SidenavComponent;

    @ViewChild(RightscreenComponent)
    private rightScreen: RightscreenComponent;

    mediator: Mediator = new Mediator(this);

    ngAfterViewInit() {
        this.mediator.moveToState(StateType.MainPanelWithSideNav);
    }

    showHideSideClicked() {
        this.mediator.showHideSideNavClicked();

    }

    buttonClickedDetail() {
        this.mediator.moveToState(StateType.DetailPanel);
    }

    closeClicked() {
        document.getElementById('myRightScreen')
            .style.transform = "translateX(100%)";
        document.getElementById('main')
            .style.transform = "translateX(0%)";
    }

    onNotifyRightWindow(message: string): void {
        this.mediator.moveToState(
            this.mediator.getCurrentMainPanelState());
    }

    showNavPanel() {
        this.sideNav.showNav();
        document.getElementById('main').style.marginLeft = "250px";
    }
    hideNavPanel() {
        this.sideNav.closeNav();
        document.getElementById('main').style.marginLeft = "0px";
    }
    showDetailPanel() {
        this.rightScreen.openRightWindow();
        document.getElementById('main').style.transform =
            "translateX(-100%)";
    }
    hideDetailPanel() {
        this.rightScreen.closeRightWindow();
        document.getElementById('main').style.transform =
            "translateX(0%)";
    }
    changeShowHideSideButton(fromClass: string, toClass: string) {
        if (fromClass.length > 0 && toClass.length > 0) {
            console.log(`change : from : ${fromClass}, ${toClass}`);
            document.getElementById('show-hide-side-button')
                .classList.remove(fromClass);
            document.getElementById('show-hide-side-button')
                .classList.add(toClass);
        }
    }
}
