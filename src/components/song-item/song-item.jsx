import React from 'react'
import moment from 'moment'
import 'moment-duration-format'
import './song-item.scss'

export const SongItem = (props) => {
  const getDuration = (millis) => {
    const duration = moment.duration(millis).format('mm:ss')
    return duration
  }

  return (
    <div className='song-item'>
      <img src={props.artworkUrl100} />
      <div className='card-left'>
        <span className='song-title'> {props.trackName}
          <span className='song-length'>{getDuration(props.trackTimeMillis)}</span>
        </span>
        <span className='song-album'>{props.collectionName}</span>
        <span className='song-release'>{moment(props.releaseDate).format('DD-MM-YYYY')}</span>
      </div>
      <div className='card-right'>
        <span className='song-artist'>{props.artistName}</span>
        <span className='song-genre'>{props.primaryGenreName}</span>
        <span className='song-price'>{props.currency} {props.trackPrice}</span>
      </div>
    </div>
  )
}
