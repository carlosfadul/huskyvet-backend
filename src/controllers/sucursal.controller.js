const db = require('../database');

// Obtener todas las sucursales
exports.getSucursales = async (req, res) => {
    db.query('SELECT * FROM Sucursal', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener sucursal' });
        } else {
            res.json(results);
        }
    });
};

// Crear una nueva sucursal
exports.createSucursal = async (req, res) => {
    const { veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado } = req.body;
    db.query(
        'INSERT INTO Sucursal (veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear la sucursal' });
            } else {
                res.json({ message: 'Veterinaria creada', sucursal_id: result.insertId });
            }
        }
    );
};
   
// Obtener una sucursal por ID   
exports.getSucursalById = async (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Sucursal WHERE sucursal_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener la sucursal' });
        } else {
            res.json(result[0] || {});
        }
    });
};

// Actualizar una sucursal   
exports.updateSucursal = async (req, res) => {
    const { id } = req.params;
    const { veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado } = req.body;
    db.query(
        'UPDATE Sucursal SET veterinaria_id=?, sucursal_nombre=?, sucursal_direccion=?, sucursal_telefono=?, sucursal_nit=?, sucursal_logo=?, sucursal_estado=? WHERE sucursal_id=?',
        [veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado, id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar la sucursal' });
            } else {
                res.json({ message: 'sucursal actualizada' });
            }
        }
    );
};

// Eliminar una veterinaria
exports.deleteSucursal = async (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Sucursal WHERE sucursal_id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la sucursal' });
        } else {
            res.json({ message: 'Sucursal eliminada' });
        }
    });
};
