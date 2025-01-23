import React, { Component } from 'react';
import logo from '../img/testing.png';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> DevOps Stage Task</h1>
        </header>
        <p className="App-intro">
          This task was submitted by <b>Temilayonn</b>
        </p>
      </div>
    );
  }
}

export default App;