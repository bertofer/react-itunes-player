export const FETCH_SONG = 'FETCH_SONG'
export const FETCH_SONG_ERR = 'FETCH_SONG_ERROR'
export const SET_PLAYING_SONG = 'SET_PLAYING_SONG'

export function fetchSong (id) {
  return {
    type: FETCH_SONG,
    data: id
  }
}

export function setPlayingSong (song) {
  return {
    type: SET_PLAYING_SONG,
    data: song
  }
}

export function fetchSongErr (error) {
  return {
    type: FETCH_SONG_ERR,
    error
  }
}

