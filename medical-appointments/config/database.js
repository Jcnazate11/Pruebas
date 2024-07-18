const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('medical_appointments', 'root', '123', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307 // Asegúrate de que este sea el puerto correcto
});

module.exports = sequelize;
