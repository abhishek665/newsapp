// import logo from './logo.svg';
import './App.css';
import Navbar from './components/nav';
import LoadingBar from 'react-top-loading-bar'

import React, { Component } from 'react';
import  News  from './components/news';
// import  from './components/spinner';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends Component {
  state = {
    progress: 0
  }
  apikey = 'c7c2806d4e644bbe92cabf8de063a8c9'
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return (
      <>
        <div>
          <Router>
            <Navbar />
            <LoadingBar
              color='#f11946'
              progress={this.state.progress}
            />
            <Switch>
              <Route exact path='/'><News apikey={this.apikey} setprogress={this.setProgress} key='General' pageSize='6' country='in' category='General' /></Route>
              <Route exact path='/Business'><News apikey={this.apikey} setprogress={this.setProgress} key='Business' pageSize='6' country='in' category='Business' /></Route>
              <Route exact path='/Entertainment'><News apikey={this.apikey} setprogress={this.setProgress} key='Entertainment' pageSize='6' country='in' category='Entertainment' /></Route>
              {/* <Route exact path='/General'><News key='General' pageSize='3' country='in' category='General' /></Route> */}
              <Route exact path='/Health'><News apikey={this.apikey} setprogress={this.setProgress} key='Health' pageSize='6' country='in' category='Health' /></Route>
              <Route exact path='/Science'><News apikey={this.apikey} setprogress={this.setProgress} key='Science' pageSize='6' country='in' category='Science' /></Route>
              <Route exact path='/Sports'><News apikey={this.apikey} setprogress={this.setProgress} key='Sports' pageSize='6' country='in' category='Sports' /></Route>
              <Route exact path='/Technology'><News apikey={this.apikey} setprogress={this.setProgress} key='Technology' pageSize='6' country='in' category='Technology' /></Route>
            </Switch>
          </Router>
        </div>
      </>
    );
  }
}

export default App;

