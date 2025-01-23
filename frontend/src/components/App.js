import React, { Component } from 'react';
import logo from '../img/testing.png';
import '../css/App.css';

class App extends Component {
  state = {
    clientIp: '', // State to hold the IP address
  };

  componentDidMount() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        // Reverse the IP address before setting it to state
        const reversedIp = data.ip.split('').reverse().join('');
        this.setState({ clientIp: reversedIp });
      })
      .catch((error) => console.error('Error fetching the IP address:', error));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DevOps Stage1 Task</h1>
        </header>
        <p className="App-intro">
          This task was submitted by <b>Temilayonn</b>
        </p>

        {/* Display the reversed IP address */}
        <p>Your Public IP Address in Reverse: <b>{this.state.clientIp || "Fetching..."}</b></p>
      </div>
    );
  }
}

export default App;

