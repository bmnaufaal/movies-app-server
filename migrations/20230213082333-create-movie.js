'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      trailerUrl: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      genreId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Genres',
          },
          key: 'id'
        },
        allowNull: false
      },
      authorId: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'Authors'
          },
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};