const sequelize = require('../config/database');
const Paciente = require('./Paciente');
const Medico = require('./Medico');
const Cita = require('./Cita'); 
const Consultorio = require('./Consultorio');

Paciente.hasMany(Cita, { foreignKey: 'paciente_id' });
Medico.hasMany(Cita, { foreignKey: 'medico_id' });
Cita.belongsTo(Paciente, { foreignKey: 'paciente_id' });
Cita.belongsTo(Medico, { foreignKey: 'medico_id' });

sequelize.sync({ force: true })
    .then(() => console.log('Database & tables created!'))
    .catch(err => console.log(err));

module.exports = {
    Paciente,
    Medico,
    Cita,
    Consultorio
};
