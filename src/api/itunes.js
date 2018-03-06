const request = require('axios')
const R = require('ramda')

// we will only work with these parameters in any case
const RESULT_FIELDS = [
  'trackName',
  'artistName',
  'artworkUrl100',
  'releaseDate',
  'primaryGenreName',
  'trackTimeMillis',
  'trackPrice',
  'collectionName',
  'trackId',
  'previewUrl',
  'currency'
]

const generateSearchUrl = (text) => `https://itunes.apple.com/search?term=${encodeURIComponent(text)}&media=music`
const generateGetOneUrl = (id) => `https://itunes.apple.com/lookup?id=${id}`

export const search = (text) => request(generateSearchUrl(text))
  .then(res => R.map(R.pick(RESULT_FIELDS), res.data.results))

export const getOne = (id) => request(generateGetOneUrl(id))
  .then(res => R.pick(RESULT_FIELDS, res.data.results[0]))
