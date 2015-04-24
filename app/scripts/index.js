'use strict';

var React = require('react');
var Router = require('react-router');
var {
  Route,
  DefaultRoute,
  NotFoundRoute,
  RouteHandler,
  Link
} = Router;
require('bootstrap-sass');

require('main.scss');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">
                <img className="logo" src={require('logo.png')} />
              </a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active"><a href="#">Link</a></li>
                <li><a href="#">Link</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <RouteHandler />
      </div>
    );
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
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
