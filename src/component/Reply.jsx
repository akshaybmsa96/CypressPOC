import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';

class Reply extends Component {
  render() {
    return (
      <div className="App">
     
     <div style={{fontColor : 'white',fontSize:'12px',marginLeft: '20px',marginRight: '20px',padding:'10px',backgroundColor : 'gray'}} className="commentBox">
        Reply {this.props.index+1} <br/>
        {this.props.reply}

     </div>


      </div>
    );
  }
}

export default connect((state)=>{

  return {...state}
})(Reply);
