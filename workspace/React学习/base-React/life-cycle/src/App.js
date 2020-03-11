import React from 'react';
import Child from './Child'
import Child1 from './Child1';
import Context from './Context';
import Context1 from './Context1';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.objRef = React.createRef();
  }
  state = {
    count: 0,
    showChild: true
  }
  handleToggleChild = () => {
    const { showChild } = this.state;
    this.setState({
      showChild: !showChild
    }) 
  }
  handleChildPropsChange = () => {
    var { count } = this.state;
    count++; 
    this.setState({
      count
    })
  }
  componentWillMount(){
    // console.log('componentWillMount father')
  }
  componentDidMount(){
    // console.log('componentDidMount father')
    // React的三种ref写法, 推荐使用第三者 this.objRef = React.createRef();
    this.refs.stringRef.innerHTML = 'new String ref'
    this.methodRef.innerHTML = 'new method Ref'
    this.objRef.current.innerHTML = 'new object Ref'
  }
  render() {
    const { count, showChild } = this.state;
    // console.log('render function father')
    return (
      <div>
        <span ref="stringRef">react ref</span><br/>
        <span ref={(ref) => this.methodRef = ref}>method ref</span><br/>
        <span ref={this.objRef}>
          object ref
        </span><br/>
        {/* innerHTML */}
        <div dangerouslySetInnerHTML={{
           __html: `<strong>strong</strong>`
        }}>
        </div>
        <button onClick={this.handleChildPropsChange}>
          child component props change
        </button><br/>
        <button onClick={this.handleToggleChild}>
          toggle Child
        </button>
        {
          !showChild ?
          <Child count={count} /> : <Child1 count={count}/>
        }<br></br>
        {/* 小华 */}
        <Context>
          {/* this.props.children 类似于slot插槽 */}
            小华
          <p> 姓名</p>
            19
          <p> 年龄</p>
        </Context>
        <Context1>
          <p>react 16.x.x</p>
        </Context1>
      </div>
    )
  }
}

export default App;
