import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Main from './components/Main'
import Favorite from './components/Favorite'

export class App extends Component {
  render() {
    return (
      <>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route exact path="/favorites">
            <Favorite/>
          </Route>
        </Switch>
      </Router>
    </>
    )
  }
}

export default App
