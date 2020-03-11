import { combineReducers } from 'redux'
import * as Actiontype from './actionTypes';

const initialState = {
  showStatus: false,
  song: {}, //current
  songs: []
}
/**
 * {type: 'SHOW_PLAYER', showStatus: true}
 * {type: 'SHOW_PLAYER', showStatus: false}
 */
function showStatus(showStatus = initialState.showStatus, action){
  switch (action.type) {
    case Actiontype.SHOW_PLAYER:
      return action.showStatus
    default:
      return showStatus
  }
} 
/**
 * {type: 'CHANGE_SONG' , song: {}}
 * type
 * payload 除了type以外带过来的都叫 payload
 */
function song(song = initialState.song, action) {
  switch (action.type) {
    case Actiontype.CHANGE_SONG:
      return action.song;
    default:
      return song
  }
}

export default combineReducers({
  showStatus,
  song
})