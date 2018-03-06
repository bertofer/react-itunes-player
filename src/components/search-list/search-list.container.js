import { connect } from 'react-redux'
import { SearchList } from './search-list.jsx'
import { search, orderList } from '../../store/search/actions'
import { orderedList } from '../../store/search/selectors'
import * as api from '../../api/itunes'
import { setPlayingSong } from '../../store/player/actions';

const R = require('ramda')

const stateProps = (state) => ({
  results: orderedList(state),
  order: state.search.order
})

const dispatchProps = (dispatch, props) => ({
  onSearch: (text) => dispatch(search(text)),
  onOrder: (field) => dispatch(orderList(field))
})

export const SearchListContainer = connect(
  stateProps,
  dispatchProps
)(SearchList)
