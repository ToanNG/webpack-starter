///////////////////////////////////////
// Top Menu Widget                   //
// Author: Khang Hoang               //
// @input {Function} onUserClickItem //
///////////////////////////////////////

'use strict';

var React = require('react');
var AppActions = require('actions/AppActions');
var AppStore = require('stores/AppStore');
var SimpleMenu = require('views/menu/SimpleMenu');

var TopMenu = React.createClass({
  getInitialState: function () {
    AppActions.getAllChannels();

    return {
      channels: []
    };
  },

  componentDidMount: function () {
    AppStore.addChangeListener('channelchange', this._handleChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener('channelchange', this._handleChange);
  },

  render: function () {
    return (
      <div>
        <SimpleMenu
          dataSource={this.state.channels}
          onUserClickItem={this._handleUserClickItem}
        />
      </div>
    );
  },

  _handleChange: function () {
    this.setState({
      channels: AppStore.getChannels()
    });
  },

  _handleUserClickItem: function (channelID) {
    console.log(channelID);
  }
});

module.exports = TopMenu;
