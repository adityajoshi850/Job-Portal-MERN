const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        // maps to DB column: name
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "name",
        },

        // maps to DB column: email
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "email",
        },

        // maps to DB column: password
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "password",
        },

        // maps to DB column: role
        userRole: {
            type: DataTypes.ENUM("jobseeker", "jobprovider"),
            allowNull: false,
            defaultValue: "jobseeker",
            field: "role",
        },

        // maps to DB column: username
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "unknown",
            field: "username",
        },
    },
    {
        tableName: "Users",
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = User;
