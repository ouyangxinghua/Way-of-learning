import React, { Component } from 'react';
class Child extends Component {
  state = {}
  handleAnotherFun = () => {
    console.log('handleAnotherFun');
  }
  handleClick (e)  {
    // console.log(e);
    this.handleAnotherFun();
    // console.log(e.target.innerHTML)
  }
  handleChange = (e) => {
    console.log(e.target.value)
    this.setState({
      inputVal: e.target.value
    })
  }
  render() {
    return (
      <div onClick={ this.handleClick.bind(this) }>
        { this.props.msg }
        <input type="text" placeholder="请输入内容" value={this.state.inputVal} onChange={this.handleChange}/>
        <div>{this.state.inputVal}</div>
      </div>
    )
  }
}

export default Child;
