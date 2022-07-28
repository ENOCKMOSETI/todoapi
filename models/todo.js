const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['active', 'done', 'archived'],
        defaultValue: 'active',
    },
    isMesurable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
});

module.exports = Todo;