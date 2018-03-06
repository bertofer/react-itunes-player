import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { SongItem } from '../song-item/song-item.jsx'
import './player.scss'

const queryString = require('query-string')

export class Player extends React.Component {

  constructor(props) {
    super();
    this.state = {paused: true}
  }

  printPlayPauseButton () {
    if (this.state.paused) return (<i className='fa fa-play fa-xl'></i>)
    else return (<i className='fa fa-pause fa-xl'></i>)
  }

  playOrPause () {
    if (this.audio.paused) {
      this.audio.play()
      this.setState({paused: false})
    }
    else {
      this.audio.pause()
      this.setState({paused: true})
    }
  }

  /**
   * @param {*} prop next or prev, to see if we print it disabled or not
   */
  printChangeSong(name, song) {
    if (song) {
      return (
        <Link
            style={{ textDecoration: 'none' }}
            to={{ pathname: '/player', search: queryString.stringify({id: song.trackId}) }}
            replace={true}><button className='btn btn-change-song'>{name}</button></Link>)
    } else {
      return (<button className='btn btn-disabled btn-change-song'>{name}</button>)
    }
  }

  render () {
    return (

      <div className='player'>
        {this.printChangeSong('Previous', this.props.prev)}

        <div className='player-controls'>
          <audio ref={(audio) => { this.audio = audio}} src={this.props.song.previewUrl} />
          <button
            className='btn-control'
            onClick={e => this.playOrPause()}
            >
            {this.printPlayPauseButton()}
          </button>
          <div className='progress'>
            <div className='instant' ref={instant => {this.instant = instant}}></div>
          </div>
        </div>

        {this.printChangeSong('Next', this.props.next)}

      </div>
    )
  }

  onTimeUpdate () {
    var playPercent = 100 * (this.audio.currentTime / this.audio.duration);
    this.instant.style.marginLeft = playPercent + "%";
  }

  componentDidMount () {
    // this.audio.addEventListener('canplaythrough', this.onDuration.bind(this), false)
    this.audio.addEventListener('timeupdate', this.onTimeUpdate.bind(this), false);
  }
}
