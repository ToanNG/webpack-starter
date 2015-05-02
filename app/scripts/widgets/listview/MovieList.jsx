////////////////////////////////////////
// Movie List Widget                  //
// Author: Toan Nguyen                //
// @input {String} channelID          //
// @input {Function} onUserClickMovie //
////////////////////////////////////////

'use strict';

var React = require('react');
var AppActions = require('actions/AppActions');
var AppStore = require('stores/AppStore');
var SimpleList = require('views/listview/SimpleList');

require('widgets/listview/movie-list.scss');

function getAllMovies(channelID) {
  AppActions.getAllMovies(
    AppStore.getChannelByID(channelID).contentFeedURL
  );
}

var MovieList = React.createClass({
  getInitialState: function () {
    getAllMovies(this.props.channelID);

    return {
      movies: [],
      isLoading: true
    };
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.channelID !== this.props.channelID) {
      getAllMovies(nextProps.channelID);

      this.setState({
        movies: [],
        isLoading: true
      });
    }
  },

  componentDidMount: function () {
    AppStore.addChangeListener('mediachange', this._handleChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener('mediachange', this._handleChange);
  },

  render: function () {
    return (
      <div className="movie-list">
        <SimpleList
          dataSource={this.state.movies}
          isLoading={this.state.isLoading}
          onUserClickItem={this.props.onUserClickMovie}
        />
      </div>
    );
  },

  _handleChange: function () {
    this.setState({
      movies: AppStore.getMedia(),
      isLoading: false
    });
  }
});

module.exports = MovieList;
