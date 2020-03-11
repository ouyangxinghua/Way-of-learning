import React from 'react';

class Child extends React.Component {
  state = {
    childCount: 0
  }
  handleChildCountsChange = () => {
    var { childCount } = this.state;
    childCount++; 
    this.setState({
      childCount
    })
  }
  componentWillMount(){
    // console.log('componentWillMount child')
  }
  componentDidMount(){
    // console.log('componentDidMount child')
    // this.interval = setInterval(() => {
    //   console.log('setInterval child')
    // }, 1000);
  }
  componentWillUnmount() {
    // clearInterval(this.interval);
    // console.log('componentWillUnmount child')
  }
  componentWillReceiveProps() {
    // console.log('componentWillReceiveProps child')
  }
  componentWillUpdate(){
    // console.log('componentWillUpdate child')
  }
  componentDidUpdate(){
    // console.log('componentDidUpdate child')
  }
  // props 更新的
  // 组件性能优化的时候需要的
  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate child");
    if (nextProps.count !== this.props.count){
      return true;
    }
    return true;
  }
  render() {
    const { count } = this.props;
    const { childCount } = this.state;
    // console.log('render function child')
    return (
      <div>
        <button onClick={this.handleChildCountsChange}>
          child state change
        </button><br></br>
        child Component 
        count: {count}<br></br>
        childCount: {childCount}
      </div>
    )
  }
}

export default Child;
