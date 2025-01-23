import React, { Component } from 'react';
import logo from '../img/testing.png';
import '../css/App.css';

class App extends Component {
  state = {
    originalIp: null,
    reversedIp: null,
    error: null,
  };

  componentDidMount() {
    // Fetch the reversed IP when the component mounts
    fetch('/reverse_ip')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          originalIp: data.originalIp, // Assuming the API returns 'originalIp' in the response
          reversedIp: data.reversedIp,
        });
      })
      .catch((error) => {
        this.setState({ error: 'Failed to fetch reversed IP' });
        console.error('Error fetching reversed IP:', error);
      });
  }

  render() {
    const { originalIp, reversedIp, error } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">DevOps Stage Task</h1>
        </header>
        <p className="App-intro">
          This task was submitted by <b>Temilayonn</b>
        </p>

        <div className="IP-info">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <React.Fragment>
              <p>
                <b>Original IP:</b> {originalIp || 'Fetching...'}
              </p>
              <p>
                <b>Reversed IP:</b> {reversedIp || 'Fetching...'}
              </p>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;