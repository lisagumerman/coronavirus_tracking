import {location} from "./location";
import {detail} from "./detail";

export class dateEntry {

    constructor(public location : location, public date: Date, public value: number, public id: number, public detail ?: detail) {
    }

}