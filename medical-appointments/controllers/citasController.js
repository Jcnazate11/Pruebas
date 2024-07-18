const { Cita } = require('../models');

exports.createCita = async (req, res) => {
    try {
        const nuevaCita = await Cita.create(req.body);
        res.status(201).json(nuevaCita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
