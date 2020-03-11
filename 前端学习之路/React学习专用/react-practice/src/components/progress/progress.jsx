import React, { Component } from 'react';
import './progress.css'

class Progress extends Component {

  // ## 进度条
  // ```js
  // Progress.propTypes = {
  //     //进度
  //     progress: 必须 number,
  //     //是否禁用拖拽
  //     disableDrag: bool,
  //     onDragStart: func,
  //     onDrag: func, 告诉父级 现在的进度
  //     onDragEnd: func 已经拖完了
  // };
  // ```
  // <Progress progress={0.5} onDragStart={} onDrag={}>
  // ```js
  // onTouchStart
  // onTouchMove
  // onTouchEnd
  // ```
  state = {
    progress: 0,//必须 number
    //是否禁用拖拽
    disableDrag: true
  }
  componentDidMount = () => {
    let width = this.refs.progress.getBoundingClientRect().width
    this.props.getWidth(width)
  }
  onDrag = () => {
    this.props.progress(this.state.progress)
    // console.log(this.state)
  }
  onTouchMove = (e) => {
    let width = this.refs.progress.getBoundingClientRect().width
    let num = e.touches[0].clientX
    if (num < width && num > 0) {
      this.setState({
        progress: num
      })
    } else if (num < 0) {
      this.setState({
        progress: 0
      })
    } else {
      this.setState({
        progress: width
      })
    }
  }
  render() {
    return (
      <div className="progress-container" >
        <div className="progress" ref="progress">
          <div className="circle" style={{ left: this.state.progress }}
            onTouchStart={this.onTouchStart}
            onTouchMove={this.onTouchMove}
            onTouchEnd={this.onDrag}></div>
          <div className="progress-color" style={{ width: this.state.progress }}></div>
        </div>
      </div>
    );
  }
}

export default Progress;