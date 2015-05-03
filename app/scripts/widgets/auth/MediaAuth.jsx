/////////////////////////////
// Media Auth Widget       //
// Author: Vu Nguyen       //
// @input {String} authURL //
/////////////////////////////

'use strict';

var React = require('react');
var AppActions = require('actions/AppActions');
var AppStore = require('stores/AppStore');
var RedirectLogin = require('views/auth/RedirectLogin');
var utils = require('utils');

function getCurrentUser() {
  AppActions.getCurrentUser(AppStore.getToken());
}

function receiveToken() {
  var accessToken = utils.url.getQueryValue('access_token');
  if (!!accessToken) {
    AppActions.receiveToken(accessToken);
  }
}

var MediaAuth = React.createClass({
  getInitialState: function () {
    return {
      user: null
    };
  },

  componentDidMount: function () {
    AppStore.addChangeListener('userchange', this._handleUserChange);
    AppStore.addChangeListener('tokenchange', this._handleTokenChange);
    getCurrentUser();
    receiveToken();
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener('userchange', this._handleUserChange);
    AppStore.removeChangeListener('tokenchange', this._handleTokenChange);
  },

  render: function () {
    return (
      <RedirectLogin
        user={this.state.user}
        onUserClickLogin={this._handleUserClickLogin}
        onUserClickLogout={this._handleUserClickLogout}
      />
    );
  },

  _handleUserChange: function () {
    this.setState({
      user: AppStore.getUser()
    });
  },

  _handleTokenChange: function () {
    getCurrentUser();
  },

  _handleUserClickLogin: function () {
    window.location = this.props.authURL +
                        '?country_code=SG&' +
                        'return=' + encodeURI(window.location.origin);
  },

  _handleUserClickLogout: function () {
    AppActions.deleteCurrentUser();
  }
});

module.exports = MediaAuth;
