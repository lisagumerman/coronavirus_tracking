import React, {Component} from "react";
import {locationType} from "../models/location-type";

export interface TypeButtonProps {
    active : boolean,
    location_type : string,
    onClick : any //TODO fix
}

export interface TypeButtonState {
    active : boolean,
    location_type : string
}

export class TypeButton extends Component<TypeButtonProps, {}> {

    constructor(props : TypeButtonProps) {
        super(props);

        // this.state = {
        //     active: false,
        //     location_type : String(locationType.NATION)
        // }
    }

    render() {
        return (
            <button className={"button " + (this.props.active ? 'active' : '')} onClick={() => this.props.onClick()}>
                {locationType[Number(this.props.location_type)]}
            </button>
        )
    }

    // componentDidMount(): void {
    //     let location_type = locationType[Number(this.props.location_type)];
    //     this.setState({
    //         location_type : location_type,
    //         active : this.props.active
    //     })
    // }

}