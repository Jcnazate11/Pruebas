const express = require('express');
const router = express.Router();
const { Medico } = require('../models');

// Obtener todos los médicos
router.get('/', async (req, res) => {
    try {
        const medicos = await Medico.findAll();
        res.json(medicos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo médico
router.post('/', async (req, res) => {
    try {
        const nuevoMedico = await Medico.create(req.body);
        res.status(201).json(nuevoMedico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
