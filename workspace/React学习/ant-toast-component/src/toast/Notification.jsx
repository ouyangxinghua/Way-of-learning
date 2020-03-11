import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Notice from './Notice'

class Notification extends Component {
  state = {
    notices: []
  }
  // duration = 2000
  addNotice = (notice) => {
    console.log(notice);
    const { notices } = this.state;
    notice.key = this.getNoticeKey()
    console.log(notice.key)
    notices.push(notice);
    this.setState({
      notices
    })
    setTimeout(() => {
      this.removeNotice(notice.key);
    }, notice.duration);
  }
  getNoticeKey = () => {
    const { notices } = this.state;
    return `notice-${new Date().getDate()}-${notices.length}`
  }
  removeNotice = (key) => {
    // 
    const { notices } = this.state;
    this.setState({
      notices: notices.filter((notice) => {
        if(notice.key === key){
          if (notice.onClose) notice.onClose();
          return false;
        }
        return true;
      })
    })
  }
  render() {
    const { notices } = this.state;
    return (
      <div>
        {
          notices.map((notice) => {
            return <Notice {...notice} key={notice.key} />
          })
        }
      </div>
    );
  }
}
function createNotification() {
  const div = document.createElement('div');
  const ref = React.createRef();
  document.body.appendChild(div);
  ReactDOM.render(<Notification ref={ref} />, div);
  // 组件上面, 拿到组件的实例
  return {
    addNotice(notice) {
      return ref.current.addNotice(notice)
    }
  }
}

export default createNotification()