'use strict';

var _ = require('lodash');

var utils = {
  getImage: function (imgsArr, opts) {
    var landscapeImages = [],
        portraitImages = [],
        results = [],
        options = {
          type: 'landscape',
          size: 'small'
        };
    _.extend(options, opts);

    // force transform object to array
    imgsArr = _.values(imgsArr);

    imgsArr.forEach(function (img) {
      if (img.width >= img.height) {
        landscapeImages.push(img);
      } else {
        portraitImages.push(img);
      }
    });

    if (options.type.toLowerCase() === 'portrait') {
      results = _.sortBy(portraitImages, 'height');
    } else {
      results = _.sortBy(landscapeImages, 'width');
    }

    if (options.size.toLowerCase() === 'large') {
      return results.length ? results.reverse()[0].url : '/images/notfound.gif';
    } else {
      return results.length ? results[0].url : '/images/notfound.gif';
    }
  },

  cookie: {
    set: function (name, value, days) {
      var expires;
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
      } else {
        expires = '';
      }
      document.cookie = encodeURIComponent(name) + '=' +
                          encodeURIComponent(value) + expires + '; path=/';
    },

    get: function (name) {
      var nameEQ = encodeURIComponent(name) + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    },

    remove: function (name) {
      this.set(name, '', -1);
    }
  },

  url: {
    getQueryValue: function (key) {
      return decodeURIComponent(
        window.location.search.replace(
          new RegExp(
            '^(?:.*[&\\?]' +
            encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$', 'i'
          ),
          '$1'
        )
      );
    }
  }
};

module.exports = utils;
