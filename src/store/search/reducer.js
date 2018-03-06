import {
  UPDATE_LIST, ORDER_LIST, SEARCH, SEARCH_ERR
} from './actions'
const R = require('ramda')

const initialState = {
  terms: '',
  results: [], // results received from API
  error: null,  // If any error occurs
  order: {} // ordering settings
}

const assign = R.flip(R.merge) // Data last version of merge

const newOrder = (newField, previous) => {
  if (!previous.field || (previous.field !== newField)) return {field: newField, dir: 'desc'}
  else {
    return (previous.dir === 'desc') ?
      {field: newField, dir: 'asc'} :
      {}
  }
}

export const search = (state = initialState, action) => {
  switch (action.type) {
    // We save in store the whole object
    case SEARCH: return assign({terms: action.data}, state)
    case UPDATE_LIST: return assign({results: action.data}, state)
    case ORDER_LIST: return assign({order: newOrder(action.data, state.order)}, state)
    default: return state
  }
}
