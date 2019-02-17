import { Subject, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

export interface IBroadcastEvent {
    key: string;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class BroadcastService {
    private _eventBus: Subject<IBroadcastEvent>;

    constructor() {
        this._eventBus = new Subject<IBroadcastEvent>();
    }

    broadcast(key: string, data?: any) {
        this._eventBus.next({ key, data });
    }

    on(key: string): Observable<IBroadcastEvent> {
        return this._eventBus.asObservable()
            .pipe(filter(event =>
                event.key === key
            ));
    }
}