import React, {Component, ReactNode} from "react";
import {location} from "../models/location";
import {dateEntry} from "../models/date-entries";

export interface ColumnProps { location: location }

export class Column extends Component<ColumnProps, {}> {

    render() : ReactNode{
        let dateEntries;

        if (typeof this.props.location.date_entries === 'undefined')
            dateEntries = 'Waiting for data';
        else {
            dateEntries = this.props.location.date_entries.map((entry : dateEntry) => {
                return (
                    <div className="entry" key={entry.id}>
                        <div className="date">{entry.date}</div>
                        <div className="value">{entry.value}</div>
                    </div>
                )
            })
        }

        return (
            <div className="column">
                <div className="header">
                    {this.props.location.name}
                </div>
                <div className="entries">
                    {dateEntries}
                </div>
            </div>
        )
    }
}