"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: " Doe",
          username: "talha",
          email: "talha@gmail.com",
          password: "1234567",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "kashif Doe",
          username: "talha",
          email: "talh12a@gmail.com",
          password: "1234567",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Zeeshan Doe",
          username: "talha",
          email: "talh3a@gmail.com",
          password: "1234567",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
