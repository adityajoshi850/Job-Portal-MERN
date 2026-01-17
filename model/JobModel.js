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
            field: "title", // ✅ Supabase column
        },

        jobDescription: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: "description", // ✅ Supabase column
        },

        jobCompany: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "company", // ✅ Supabase column
        },

        jobLocation: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "location", // ✅ Supabase column
        },

        jobSalary: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "salary", // ✅ Supabase column
        },

        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "userId", // ✅ Supabase column
        },
    },
    {
        tableName: "Jobs",
        freezeTableName: true,
        timestamps: true,
    }
);

module.exports = Job;
