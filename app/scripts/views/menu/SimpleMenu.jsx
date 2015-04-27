///////////////////////////////////////
// Simple Menu Component             //
// Author: Khang Hoang               //
// @input {Array}    dataSource      //
// @input {Function} onUserClickItem //
///////////////////////////////////////

'use strict';

var React = require('react');

var SimpleMenuItem = React.createClass({
  render: function () {
    var {item} = this.props;

    return (
      <li>
        <a href="#" onClick={this._handleUserClickItem}>{item.name}</a>
      </li>
    );
  },

  _handleUserClickItem: function (e) {
    e.preventDefault();
    var {item, onUserClickItem} = this.props;

    onUserClickItem(item.id);
  }
});

var SimpleMenu = React.createClass({
  generateDOMList: function () {
    var {dataSource, ...other} = this.props;
    var items = [];

    dataSource.forEach(function (item, i) {
      items.push(<SimpleMenuItem {...other} key={item.id} item={item} />);
    });

    return items;
  },

  render: function () {
    return (
      <ul className="nav navbar-nav">
        {this.generateDOMList()}
      </ul>
    );
  }
});

module.exports = SimpleMenu;
