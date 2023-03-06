"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const bookmarks = require("../data/bookmarks.json").map((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
      return element;
    });
    await queryInterface.bulkInsert("Bookmarks", bookmarks, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookmarks", null, {});
  },
};
