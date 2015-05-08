/////////////////////////////////////////
// Redirect Login Component            //
// Author: Vu Nguyen                   //
// @input {JSON}     user              //
// @input {Function} onUserClickLogin  //
// @input {Function} onUserClickLogout //
/////////////////////////////////////////

'use strict';

var React = require('react');

var RedirectLogin = React.createClass({
  render: function () {
    var user = this.props.user;

    if (user) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#">{user.email}</a>
          </li>
          <li>
            <a href="#" onClick={this._handleUserClickLogout}>Logout</a>
          </li>
        </ul>
      );
    }

    return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="#" onClick={this._handleUserClickLogin}>Login</a>
        </li>
      </ul>
    );
  },

  _handleUserClickLogin: function (e) {
    e.preventDefault();
    this.props.onUserClickLogin && this.props.onUserClickLogin();
  },

  _handleUserClickLogout: function (e) {
    e.preventDefault();
    this.props.onUserClickLogout && this.props.onUserClickLogout();
  }
});

module.exports = RedirectLogin;
