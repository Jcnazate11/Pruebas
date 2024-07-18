const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/database');
const pacientesRoutes = require('./routes/pacientes');
const medicosRoutes = require('./routes/medicos');
const citasRoutes = require('./routes/citas');

const app = express();

app.use(bodyParser.json());
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/citas', citasRoutes);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/medico', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'medico.html'));
});

app.get('/paciente', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'paciente.html'));
});

app.get('/cita', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cita.html'));
});

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
