import React, {Component, ReactNode} from 'react';
import { Table } from './components/table';
import './App.css';

class App extends Component {

  constructor() {
    super({});

    this.state = {
      locations: []
    }
  }

  render() : ReactNode {
    return (
        <div className="main">
          <Table locations={(this.state as any).locations} />
        </div>
    )
  }

  async componentDidMount() {
    try {
      let res = await fetch('http://localhost:8000/tracker/');
      this.setState({locations: res.json()})
    } catch (ex) {
      console.log(ex);
    }
  }

}

export default App;
