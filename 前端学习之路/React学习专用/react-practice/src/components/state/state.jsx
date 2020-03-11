import React, { Component } from 'react';
import './state.css'

class State extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="describe"> 
        <p style={{display: this.props.parentState ? 'none' : ''}}>拉塞尔威斯布鲁克</p>
      </div>
    );
  }
}
 
export default State;