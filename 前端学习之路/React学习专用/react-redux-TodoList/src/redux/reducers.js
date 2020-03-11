import { combineReducers } from 'redux'
import * as Actiontype from './actionType';

const initialState = {
  textList: [],
  aa: 12
}

function textList(textList = initialState.textList, action) {
  switch (action.type) {
    case Actiontype.addText:
      return [
        {
          text: action.itemList.text,
          id: action.itemList.id,
          toggle: action.itemList.toggle
        },
        ...textList
      ]
    case Actiontype.change_toggle:
      return textList.map((list) => {
        if (action.id === list.id) {
          return { ...list, toggle: !list.toggle }
        }
        return list
      })
    case Actiontype.list_delete:
      return textList.map((list) => {
        if (action.id === list.id) {
          textList.splice(list.id, 1)
          return textList
        }
        return list
      })
    default:
      return textList
  }
}
// function toggle(textList = initialState.textList, action) {
//   switch (action.type) {
//     case Actiontype.change_toggle:
//       return textList.map((list) => {
//         if (action.id === list.id) {
//           return { ...list, toggle: !list.toggle }
//         }
//         return list
//       })
//     default:
//       return textList
//   }
// }

export default combineReducers({
  textList
})