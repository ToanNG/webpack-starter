'use strict';

var React = require('react');
var Router = require('react-router');
var AppStore = require('stores/AppStore');
var MovieList = require('widgets/listview/MovieList');
var config = require('config');

var ChannelPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  getInitialState: function () {
    return {
      isLoadingMenu: !AppStore.getChannels().length
    };
  },

  componentWillReceiveProps: function () {
    this.forceUpdate();
  },

  componentDidMount: function () {
    AppStore.addChangeListener('channelchange', this._handleChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener('channelchange', this._handleChange);
  },

  render: function () {
    if (this.state.isLoadingMenu) {
      return (
        <div>Loading menu...</div>
      );
    }

    var channelID = this.context.router.getCurrentParams().channelID;

    if (AppStore.getChannelByID(channelID).isSeries) {
      return (
        <div>SeriesList widget</div>
      );
    } else {
      return (
        <MovieList
          channelID={channelID}
          onUserClickMovie={this._handleUserClickMovie}
        />
      );
    }
  },

  _handleChange: function () {
    this.setState({
      isLoadingMenu: false
    });
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
