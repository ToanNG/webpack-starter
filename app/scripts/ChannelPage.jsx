'use strict';

var React = require('react');
var Router = require('react-router');
var MovieList = require('widgets/listview/MovieList');
var config = require('config');

var ChannelPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  componentWillReceiveProps: function () {
    this.forceUpdate();
  },

  render: function () {
    return (
      <MovieList
        channelID={this.context.router.getCurrentParams().channelID}
        onUserClickMovie={this._handleUserClickMovie}
      />
    );
  },

  _handleUserClickMovie: function (mediaID) {
    config.handleUserClickMovie(this.context.router, {
      mediaID: mediaID
    });
  },

  _handleUserClickSeries: function (mediaID) {

  }
});

module.exports = ChannelPage;
