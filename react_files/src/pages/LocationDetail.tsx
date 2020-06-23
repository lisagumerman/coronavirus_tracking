import React, {Component, ReactNode} from "react";
import {RouteComponentProps} from "react-router-dom";
import {location} from "../models/location";
import {Table} from "../components/table";
import {dateEntry} from "../models/date-entry";
import {Helmet} from "react-helmet";

export interface DetailProps extends RouteComponentProps {
    locationId : number
}

export interface DetailState {
    location : location | null,
    titleName : string
}

export class LocationDetail extends Component<DetailProps, DetailState> {

    constructor(props :DetailProps) {
        super(props);

        this.state = {
            location : null,
            titleName : "Coronavirus Tracking"
        }
    }

    render() : ReactNode {
        if (this.state.location) {
            return(
                <div>
                    <Helmet>
                        <title>{this.state.titleName}</title>
                    </Helmet>
                    <h2>{this.state.location.name}</h2>
                    {this.renderDetails()}
                    {this.renderChildren()}
                </div>
            )
        } else {
            return (null);
        }
    }

    renderChildren() : ReactNode {
        if (this.state.location) {
            let type = this.state.location.type;

            if (type === "C") { return null; }

            let h3 = type === "N" ? "States" : "Counties"; //a switch would be nicer, but screw it

            if (this.state.location.children) {
                return (
                    <div>
                        <h3>{h3}</h3>
                        <Table locations={this.state.location.children} />
                    </div>
                )
            } else {
                return (
                    <div>
                        <h3>{h3}</h3>
                        <p>No data available.</p>
                    </div>
                )
            }

        }
        return null;
    }

    renderDetails() : ReactNode {
        if (this.state.location && this.state.location.date_entries) {
            let dateEntries = this.state.location.date_entries.map((entry : dateEntry) => {
                return (
                    <div className="entry" key={entry.id}>
                        <div className="value">{entry.date}</div>
                        <div className="value">{entry.value}</div>
                        <div className="value">{entry.detail ? entry.detail.deaths : "N/A"}</div>
                        <div className="value">{entry.detail ? entry.detail.hospitalizations : "N/A"}</div>
                        <div className="value">{entry.detail ? entry.detail.totalTests : "N/A"}</div>
                        <div className="value">{entry.detail ? entry.detail.newTests : "N/A"}</div>
                    </div>
                )
            });

            return (
                <div className="Table">
                    <div className="column">
                        <div className="header">
                            <div>Date</div>
                            <div>Total</div>
                            <div>Deaths</div>
                            <div>Hospitalizations</div>
                            <div>Total Tests</div>
                            <div>New Tests</div>
                        </div>
                        {dateEntries}
                    </div>
                </div>
            );
        }

        return (null);
    }

    async componentDidMount() {
        let locationId = this.props.location.pathname.replace(/\//g, '');
        try {
            let res = await fetch(`http://localhost:8000/tracker/locations/${locationId}/`);
            let body = await res.json();
            this.setState({location: body, titleName: `Coronavirus Tracking: ${(body as location).name}`})
        } catch (ex) {
            console.log(ex);
            this.props.history.goBack();
        }
    }

}