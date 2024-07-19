const express = require('express');
const router = express.Router();
const { Cita } = require('../models');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const citas = await Cita.findAll();
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
