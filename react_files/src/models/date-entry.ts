import {location} from "./location";

export class dateEntry {
    location : location;
    date: Date;
    value: number;
    id: number;

    constructor(location : location, date: Date, value: number, id: number) {
        this.location = location;
        this.date = date;
        this.value = value;
        this.id = id;
    }

}