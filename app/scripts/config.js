'use strict';

function handleUserClickMenuItem(router, params) {
  router.transitionTo('channel', params);
}

module.exports = {
  handleUserClickMenuItem: handleUserClickMenuItem
};
