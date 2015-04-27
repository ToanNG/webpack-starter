'use strict';

var AppDispatcher = require('dispatcher/AppDispatcher');
var AppConstants = require('constants/AppConstants');
var Fox = require('webapi/FoxAPI');
var MPX = require('adapters/MPXAdapter');

var AppActions = {
  getAllChannels: function () {
    Fox.getChannels().then(function (res) {
      AppDispatcher.dispatch({
        actionType: AppConstants.api.GET_ALL_CHANNELS,
        response: res
      });
    });
  },

  getAllMovies: function () {

  },

  getMovieByGUID: function (guid) {

  }
};

module.exports = AppActions;
