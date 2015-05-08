///////////////////////////////////////
// Simple List Component             //
// Author: Toan Nguyen               //
// @input {Boolean}  isLoading       //
// @input {Array}    dataSource      //
// @input {Function} onUserClickItem //
///////////////////////////////////////

'use strict';

var React = require('react');
var Image = require('../shared/Image.jsx');

var SimpleListItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  render: function () {
    var {item, onUserClickItem, ...other} = this.props;

    return (
      <div
        className="item-wrapper"
        onClick={onUserClickItem.bind(null, item.mediaID)}
      >
        <Image classes={'item-poster'} src={item.poster} />
        <Image classes={'item-banner'} src={item.banner} />
        <div className="item-info">
          <div className="item-title">{item.title}</div>
        </div>
      </div>
    );
  }
});

var SimpleList = React.createClass({
  generateDOMList: function () {
    var {dataSource, ...other} = this.props;
    var items = [];

    dataSource.forEach(function (item) {
      items.push(<SimpleListItem {...other} key={item.mediaID} item={item} />);
    });

    for (var i = 0; i < 10; i++) {
      items.push(<div className="item-wrapper"></div>);
    }

    return items;
  },

  render: function () {
    if (this.props.isLoading) {
      return (
        <div>Loading...</div>
      );
    }

    return (
      <div className="items-container">
        {this.generateDOMList()}
      </div>
    );
  }
});

module.exports = SimpleList;
