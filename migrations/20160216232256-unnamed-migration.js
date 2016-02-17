'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
        queryInterface.removeColumn('joins', 'favoriteId')
        queryInterface.removeColumn('joins', 'omdbFavoriteId')
        queryInterface.addColumn('joins', 'favoriteId', Sequelize.INTEGER)
        queryInterface.addColumn('joins', 'omdbFavoriteId', Sequelize.INTEGER)
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
