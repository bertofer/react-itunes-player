import * as actions from "./actions";
import {Observable} from 'rxjs'
import * as api from '../../api/itunes'

export const searchEpic = actions$ =>
  actions$.ofType(actions.SEARCH)
    .switchMap(action => Observable.fromPromise(api.search(action.data))
      .map(res => actions.updateList(res))
      .catch(err => Observable.from(actions.searchErr(err)))
    )
