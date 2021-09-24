'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
      queryInterface.bulkInsert(
      "Comments",
      [
        {
            movieId: 1,
            movieTitle: "test title",
            userIp: "127.0.0.0.0",
            comment: "First comment",
            createdAt: new Date(),
            updatedAt: new Date()
        }
      ],
      {}
  ),

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete("Comments", null, {})
  }
};
