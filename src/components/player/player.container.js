/**
 * In this component, we are reading from the location to know the song we want
 * to reproduce. If song is not found in redux, it is fetch from ID.
 */
import React from 'react'
import * as api from '../../api/itunes'
import { connect } from 'react-redux'
import { Player } from './player.jsx'
import { SongItem } from '../song-item/song-item.jsx'
import {orderedList} from '../../store/search/selectors'
import { setPlayingSong, fetchSongErr, fetchSong } from '../../store/player/actions'
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from 'react-share';


const queryString = require('query-string')
const R = require('ramda')

class Container extends React.Component {
  render() {
    return (
      <div className='container'>
        {this.props.song ?
          <div className='player-container'>
            <SongItem {...this.props.song} />
            <Player {...this.props} />
            <div className='social-share'>
              <FacebookShareButton url={this.props.song.previewUrl}>
                <i className='fa fa-facebook-official'></i>
              </FacebookShareButton>
              <TwitterShareButton url={this.props.song.previewUrl} >
                <i className='fa fa-twitter'></i>
              </TwitterShareButton>
              <TelegramShareButton url={this.props.song.previewUrl} >
                <i className='fa fa-telegram'></i>
              </TelegramShareButton>
              <WhatsappShareButton url={this.props.song.previewUrl} >
                <i className='fa fa-whatsapp'></i>
              </WhatsappShareButton>
            </div>
          </div> :
          <div> Loading... </div>
        }
      </div>
    )
  }

  componentDidMount () {
    if (!this.props.id) {
      this.props.history.push('/search')
    }
    // If no song, fetch
    if (!this.props.song) {
      this.props.fetchSong(this.props.id)
    }
  }

  componentWillReceiveProps (newProps) {
    if (!newProps.song) {
      this.props.fetchSong(newProps.id)
    }
  }
}

const stateProps = (state, props) => {
  const id = queryString.parse(props.location.search).id
  if (!id) {
    return {}
  }

  if (state.player.song && (state.player.song.trackId.toString() === id)) {
    // already got the song, see if next & prev
    const list = orderedList(state)
    const { song } = state.player
    if (list.length === 0) return {song, id}

    const songIndex = R.findIndex(s => s.trackId === parseInt(id), list)
    const prev = songIndex > 0 ? list[songIndex - 1] : null
    const next = songIndex < (list.length - 1) && songIndex !== -1 ?
      list[songIndex + 1] :
      null

    return {
      id,
      song,
      next,
      prev
    }
  } else {
    // got ID but no song
    return {id}
  }
}

const dispatchProps = (dispatch, props) => ({
  fetchSong: (id) => dispatch(fetchSong(id))
})

export const PlayerContainer = connect(
  stateProps,
  dispatchProps
)(Container)
