const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class UserRoom extends Model {}

UserRoom.init({
    User_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'User_id'
        }
    },
    Room_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Rooms',
            key: 'Room_id'
        }
    },
    Joined_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    Role: {
        type: DataTypes.ENUM('member', 'admin'),
        defaultValue: 'member'
    }
}, {
    sequelize,
    modelName: 'UserRoom',
    tableName: 'User_Rooms',
    timestamps: false
});

module.exports = UserRoom;