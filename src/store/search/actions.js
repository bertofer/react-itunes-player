export const SEARCH = 'SEARCH'
export const SEARCH_ERR = 'SEARCH_ERR'
export const UPDATE_LIST = 'UPDATE_LIST'
export const ORDER_LIST = 'ORDER_LIST'

export function search (terms) {
  return {
    type: SEARCH,
    data: terms
  }
}

export function searchErr (error) {
  return {
    type: SEARCH_ERR,
    error
  }
}

export function updateList (list) {
  return {
    type: UPDATE_LIST,
    data: list
  }
}

export function orderList (field) {
  return {
    type: ORDER_LIST,
    data: field
  }
}
