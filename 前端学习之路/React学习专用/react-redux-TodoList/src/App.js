import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import TodoList from './containers/TodoList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
}

export default App;
