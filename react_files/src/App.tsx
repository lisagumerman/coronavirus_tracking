import React, {Component, ReactNode} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {LocationList} from "./pages/LocationList";
import {LocationDetail} from "./pages/LocationDetail";


class App extends Component<{}, {}> {

  render() : ReactNode {

    return (
        <BrowserRouter>
          <div className="main">
              <h1>Coronavirus Tracking</h1>
            <Switch>
                <Route path="/" exact component={LocationList} />
                <Route path="/:locationId" component={LocationDetail} />
                <Redirect to="/" />
            </Switch>
          </div>
        </BrowserRouter>
    )
  }

}

export default App;
