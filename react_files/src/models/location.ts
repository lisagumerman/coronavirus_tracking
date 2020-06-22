import {dateEntry} from "./date-entry";

export class location {

    constructor(public name : string, public id: number, public type: string, public date_entries: dateEntry[], public children ?: location[]) {
    }
}