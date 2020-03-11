import React, { Component } from 'react';
import { debounce, decDebounce, decArrowDebounce, decDisplayName } from './util';
// 防抖
// 加了一个静态属性 displayname
@decDisplayName('CustomExampleDebounce')
class ExampleDebounce extends Component {
  state = {  }
  @decDebounce(1000)
  handleSubmit() {
    console.log('submit request 提交')
  }
  @decArrowDebounce(1000)
  handleBuy = () => {
    console.log('submit request 购买')
  }
  // handleSubmit = debounce(function() {
  //   console.log('request submit')
  // }, 1000)
  render() { 
    console.log(this.handleSubmit);
    console.log(this.handleBuy);
    return ( 
      <div>
        <button onClick={this.handleSubmit}>提交</button>
        <button onClick={this.handleBuy}>购买</button>
      </div>
     );
  }
}
 
export default ExampleDebounce;