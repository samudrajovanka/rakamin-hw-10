'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn('movies', 'photo', {
      type: Sequelize.STRING(255)
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('movies', 'photo', {
      type: Sequelize.STRING
    });
  }
};
