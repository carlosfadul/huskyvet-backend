const db = require('../database');

// Obtener todas las vacunas
exports.getVacunas = (req, res) => {
    db.query('SELECT * FROM Vacuna', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener vacunas' });
        } else {
            res.json(results);
        }
    });
};

// Crear una nueva vacuna
exports.createVacuna = (req, res) => {
    const { vacuna_nombre, vacuna_laboratorio, vacuna_detalles, especie_destinada, edad_minima_semanas, frecuencia_meses } = req.body;
    db.query(
        'INSERT INTO Vacuna (vacuna_nombre, vacuna_laboratorio, vacuna_detalles, especie_destinada, edad_minima_semanas, frecuencia_meses) VALUES (?, ?, ?, ?, ?, ?)',
        [vacuna_nombre, vacuna_laboratorio, vacuna_detalles, especie_destinada, edad_minima_semanas, frecuencia_meses],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear la vacuna' });
            } else {
                res.json({ message: 'Vacuna creada', vacuna_id: result.insertId });
            }
        }
    );
};

// Obtener una vacuna por ID
exports.getVacunaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Vacuna WHERE vacuna_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener la vacuna' });
        } else {
            res.json(result[0] || {});
        }
    });
};

// Actualizar una vacuna
exports.updateVacuna = (req, res) => {
    const { id } = req.params;
    const { vacuna_nombre, vacuna_laboratorio, vacuna_detalles, especie_destinada, edad_minima_semanas, frecuencia_meses } = req.body;
    db.query(
        'UPDATE Vacuna SET vacuna_nombre=?, vacuna_laboratorio=?, vacuna_detalles=?, especie_destinada=?, edad_minima_semanas=?, frecuencia_meses=? WHERE vacuna_id=?',
        [vacuna_nombre, vacuna_laboratorio, vacuna_detalles, especie_destinada, edad_minima_semanas, frecuencia_meses, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar la vacuna' });
            } else {
                res.json({ message: 'Vacuna actualizada' });
            }
        }
    );
};

// Eliminar una vacuna
exports.deleteVacuna = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Vacuna WHERE vacuna_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la vacuna' });
        } else {
            res.json({ message: 'Vacuna eliminada' });
        }
    });
};
