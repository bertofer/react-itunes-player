import * as actions from "./actions";
import { Observable } from 'rxjs'
import * as api from '../../api/itunes'
const R = require('ramda')

// If we find song in list, use it, if not go to internet find it
export const fetchSongEpic = (action$, store) =>
  action$.ofType(actions.FETCH_SONG)
    .switchMap(action => {

      const list = store.getState().search.results
      const song = R.find(a => a.trackId.toString() === action.data, list)

      if (song) {
        return Observable.of(actions.setPlayingSong(song))
      } else {

        return Observable.fromPromise(api.getOne(action.data))
          .map(data => actions.setPlayingSong(data))
          .catch(err => actions.fetchSongErr(err))
      }
    })
