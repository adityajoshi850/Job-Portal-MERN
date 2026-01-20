const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConfig");

const Job = sequelize.define(
    "Job",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        jobTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "title",
        },

        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "description",
        },

        jobCompany: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "company",
        },

        jobLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "location",
        },

        jobSalary: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "salary",
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "userId",
        },
    },
    {
        tableName: "Jobs",
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Job;
