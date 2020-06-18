import React, {Component} from "react";
import {locationType} from "../models/location-type";

export interface TypeButtonProps {
    location_type : string
}

export interface TypeButtonState {
    active : boolean,
    location_type : string
}

export class TypeButton extends Component<TypeButtonProps, TypeButtonState> {

    constructor(props : TypeButtonProps) {
        super(props);

        this.state = {
            active: false,
            location_type : String(locationType.NATION)
        }
    }

    render() {
        return (
            <button className="button">
                {this.state.location_type}
            </button>
        )
    }

    componentDidMount(): void {
        this.setState({
            location_type : locationType[Number(this.props.location_type)]
        })
    }

}