'use strict';

var assign = require('object-assign');
var Promise = require('promise');
var request = require('superagent');

var CURRENT_USER_URL = 'https://fox-staging.herokuapp.com/api/v1/users/me.json';
var CHANNELS_URL = 'https://fox-staging.herokuapp.com/api/v1/channels.json';

function cookData(rawData) {
  var process = {
    getID: function () {
      return rawData.channel_id;
    },

    getName: function () {
      return rawData.display_name;
    },

    getContentFeedURL: function () {
      return rawData.android_content_media_feed_url;
    },

    checkIsSeries: function () {
      return rawData.android_use_series_feed;
    }
  };

  return assign(rawData, {
    id: process.getID(),
    name: process.getName(),
    contentFeedURL: process.getContentFeedURL(),
    isSeries: process.checkIsSeries()
  });
}

var FoxAPI = {
  getCurrentUser: function (accessToken) {
    return new Promise(function (resolve, reject) {
      request.get(CURRENT_USER_URL, { access_token: accessToken })
        .end(function (err, res) {
          if (err) {
            return reject(err);
          }
          return resolve(JSON.parse(res.text));
        });
    });
  },

  getChannels: function (countryCode) {
    return new Promise(function (resolve, reject) {
      request.get(CHANNELS_URL + '?country_code=' + (countryCode || 'SG'))
        .end(function (err, res) {
          res = JSON.parse(res.text).map(function (channel) {
            return cookData(channel);
          });
          resolve(res);
        });
    });
  }
};

module.exports = FoxAPI;
