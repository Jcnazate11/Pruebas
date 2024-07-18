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

// Actualizar una cita
router.put('/:id', async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id);
        if (cita) {
            await cita.update(req.body);
            res.json(cita);
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una cita
router.delete('/:id', async (req, res) => {
    try {
        const cita = await Cita.findByPk(req.params.id);
        if (cita) {
            await cita.destroy();
            res.status(204).json({ message: 'Cita eliminada' });
        } else {
            res.status(404).json({ error: 'Cita no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
