'use strict';

var React = require('react');

var SimpleList = React.createClass({
  render: function () {
    return (
      <div>
        <h1>This is simple listview</h1>
        <button className="btn btn-default">Button</button>
      </div>
    );
  }
});

module.exports = SimpleList;
