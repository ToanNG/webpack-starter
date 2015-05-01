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
  }
};

module.exports = utils;
