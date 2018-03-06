import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { SongItem } from '../song-item/song-item.jsx'
import './search-list.scss'

const queryString = require('query-string');

export class SearchList extends React.Component {
  constructor (props) {
    super()
    this.state = {searchVal: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({searchVal: event.target.value});
  }

  onSubmit (e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSearch(this.state.searchVal)
  }

  printCaret (dir) {
    return dir === 'asc' ?
      (<i className='fa fa-caret-up'></i>) :
      (<i className='fa fa-caret-down'></i>)
  }

  render () {
    return (
      <div className='container'>
        <form name='search-form'>
          <input name="search" value={this.state.value} onChange={this.handleChange} />
          <button className='btn search-btn' onClick={(e) => this.onSubmit(e)}>Search songs</button>
        </form>

        <div className='order-buttons'>
          <button className='btn order-btn'
            onClick={e => this.props.onOrder('trackTimeMillis')}>
            Song length
            {this.props.order.field === 'trackTimeMillis' &&
              this.printCaret(this.props.order.dir)
            }
          </button>
          <button className='btn order-btn'
            onClick={e => this.props.onOrder('primaryGenreName')}>
            Genre
            {this.props.order.field === 'primaryGenreName' &&
              this.printCaret(this.props.order.dir)
            }
          </button>
          <button className='btn order-btn'
            onClick={e => this.props.onOrder('trackPrice')}>
            Price
            {this.props.order.field === 'trackPrice' &&
              this.printCaret(this.props.order.dir)
            }
          </button>
        </div>

        <div className='list-items'>
          {this.props.results.map(result =>
            <div key={result.trackId}>
              <Link
                to={{ pathname: '/player', search: queryString.stringify({id: result.trackId}) }}
                style={{ textDecoration: 'none' }}>
                <SongItem {...result} />
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }
}
