import React, {Component, ReactNode} from "react";
import {location} from "../models/location";
import {Column} from "./column";

export interface TableProps { locations: location[], type ?: string }

export class Table extends Component<TableProps, {}> {

    render() : ReactNode{
        let columns;

        if (typeof this.props.locations === 'undefined') {
            columns = 'Waiting for data';
        } else if (this.props.locations.length === 0) {
            columns = 'No data available'
        }
        else {
            columns = this.props.locations.map((location : location) => {
                return <Column location={location} key={location.id} />
            })
        }

        return (
            <div className="table">
                {columns}
            </div>
        )
    }
}