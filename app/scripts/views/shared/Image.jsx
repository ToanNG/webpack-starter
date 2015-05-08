//////////////////////////////////
// Image Component              //
// Author: Vu Nguyen            //
// @input {String} src          //
// @input {String} classes      //
// @input {JSON}   inlineStyles //
//////////////////////////////////

'use strict';

var React = require('react');
var _ = require('lodash');

var Image = React.createClass({
  propTypes: {
    src: React.PropTypes.string.isRequired
  },

  getInitialState: function () {
    return {
      isLoading: true
    };
  },

  componentDidMount: function () {
    this.checkValidImage();
  },

  checkValidImage: function () {
    var image = document.createElement('img');
    image.src = this.props.src;
    image.onerror = this._handleError;
    image.onload = this._handleLoad;
  },

  _handleLoad: function () {
    this.setState({
      isLoading: false
    });
  },

  _handleError: function () {
    this.setState({
      isLoading: true
    });
  },

  render: function () {
    var styles = {};
    var classes = (this.props.classes || '') + ' image';

    if (!this.state.isLoading) {
      styles.backgroundImage = 'url("' + encodeURI(this.props.src) + '")';
      styles.backgroundSize = 'cover';
    }

    styles = _.assign(styles, this.props.inlineStyles);

    return (
      <div className={classes} style={styles}></div>
    );
  }
});

module.exports = Image;
