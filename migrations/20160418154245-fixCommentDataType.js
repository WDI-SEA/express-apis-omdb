'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.TEXT,
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('comments', 'text', {
      type: Sequelize.STRING,
      }
    )
  }
};
