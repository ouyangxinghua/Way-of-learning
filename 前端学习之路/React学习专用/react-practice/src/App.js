import React, { Component } from 'react';
import Button from './components/button/button';
import Progress from './components/progress/progress'
import State from './components/state/state'
import Video from './components/video/video'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { childState: true,
      ChildProgress: 0 ,
      Width: 0
    }
  }
  get = (show) => {
    this.setState({
      childState: show
    })
  }
  getProgress = (progress) => {
    this.setState({
      ChildProgress: progress
    })
  }
  getwidth = (width) => {
    this.setState({
      Width: width
    })
  }
  render() {
    return (
      <div className="App">
        <Button getState={this.get.bind(this)} />
        <Progress progress={this.getProgress.bind(this)} getWidth={this.getwidth.bind(this)}/>
        <State parentState={this.state.childState}/>
        <Video progress={this.state.ChildProgress} getWidth={this.state.Width}/>
      </div>
    );
  }
}

export default App;
