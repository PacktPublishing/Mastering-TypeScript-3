import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface INameId {
    id: number;
    name: string;
}

export interface IManufacturer extends INameId {
    logo: string;
}

export interface IBoardSize {
    board_id: number;
    volume: number;
    width: number;
    length: number;
    sail_min: string;
    sail_max: string;
}

export interface IBoardType {
    board_id: number;
    board_type_id: number;
    board_type_name: string;
}

export interface IBoard extends INameId {
    short_description: string;
    long_description: string;
    img: string;
    manufacturer_logo: string;
    mfid: number;
    mfname: string;
    mflogo: string;
}

@Injectable({
    providedIn: 'root'
})
export class BoardService {

    constructor(private httpClient: HttpClient) { }

    getManufacturerList(): Observable<IManufacturer[]> {
        return this.httpClient.get('/api/manufacturers') as Observable<IManufacturer[]>;
    }

    getBoardTypesList(): Observable<IBoardType[]> {
        return this.httpClient.get('/api/board-types') as Observable<IBoardType[]>
    }

    getBoardsList(): Observable<IBoard[]> {
        return this.httpClient.get('/api/boards') as Observable<IBoard[]>;
    }

    getBoardDetails(boardId: number): Observable<IBoard> {
        return this.httpClient.get(`/api/boards/${boardId}`) as Observable<IBoard>;
    }

    getBoardSizes(boardId: number): Observable<IBoardSize[]> {
        return this.httpClient.get(`/api/boards/${boardId}/sizes`) as Observable<IBoardSize[]>;
    }

    getBoardTypes(boardId: number): Observable<IBoardType[]> {
        return this.httpClient.get(`/api/boards/${boardId}/types`) as Observable<IBoardType[]>;
    }
}