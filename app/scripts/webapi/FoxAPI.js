'use strict';

var assign = require('object-assign');
var Promise = require('promise');
var request = require('superagent');

var CHANNELS_URL = 'https://fox-staging.herokuapp.com/api/v1/channels.json';

function cookData(rawData) {
  var process = {
    getChannelID: function () {
      return rawData.channel_id;
    },

    getName: function () {
      return rawData.display_name;
    }
  };

  return assign(rawData, {
    channelID: process.getChannelID(),
    name: process.getName()
  });
}

var FoxAPI = {
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
