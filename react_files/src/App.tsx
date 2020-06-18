import React, {Component, ReactNode} from 'react';
import {Table} from './components/table';
import './App.css';
import {location} from "./models/location";
import {locationType} from "./models/location-type";
import {TypeButton} from "./components/type-button";

interface AppState {
  locations : location[],
  type : locationType
}

class App extends Component<{}, AppState> {

  constructor(props : AppState) {
    super(props);

    this.state = {
      locations: [],
      type: locationType.NATION
    }
  }

  render() : ReactNode {
    let buttons = [] as JSX.Element[];
    for (let location_type in Object.keys(locationType).filter(key => isNaN(Number(key)))) {
      buttons.push(
          <TypeButton location_type={location_type} active={String(this.state.type) == location_type}
                      key={location_type} onClick={() => this.changeType(location_type)}/>
          )
    }
    return (
        <div className="main">
          <h1>Coronavirus Tracking</h1>
          <div className="buttonHolder">
            {buttons}
          </div>
          <Table locations={this.state.locations.filter((loc : location) => loc.type === locationType[this.state.type].charAt(0))} />
        </div>
    )
  }

  //TODO incorporate routing: table can be /locations, and then /locations/:locationId for specifics

  async componentDidMount() {
    try {
      let res = await fetch('http://localhost:8000/tracker/locations/');
      let body = await res.json();
      this.setState({locations: body})
    } catch (ex) {
      console.log(ex);
    }
  }

  changeType(location_type : string) {
    console.log(location_type);
    this.setState(
        {
          type : Number(location_type)
        }
    );
    console.log(this.state);
  }

}

export default App;
