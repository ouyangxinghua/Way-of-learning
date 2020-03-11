import React from 'react';
import AddTo from './todo/AddTo';
import TodoList from './todo/TodoList';
import Filter from './todo/Filter'

var nba = 'sndf'
function App() {
  return (
    <div>
      <AddTo nb={nba}/>
      <TodoList /><br></br>
      <Filter />
    </div>
  );
}

export default App;
