'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('dispatcher/AppDispatcher');
var AppConstants = require('constants/AppConstants');

var _channels = {};
var _media = {};

var AppStore = assign({}, EventEmitter.prototype, {
  getChannels: function () {
    var channelsArray = [];
    for (var key in _channels) {
      channelsArray[_channels[key].index] = _channels[key];
    }
    return channelsArray;
  },

  getMedia: function () {
    var mediaArray = [];
    for (var key in _media) {
      mediaArray[_media[key].index] = _media[key];
    }
    return mediaArray;
  },

  emitChange: function (changeEvent) {
    this.emit(changeEvent);
  },

  addChangeListener: function (changeEvent, callback) {
    this.on(changeEvent, callback);
  },

  removeChangeListener: function (changeEvent, callback) {
    this.removeListener(changeEvent, callback);
  }
});

AppDispatcher.register(function (action) {

  switch (action.actionType) {
    case AppConstants.api.GET_ALL_CHANNELS:
      var channels = {};
      action.response.forEach(function (channel, i) {
        channel.index = i;
        channels[channel.id] = channel;
      });
      _channels = channels;
      AppStore.emitChange('channelchange');
      break;

    case AppConstants.api.GET_ALL_MEDIA:
      var media = {};
      action.response.forEach(function (entry, i) {
        entry.index = i;
        media[entry.mediaID] = entry;
      });
      _media = media;
      AppStore.emitChange('mediachange');
      break;

    default:
  }

});

module.exports = AppStore;
