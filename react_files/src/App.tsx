import React, {Component, ReactNode} from 'react';
import { Table } from './components/table';
import './App.css';
import {location} from "./models/location";

interface AppState {
  locations : location[]
}

class App extends Component<{}, AppState> {

  constructor(props : AppState) {
    super(props);

    this.state = {
      locations: []
    }
  }

  render() : ReactNode {
    return (
        <div className="main">
          <Table locations={this.state.locations} />
        </div>
    )
  }

  async componentDidMount() {
    try {
      let res = await fetch('http://localhost:8000/tracker/index/');
      let body = await res.json();
      this.setState({locations: body})
    } catch (ex) {
      console.log(ex);
    }
  }

}

export default App;
