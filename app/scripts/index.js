'use strict';

require('bootstrap-sass');
require('main.scss');

var React = require('react');
var Router = require('react-router');
var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;

var TopMenu = require('widgets/menu/TopMenu');
var ChannelPage = require('ChannelPage');
var config = require('config');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img className="logo" src={require('logo.png')} />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <TopMenu
                onUserClickMenuItem={this._handleUserClickMenuItem}
              />
            </div>
          </div>
        </nav>

        <RouteHandler />
      </div>
    );
  },

  _handleUserClickMenuItem: function (channelID) {
    config.handleUserClickMenuItem(this.context.router, {
      channelID: channelID
    });
  }
});

var NotFound = React.createClass({
  render: function () {
    return <h2>Not found</h2>;
  }
});

var Index = React.createClass({
  render: function () {
    return <h2>Index page</h2>;
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index} />
    <Route name="index" path="/" handler={Index} />
    <Route name="channel" path="/channels/:channelID" handler={ChannelPage} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
