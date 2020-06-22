import React, {Component, ReactNode} from "react";
import {useParams, RouteComponentProps} from "react-router-dom";
import {location} from "../models/location";

export interface DetailProps extends RouteComponentProps {
    locationId : number
}

export interface DetailState {
    location : location | null
}

export class LocationDetail extends Component<DetailProps, DetailState> {

    render() : ReactNode {
        return(
            <div>
                <h2>{this.state.location ? this.state.location.name : ''}</h2>

            </div>
        )
    }

    async componentDidMount() {
        let locationId = useParams();
        try {
            let res = await fetch(`http://localhost:8000/tracker/locations/${locationId}`);
            let body = await res.json();
            this.setState({location: body})
        } catch (ex) {
            console.log(ex);
            this.props.history.goBack();
        }
    }

}