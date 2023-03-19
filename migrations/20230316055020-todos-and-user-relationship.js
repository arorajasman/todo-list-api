'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // the code below is used to add a oneToMany relationship between the 
    // Todos and the Users table

    // in the code below UserId is the name of the column that we will add as a 
    // foreign key for the Todos table
    return queryInterface.addColumn(
      'Todos',
      'UserId',{
        type: Sequelize.INTEGER,
        // the references below is used to refer to the column of the Users
        // table whole value we are going to pass into the UserId foreign key
        // column of the Todos table
        references:{
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Todos',
      'UserId'
    );
  }
};
