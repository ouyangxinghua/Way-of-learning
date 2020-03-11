import * as ActionType from './actionType';

export function addToState(itemList){
  return {
    type: ActionType.addText, itemList
  }
}

export function toggleLine(id){
  return {
    type: ActionType.change_toggle, id
  }
}
export function listDelete(id) {
  return {
    type: ActionType.list_delete, id
  }
}