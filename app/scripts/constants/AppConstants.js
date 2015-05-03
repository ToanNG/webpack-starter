'use strict';

var keyMirror = require('keymirror');

module.exports = {
  api: keyMirror({
    GET_CURRENT_USER: null,
    DELETE_CURRENT_USER: null,
    RECEIVE_TOKEN: null,
    GET_ALL_CHANNELS: null,
    GET_ALL_MEDIA: null
  })
};
