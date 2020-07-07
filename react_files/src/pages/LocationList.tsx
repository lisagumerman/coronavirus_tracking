import React, {Component, ReactNode} from "react";
import {location} from "../models/location";
import {locationType} from "../models/location-type";
import {TypeButton} from "../components/type-button";
import {Table} from "../components/table";
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';


interface ListState {
    locations : location[],
    type : locationType
}

export class LocationList extends Component<{}, ListState> {

    constructor(props : any) {
        super(props);

        this.state = {
            locations: [],
            type: locationType.NATION
        }
    }

    render() : ReactNode {
        let buttons = [] as JSX.Element[];
        let locations = this.state.locations.filter((loc : location) => loc.type === `LocationType.${locationType[this.state.type].charAt(0)}`);
        for (let location_type in Object.keys(locationType).filter(key => isNaN(Number(key)))) {
            buttons.push(
                <TypeButton location_type={location_type} active={String(this.state.type) === location_type}
                            key={location_type} onClick={() => this.changeType(location_type)}/>
            )
        }
        let width = window.innerWidth > 1000 ? 1000 : window.innerWidth;

        return (
            <div className="list">
                <div className="buttonHolder">
                    {buttons}
                </div>
                {locations.length > 0 &&
                <LineChart width={width} height={width*.5} margin={{top: 30, right: 30, left: 50, bottom: 30 }}>
                    <XAxis dataKey="date" type="category" allowDuplicatedCategory={false} />
                    <YAxis dataKey="value" type="number" />
                    <Legend />
                    <Tooltip />
                    {locations.map((loc : location) => (
                        <Line type="monotone" dot={null} dataKey="value" data={loc.date_entries} name={loc.name} key={loc.name} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}/>
                    ))}
                </LineChart>
                }
                <Table locations={locations} />
            </div>
        )
    }

    async componentDidMount() {
        try {
            let res = await fetch('http://localhost:8000/tracker/locations/');
            let body = await res.json();
            this.setState({locations: body});
        } catch (ex) {
            console.log(ex);
        }
    }

    changeType(location_type : string) {
        this.setState(
            {
                type : Number(location_type)
            }
        );
    }
}