const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
    sequelize.define(
        "booktags",
        {
            book_id: {
                type: Sequelize.INTEGER,
            },
            tag_id: {
                type: Sequelize.INTEGER,
            },

        },
        {
            tableName: "books_tag",
            timestamps: false,
        }
    )
};
