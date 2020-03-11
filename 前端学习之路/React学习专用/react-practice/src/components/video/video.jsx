import React, { Component } from 'react';
import './video.css'

class Video extends Component {
  state = {
    fb: 0.1
  }
  componentDidUpdate = () => {
    let music = document.querySelector('#music');
    let progress = this.props.progress
    let fb = progress / this.props.getWidth
    fb = fb >= 1 ? 1: fb;
    music.volume = fb
  }
  render() {
    return (
      <div className="video">
        <p>体面-于文文</p>
        <audio src="http://tyst.migu.cn/public%2Fproduct09%2F2018%2F05%2F03%2F2017%E5%B9%B412%E6%9C%8821%E6%97%A514%E7%82%B958%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E5%8D%8E%E8%B0%8A%E5%85%84%E5%BC%9F1%E9%A6%96%2F%E5%85%A8%E6%9B%B2%E8%AF%95%E5%90%AC%2FMp3_64_22_16%2F%E4%BD%93%E9%9D%A2%28%E7%94%B5%E5%BD%B1%E3%80%8A%E5%89%8D%E4%BB%BB3+%E5%86%8D%E8%A7%81%E5%89%8D%E4%BB%BB%E3%80%8B%E6%8F%92%E6%9B%B2%29-%E4%BA%8E%E6%96%87%E6%96%87.mp3" 
        controls="controls" autoPlay="autoplay" id="music"></audio><br></br>
        <img className="image" style={{ width: this.props.progress, height: this.props.progress }} src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2133555133,2785575062&fm=26&gp=0.jpg" alt="" />
      </div>
    );
  }
}

export default Video;