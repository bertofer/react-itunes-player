import {
  SET_PLAYING_SONG, FETCH_SONG_ERR
} from './actions'
const R = require('ramda')

const initialState = {
  song: null, // results received from API
  error: null  // If any error occurs
}

const assign = R.flip(R.merge) // Data last version of merge

export const player = (state = initialState, action) => {
  switch (action.type) {
    // We save in store the whole object
    case SET_PLAYING_SONG: return assign({song: action.data, error: null}, state)
    case FETCH_SONG_ERR: return assign({error: action.error, song: null}, state)
    default: return state
  }
}
