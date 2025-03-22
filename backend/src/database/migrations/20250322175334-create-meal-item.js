'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Meal_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Meals', 
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      nome_alimento: {
        type: Sequelize.STRING
      },
      quantidade: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Meal_items');
  }
};