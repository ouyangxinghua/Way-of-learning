import React from 'react';
import toast from './toast/index'

const openNotificationWithIcon = type => {
  // console.log(type)
  // console.log(toast[type])
  toast[type]('这是提示的内容'); //key => value  key:type(success) =>对应函数 success()
};

function App() {
  return (
    <div>
    <button onClick={() => openNotificationWithIcon('success')}>Success</button>
    <button onClick={() => openNotificationWithIcon('info')}>Info</button>
    <button onClick={() => openNotificationWithIcon('warning')}>Warning</button>
    <button onClick={() => openNotificationWithIcon('error')}>Error</button>
    <button onClick={() => openNotificationWithIcon('loading')}>loading</button>
  </div>

  );
}

export default App;
