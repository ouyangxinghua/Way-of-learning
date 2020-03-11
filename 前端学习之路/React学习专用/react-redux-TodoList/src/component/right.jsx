import React, { Component } from 'react';
import React, { useState, useEffect, useContext, useReducer, useMemo, useRef } from 'react'

class Right extends Component {
  state = {  }
  render() { 
    const { list } = this.props;
    return ( 
      <div>
        {
          list.map((item, i) => {
            return (
              <li key={i} style={{
                textDecoration: item.toggle ? 'line-through' : ''
              }}>
                {item.text}
              </li>
            )
          })
        }
      </div>
    );
  }
}
 
export default Right;