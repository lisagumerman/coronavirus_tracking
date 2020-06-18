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
      buttons.push(<TypeButton location_type={location_type}/>)
    }
    return (
        <div className="main">
          <h1>Coronavirus Tracking</h1>
          <div className="buttonHolder">
            {buttons}
          </div>
          <Table locations={this.state.locations} />
        </div>
    )
  }

  //TODO incorporate routing: table can be /locations, and then /locations/:locationId for specifics

  async componentDidMount() {
    try {
      let res = await fetch('http://localhost:8000/tracker/locations/');
      let body = await res.json();
      //TODO filter based on current state
      this.setState({locations: body})
    } catch (ex) {
      console.log(ex);
    }
  }

}

export default App;
