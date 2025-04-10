const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Room extends Model {}

Room.init({
    Room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Room_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    Created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'User_id',
        },
    },
    Created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
    timestamps: false,
});

module.exports = Room;