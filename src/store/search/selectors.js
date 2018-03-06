const R = require('ramda')

const sortFn = (field, dir) =>
  (a, b) => dir === 'asc' ?
    a[field] < b[field] :
    b[field] < a[field]

export const orderedList = (state) => {
  const {results, order} = state.search
  if (order.field)
    return R.sort(sortFn(order.field, order.dir), results)
  else return results
}
