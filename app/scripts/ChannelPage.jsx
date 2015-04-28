'use strict';

var React = require('react');
var Router = require('react-router');

var ChannelPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    console.log(this.context.router.getCurrentParams().channelID);

    return (
      <div />
    );
  }
});

module.exports = ChannelPage;
