import React, { Component } from 'react';
// import Right from './right'
import './index.css'

let id = -1;
class TodoList extends Component {
  state = {}
  render() {
    const { textList } = this.props;
    console.log(this.props.textList)
    return (
      <div className="margin">
        <form onSubmit={e => {
          e.preventDefault();
          if (this.Node.value.trim()) {
            // 添加
            // console.log(this.Node.value)
            id++;
            this.props.addtextList({
              id: id,
              text: this.Node.value.trim(),
              toggle: false
            })
          }
        }}>
          <div className="container">
            <input id="ouyang" type="text" ref={(node) => 
              {this.Node = node}
              } />
            <button type="submit" id="Submit"> + </button>
          </div>
        </form>
        <div className="text-container">
          {
            textList.map((item, id) => {
              return (
                <div>
                  <li key={id} onClick={() => {
                    // console.log(item)
                    this.props.toggle(item.id)
                  }}
                    style={{
                      textDecoration: item.toggle ? 'line-through' : ''
                    }}>
                    {item.text}
                  </li>
                  <button onClick={() => {
                    console.log(item.id)
                    this.props.delete(item.id)
                  }}>删除</button>
                </div>
              )
            })
          }
        </div>
        {/* <Right list={textList}/> */}
      </div>
    );
  }
}

export default TodoList;