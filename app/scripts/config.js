'use strict';

function handleUserClickMenuItem(router, params) {
  router.transitionTo('channel', params);
}

function handleUserClickMovie(router, params) {
  console.log(params.mediaID);
}

module.exports = {
  handleUserClickMenuItem: handleUserClickMenuItem,
  handleUserClickMovie: handleUserClickMovie
};
