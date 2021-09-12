import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

class App extends Component {
  c = 'John'
  render() {
    return (
      <div>
        <h1>Hello, I am {this.c}</h1>
      </div>
    );
  }
}

export default App;

