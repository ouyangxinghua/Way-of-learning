import React, { Component } from 'react';
import './button.css'

class Button extends Component {
  constructor(){
    super();
    this.state = {
      show: true
    }
  }
  on = () => {
    this.setState({
      show: !this.state.show
    },() => {
      this.props.getState(this.state.show)
    })
  }
  no = () => {
    this.setState({
      show: !this.state.show
    },() => {
      this.props.getState(this.state.show)
    })
  }
  render() { 
    return ( 
      <div className="button-container" style={{ backgroundColor: this.state.show ? 'rgba(0,0,255,0.8)' : 'rgba(0,0,255,0.4)'}}
      onTouchStart={this.on} onTouchEnd={this.no} onClick={() => {
        this.props.getState(this.state.show)
      }}>
        按钮
      </div>
    );
  }
}

export default Button
