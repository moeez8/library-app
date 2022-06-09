const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
    sequelize.define(
        "request",
        {
            book_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            request_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            fulfill_date: {
                type: Sequelize.DATE,
            },
            requestedBy: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "requests",
            timestamps: false,
        }
    );
};
