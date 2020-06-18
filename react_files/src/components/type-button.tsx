import React, {Component} from "react";
import {locationType} from "../models/location-type";

export interface TypeButtonProps {
    active : boolean,
    location_type : string,
    onClick : any //TODO typify
}

export class TypeButton extends Component<TypeButtonProps, {}> {

    render() {
        return (
            <button className={"button " + (this.props.active ? 'active' : '')} onClick={() => this.props.onClick()}>
                {locationType[Number(this.props.location_type)]}
            </button>
        )
    }

}