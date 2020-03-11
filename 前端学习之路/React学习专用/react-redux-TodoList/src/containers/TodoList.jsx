import { connect } from 'react-redux';
import TodoList from '../component/TodoList';
import { addToState, toggleLine, listDelete } from '../redux/action'
 
const mapStateToProps = (state) => {
  return {
    textList: state.textList,
  }
}
const mapDispatchToProps = (disptch) => {
  return {
    addtextList: (itemList) => {
      disptch(addToState(itemList));
    },
    toggle: (id) => {
      disptch(toggleLine(id))
    },
    delete: (id) => {
      disptch(listDelete(id))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);