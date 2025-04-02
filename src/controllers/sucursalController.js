const multer = require('multer');
const db = require('../database'); // Asegúrate de importar tu conexión a MySQL
const e = require('express');

// Configurar Multer para manejar la subida de imágenes en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Crear una sucursal con logo
exports.createSucursal = (req, res) => {
    const { veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_estado } = req.body;
    const sucursal_logo = req.file ? req.file.buffer : null; // Si hay un archivo, lo guarda en buffer

    const query = `
        INSERT INTO Sucursal (veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado], (err, result) => {
        if (err) {
            console.error('Error al crear sucursal:', err);
            return res.status(500).json({ error: 'Error al crear sucursal' });
        }
        res.status(201).json({ message: 'Sucursal creada con éxito', sucursal_id: result.insertId });
    });
};
// Obtener todas las sucursales
exports.getSucursales = (req, res) => {
    db.query('SELECT * FROM Sucursal', (err, results) => {
        if (err) {
            console.error('Error al obtener sucursales:', err);
            return res.status(500).json({ error: 'Error al obtener sucursales' });
        }
        res.json(results);
    });
};
// Obtener una sucursal por ID
exports.getSucursalById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Sucursal WHERE sucursal_id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al obtener sucursal:', err);
            return res.status(500).json({ error: 'Error al obtener sucursal' });
        }
        res.json(result[0] || {});
    });
}
// Actualizar una sucursal
exports.updateSucursal = (req, res) => {
    const { id } = req.params;
    const { veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_estado } = req.body;
    const sucursal_logo = req.file ? req.file.buffer : null; // Si hay un archivo, lo guarda en buffer

    const query = `
        UPDATE Sucursal 
        SET veterinaria_id=?, sucursal_nombre=?, sucursal_direccion=?, sucursal_telefono=?, sucursal_nit=?, sucursal_logo=?, sucursal_estado=? 
        WHERE sucursal_id=?`;

    db.query(query, [veterinaria_id, sucursal_nombre, sucursal_direccion, sucursal_telefono, sucursal_nit, sucursal_logo, sucursal_estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar sucursal:', err);
            return res.status(500).json({ error: 'Error al actualizar sucursal' });
        }
        res.json({ message: 'Sucursal actualizada con éxito' });
    });
}
// Eliminar una sucursal
exports.deleteSucursal = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Sucursal WHERE sucursal_id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar sucursal:', err);
            return res.status(500).json({ error: 'Error al eliminar sucursal' });
        }
        res.json({ message: 'Sucursal eliminada con éxito' });
    });
}
// Middleware para manejar la subida de imágenes
exports.uploadLogo = upload.single('sucursal_logo'); // 'sucursal_logo' es el nombre del campo en el formulario
// Exportar el middleware para usarlo en las rutas
exports.upload = upload.single('sucursal_logo'); // 'sucursal_logo' es el nombre del campo en el formulario
