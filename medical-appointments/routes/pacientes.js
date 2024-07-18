const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');

// Obtener todos los pacientes
router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo paciente
router.post('/', async (req, res) => {
    try {
        const nuevoPaciente = await Paciente.create(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
