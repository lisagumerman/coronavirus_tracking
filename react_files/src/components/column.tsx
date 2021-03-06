import React, {Component, ReactNode} from "react";
import {location} from "../models/location";
import {dateEntry} from "../models/date-entry";
import {Link} from "react-router-dom";

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
                        <div className="value">{entry.date}</div>
                        <div className="value">{entry.value}</div>
                    </div>
                )
            })
        }

        return (
            <div className="column">
                <div className="header">
                    <Link to={"/" + this.props.location.id}>{this.props.location.name}</Link>
                </div>
                <div className="entries">
                    {dateEntries}
                </div>
            </div>
        )
    }
}