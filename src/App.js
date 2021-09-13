// import logo from './logo.svg';
import './App.css';
import Navbar from './components/nav';

import React, { Component } from 'react';
import { News } from './components/news';
// import  from './components/spinner';

class App extends Component {
  c = 'John'
  render() {
    return (
      <>
      <div>
        <Navbar/>
        <News pageSize='3' />
      </div>
      </>
    );
  }
}

export default App;

