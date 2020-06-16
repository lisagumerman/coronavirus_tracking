import {dateEntry} from "./date-entries";

export class location {
    name : string;
    id: number;
    type: string;
    dateEntries : dateEntry[];

    constructor(name : string, id: number, type: string, date_entries: dateEntry[]) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.dateEntries = date_entries;
    }
}