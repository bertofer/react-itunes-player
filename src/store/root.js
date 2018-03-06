// In big apps, abstraction that goes through all folders importing every 'reducer.js'
import {combineReducers} from 'redux'
import { search } from './search/reducer'
import { player } from './player/reducer'
import { combineEpics } from 'redux-observable';
import { fetchSongEpic } from './player/epics';
import { searchEpic } from './search/epics';

export const reducers = combineReducers({
  search,
  player
})

export const epics = combineEpics(
  searchEpic,
  fetchSongEpic
)
