const db = require('../database');

// Obtener todas las veterinarias
exports.getVeterinarias = async (req, res) => {
    db.query('SELECT * FROM Veterinaria', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener veterinaria' });
        } else {
            res.json(results);
        }
    });
};

// Crear una nueva veterinaria
exports.createVeterinaria = async (req, res) => {
    const { veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado } = req.body;
    db.query(
        'INSERT INTO Veterinaria (veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado) VALUES (?, ?, ?, ?, ?)',
        [veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear la veterinaria' });
            } else {
                res.json({ message: 'Veterinaria creada', veterinaria_id: result.insertId });
            }
        }
    );
};
   
// Obtener una veterinaria por ID   
exports.getVeterinariaById = async (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Veterinaria WHERE veterinaria_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener la veterinaria' });
        } else {
            res.json(result[0] || {});
        }
    });
};

// Actualizar una veterinaria   
exports.updateVeterinaria = async (req, res) => {
    const { id } = req.params;
    const { veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado } = req.body;
    db.query(
        'UPDATE Veterinaria SET veterinaria_nombre=?, veterinaria_nit=?, veterinaria_direccion=?, veterinaria_telefono=?, veterinaria_estado=? WHERE veterinaria_id=?',
        [veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar la veterinaria' });
            } else {
                res.json({ message: 'Veterinaria actualizada' });
            }
        }
    );
};

// Eliminar una veterinaria
exports.deleteVeterinaria = async (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Veterinaria WHERE veterinaria_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la veterinaria' });
        } else {
            res.json({ message: 'Veterinaria eliminada' });
        }
    });
};
