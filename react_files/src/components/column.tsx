import * as React from "react";

export interface ColumnProps { location: any }

export class Column extends React.Component<ColumnProps, {}> {

    render() {
        return <h1>Hello from {this.props.location.name}</h1>
    }

}