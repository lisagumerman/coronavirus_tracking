import React, {Component, ReactNode} from "react";
import {location} from "../models/location";
import {dateEntry} from "../models/date-entries";

export interface ColumnProps { location: location }

export class Column extends Component<ColumnProps, {}> {

    render() : ReactNode{
        return (
            <div className="column">
                <div className="header">
                    {this.props.location.name}
                </div>
                <div className="entries">
                    {this.props.location.dateEntries.map((entry : dateEntry) => (
                      <div className="entry" key={entry.id}>
                          <div className="date">{entry.date}</div>
                          <div className="value">{entry.value}</div>
                      </div>
                    ))
                    }
                </div>
            </div>
        )
    }
}