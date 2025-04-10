const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Message extends Model {}

Message.init({
    Message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Rooms',
            key: 'Room_id',
        },
    },
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'User_id',
        },
    },
    Content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages',
    timestamps: false,
});

module.exports = Message;