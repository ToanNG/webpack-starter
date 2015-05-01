'use strict';

var _ = require('lodash');
var request = require('superagent');
var Promise = require('promise');
var utils = require('utils');

var HIGHLIGHT_FEED_URL =
  'https://feed.theplatform.com/f/levyRC/foxplay_%channel%_android?form=cjson';

function makeURL(feedURL, params) {
  if (params.hasOwnProperty('range')) {
    params.range = params.range.join('-');
  }

  if (params.hasOwnProperty('fields')) {
    params.fields = params.fields.join(',');
  }

  if (params.hasOwnProperty('byTags')) {
    params.byTags = params.byTags.join('|');
  }

  return feedURL + '&' + _.pairs(params).map(function (param) {
    return param.join('=');
  }).join('&');
}

function cookData(rawData) {
  var process = {
    getMediaID: function () {
      return rawData.guid;
    },

    getTitle: function () {
      return rawData.title;
    },

    getPoster: function () {
      return utils.getImage(rawData.thumbnails, {
        type: 'portrait',
        size: 'small'
      });
    },

    getBanner: function () {
      return utils.getImage(rawData.thumbnails, {
        type: 'landscape',
        size: 'large'
      });
    }
  };

  return {
    mediaID: process.getMediaID(),
    title: process.getTitle(),
    poster: process.getPoster(),
    banner: process.getBanner()
  };
}

var MPXAdapter = {
  findMovie: function (channelID, params) {
    var feedURL = HIGHLIGHT_FEED_URL.replace('%channel%', channelID);

    return new Promise(function (resolve, reject) {
      request.get(makeURL(feedURL, params))
        .end(function (err, res) {
          res = JSON.parse(res.text).entries.map(function (entry) {
            return cookData(entry);
          });
          resolve(res);
        });
    });
  }
};

module.exports = MPXAdapter;
