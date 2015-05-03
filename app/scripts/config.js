'use strict';

function handleUserClickMenuItem(router, params) {
  router.transitionTo('channel', params);
}

function handleUserClickMovie(router, params) {
  console.log(params.mediaID);
}

module.exports = {
  authURL: 'https://fox-staging.herokuapp.com/providers',
  handleUserClickMenuItem: handleUserClickMenuItem,
  handleUserClickMovie: handleUserClickMovie
};
