import React, { Component } from 'react';
import './App.css';
import Slate from './component/Slate';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
      <br/>
      <b>  Slate  </b>
        <br/>
        <br/>

        <Slate/>

      </div>
    );
  }
}

export default connect((state)=>{
  return {...state}
})(App);
