'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher');
var AppConstants = require('constants/AppConstants');
var Fox = require('webapi/FoxAPI');
var MPX = require('adapters/MPXAdapter');

var AppActions = {
  getCurrentUser: function (accessToken) {
    if (accessToken) {
      Fox.getCurrentUser(accessToken).then(function (res) {
        AppDispatcher.dispatch({
          actionType: AppConstants.api.GET_CURRENT_USER,
          response: res
        });
      });
    }
  },

  deleteCurrentUser: function () {
    AppDispatcher.dispatch({
      actionType: AppConstants.api.DELETE_CURRENT_USER
    });
  },

  receiveToken: function (accessToken) {
    AppDispatcher.dispatch({
      actionType: AppConstants.api.RECEIVE_TOKEN,
      response: accessToken
    });
  },

  getAllChannels: function () {
    Fox.getChannels().then(function (res) {
      AppDispatcher.dispatch({
        actionType: AppConstants.api.GET_ALL_CHANNELS,
        response: res
      });
    });
  },

  getAllMovies: function (feedURL) {
    MPX.findMovie(feedURL, {
      range: [1, 20]
    }).then(function (res) {
      AppDispatcher.dispatch({
        actionType: AppConstants.api.GET_ALL_MEDIA,
        response: res
      });
    });
  },

  getMovieByGUID: function (guid) {

  }
};

module.exports = AppActions;
