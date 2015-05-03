'use strict';

var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('dispatcher/AppDispatcher');
var AppConstants = require('constants/AppConstants');
var utils = require('utils');

var USER_INFO_COOKIE = 'user_info';
var USER_TOKEN_COOKIE = 'user_token';

var _user = JSON.parse(utils.cookie.get(USER_INFO_COOKIE)) || null;
var _token = utils.cookie.get(USER_TOKEN_COOKIE) || '';
var _channels = {};
var _media = {};

var AppStore = assign({}, EventEmitter.prototype, {
  getUser: function () {
    return _user;
  },

  getToken: function () {
    return _token;
  },

  getChannels: function () {
    var channelsArray = [];
    for (var key in _channels) {
      channelsArray[_channels[key].index] = _channels[key];
    }
    return channelsArray;
  },

  getChannelByID: function (channelID) {
    return !_channels.hasOwnProperty(channelID) ?
             undefined :
             _channels[channelID];
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
    case AppConstants.api.GET_CURRENT_USER:
      _user = action.response;
      utils.cookie.set(USER_INFO_COOKIE, JSON.stringify(_user));
      AppStore.emitChange('userchange');
      break;

    case AppConstants.api.DELETE_CURRENT_USER:
      _user = null;
      _token = '';
      utils.cookie.remove(USER_INFO_COOKIE);
      utils.cookie.remove(USER_TOKEN_COOKIE);
      AppStore.emitChange('userchange');
      break;

    case AppConstants.api.RECEIVE_TOKEN:
      _token = action.response;
      utils.cookie.set(USER_TOKEN_COOKIE, _token);
      AppStore.emitChange('tokenchange');
      break;

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
