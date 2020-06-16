import React, {Component, ReactNode} from "react";
// eslint-disable-next-line
import {location} from "../models/location";
import {Column} from "./column";

export interface TableProps { locations: [], type ?: string }

export class Table extends Component<TableProps, {}> {

    render() : ReactNode{
        return (
            <div className="table">
                {this.props.locations.map((location : location) => (
                    <Column location={location} />
                ))
                }
            </div>
        )
    }
}