import React, { Component } from 'react';
import logo from '../img/testing.png';
import '../css/App.css';

class App extends Component {
  state = {
    clientIp: '', // State to hold the reversed IP address
    saved: false, // State to track if the IP is saved
  };

  componentDidMount() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        // Reverse the IP address
        const reversedIp = data.ip.split('').reverse().join('');
        this.setState({ clientIp: reversedIp });

        // Save reversed IP to the backend
        fetch('http://localhost:5000/save-ip', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ip: reversedIp }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            this.setState({ saved: true });
          })
          .catch((error) => console.error('Error saving IP address:', error));
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
        {this.state.saved && <p style={{ color: 'green' }}>IP saved successfully!</p>}
      </div>
    );
  }
}

export default App;

