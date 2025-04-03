const db = require('../database');
const pool = require('../database'); // Asegúrate de importar tu conexión a MySQL
const con = require('../database'); // Ajusta la ruta según tu estructura


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
    try {
        const { veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono } = req.body;
        const veterinaria_logo = req.file ? req.file.buffer : null; // Guarda el logo como Buffer

        const query = `INSERT INTO Veterinaria (veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_logo)
                       VALUES (?, ?, ?, ?, ?)`;
        const values = [veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_logo];

        await pool.query(query, values); // Usa pool.query en lugar de con.promise().query
        res.status(201).json({ message: "Veterinaria creada con éxito" });

    } catch (error) {
        console.error("Error al crear veterinaria:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
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
/*  
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
*/


exports.updateVeterinaria = async (req, res) => {
    try {
        const { id } = req.params;
        const { veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado } = req.body;
        
        let veterinaria_logo = null;
        if (req.file) {
            veterinaria_logo = req.file.buffer; // Almacenar la imagen en formato binario
        }

        const query = `
            UPDATE Veterinaria 
            SET veterinaria_nombre = ?, veterinaria_nit = ?, veterinaria_direccion = ?, 
                veterinaria_telefono = ?, veterinaria_estado = ?, veterinaria_logo = ?
            WHERE veterinaria_id = ?
        `;

        const values = [veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono, veterinaria_estado, veterinaria_logo, id];

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Veterinaria no encontrada" });
        }

        res.status(200).json({ message: "Veterinaria actualizada correctamente" });

    } catch (error) {
        console.error("Error al actualizar la veterinaria:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
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
