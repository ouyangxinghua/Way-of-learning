import React from 'react'
// 返回一个对象 对象上有两个组件 生产者 消费者
const ThemContext = React.createContext({
  // theme: 'purple',
  // toggleTheme: () => {}
})
class MyButton extends React.Component {
  render() {
      return (
        <ThemContext.Consumer>
        {
          (value) => {
            return (
              <button onClick={value.toggleTheme} style={{backgroundColor: value.theme}}>
                {this.props.children}
              </button>
            )
          }
        }
        </ThemContext.Consumer>
      )
  }
}
class Message extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <div>
        {this.props.text}
        <MyButton>delete</MyButton>
      </div>
    )
  }
}
class Context1 extends React.Component {
  constructor() {
    super();
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: 
        state.theme === "purple" ?
        'blue' : 'purple'
      }))
    }
    this.handleToggleBlue = () => {
      this.setState(state => {
        return {
          theme: 'blue'
        }
      })
    }
    this.state = {
      theme: 'purple',
      handleToggleBlue: this.handleToggleBlue,
      toggleTheme: this.toggleTheme
    }
  }
  // state = {} static 属性
  handleToggleTheme = () => {
    this.setState({
      theme: 'red'
    })
  }
  render() {
    const msgs = ['msg1', 'msg2', 'msg3']
    return (
      <div>
        {this.props.children}
        <ThemContext.Provider value={this.state}>
          <button onClick={this.toggleTheme}>
            toggle theme
          </button>
          {
            msgs.map((msg, i) => {
              return <Message key={i} text={msg} />
            })
          }
        </ThemContext.Provider>
      </div>
    )
  }
}

export default Context1;