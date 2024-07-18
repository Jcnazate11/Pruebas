const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Consultorio = sequelize.define('Consultorio', {
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    piso: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Consultorio;
