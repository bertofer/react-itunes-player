import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import './styles.scss' // global styles import
import 'rxjs' // Import all rxjs, fast
// Reducers
import { reducers, epics } from './store/root'

// Components
import { SearchListContainer } from './components/search-list/search-list.container.js'
import { PlayerContainer } from './components/player/player.container';

let store = createStore(
    reducers,
    applyMiddleware(createEpicMiddleware(epics))
  )

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/search' component={SearchListContainer} />
        <Route path='/player' component={PlayerContainer} />
        <Redirect from='**' to='/search' exact={true} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('react-root')
)
