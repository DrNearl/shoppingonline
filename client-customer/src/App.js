import './App.css';
import React, { Component } from 'react';
import MyProvider from './contexts/MyProvider';
import Main from './components/MainComponent';

class App extends Component {
  render() {
    return (
      <MyProvider>
        <Main />
      </MyProvider>
    );
  }
}

export default App;