export enum StateType {
    MainPanelOnly,
    MainPanelWithSideNav,
    DetailPanel
}

export enum PanelType {
    Primary,
    Detail
}

export interface IState {
    getPanelType(): PanelType;
    getStateType(): StateType;
    isSideNavVisible(): boolean;
    getPanelButtonClass(): string;
}

export class MainPanelOnly
    implements IState {
    getPanelType(): PanelType { return PanelType.Primary; }
    getStateType(): StateType { return StateType.MainPanelOnly; }
    getPanelButtonClass(): string { return 'fa-chevron-right'; }
    isSideNavVisible(): boolean { return false; }
}

export class MainPanelWithSideNav
    implements IState {
    getPanelType(): PanelType { return PanelType.Primary; }
    getStateType(): StateType {
        return StateType.MainPanelWithSideNav;
    }
    getPanelButtonClass(): string { return 'fa-chevron-left'; }
    isSideNavVisible(): boolean { return true; }
}

export class DetailPanel
    implements IState {
    getPanelType(): PanelType { return PanelType.Detail; }
    getStateType(): StateType { return StateType.DetailPanel; }
    getPanelButtonClass(): string { return ''; }
    isSideNavVisible(): boolean { return false; }
}

export interface IMediatorImpl {
    showNavPanel();
    hideNavPanel();
    showDetailPanel();
    hideDetailPanel();
    changeShowHideSideButton(fromClass: string, toClass: string);
}

export class Mediator {
    private _mainPanelState = new MainPanelOnly();
    private _detailPanelState = new DetailPanel();
    private _sideNavState = new MainPanelWithSideNav();

    private _currentState: IState;
    private _currentMainPanelState: IState;
    private _mediatorImpl: IMediatorImpl;

    constructor(mediatorImpl: IMediatorImpl) {
        this._mediatorImpl = mediatorImpl;
        this._currentState =
            this._currentMainPanelState
            = this._sideNavState;
    }

    getStateImpl(stateType: StateType): IState {
        var stateImpl: IState;
        switch (stateType) {
            case StateType.DetailPanel:
                stateImpl = this._detailPanelState;
                break;
            case StateType.MainPanelOnly:
                stateImpl = this._mainPanelState;
                break;
            case StateType.MainPanelWithSideNav:
                stateImpl = this._sideNavState;
                break;
        }
        return stateImpl;
    }

    moveToState(stateType: StateType) {
        var previousState = this._currentState;
        var nextState = this.getStateImpl(stateType);

        if (previousState.getPanelType() == PanelType.Primary &&
            nextState.getPanelType() == PanelType.Detail) {
            this._mediatorImpl.showDetailPanel();
        }
        if (previousState.getPanelType() == PanelType.Detail &&
            nextState.getPanelType() == PanelType.Primary) {
            this._mediatorImpl.hideDetailPanel();
        }

        if (nextState.isSideNavVisible())
            this._mediatorImpl.showNavPanel();
        else
            this._mediatorImpl.hideNavPanel();

        this._mediatorImpl.changeShowHideSideButton(
            previousState.getPanelButtonClass(),
            nextState.getPanelButtonClass());

        this._currentState = nextState;
        if (this._currentState.getPanelType() == PanelType.Primary) {
            this._currentMainPanelState = this._currentState;
        }
    }

    getCurrentMainPanelState(): StateType {
        return this._currentMainPanelState.getStateType();
    }

    showHideSideNavClicked() {
        switch (this._currentState.getStateType()) {
            case StateType.MainPanelWithSideNav:
                this.moveToState(StateType.MainPanelOnly);
                break;
            case StateType.MainPanelOnly:
                this.moveToState(StateType.MainPanelWithSideNav);
                break;
        }
    }
}
