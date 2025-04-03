const db = require('../database');
const pool = require('../database'); // Asegúrate de importar tu conexión a MySQL
const con = require('../database'); // Ajusta la ruta según tu estructura



// Obtener todas las veterinarias
exports.getVeterinarias = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Veterinaria");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener veterinarias:", error);
        res.status(500).json({ error: "Error al obtener veterinarias" });
    }
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
    try {
        const { id } = req.params; // Obtiene el ID de los parámetros de la URL
        const [rows] = await pool.query("SELECT * FROM Veterinaria WHERE veterinaria_id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Veterinaria no encontrada" });
        }

        res.json(rows[0]); // Devuelve solo la veterinaria encontrada
    } catch (error) {
        console.error("Error al obtener veterinaria por ID:", error);
        res.status(500).json({ error: "Error al obtener veterinaria" });
    }
};

// Actualizar una veterinaria
exports.updateVeterinaria = async (req, res) => {
    try {
        const { id } = req.params;
        const { veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono } = req.body;
        const veterinaria_logo = req.file ? req.file.buffer : null; // Si hay un logo, lo convierte en buffer

        let query = `UPDATE Veterinaria SET 
            veterinaria_nombre = ?, 
            veterinaria_nit = ?, 
            veterinaria_direccion = ?, 
            veterinaria_telefono = ?`;

        let values = [veterinaria_nombre, veterinaria_nit, veterinaria_direccion, veterinaria_telefono];

        // Si hay un logo, también lo actualiza
        if (veterinaria_logo) {
            query += `, veterinaria_logo = ?`;
            values.push(veterinaria_logo);
        }

        query += ` WHERE veterinaria_id = ?`;
        values.push(id);

        const [result] = await pool.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Veterinaria no encontrada" });
        }

        res.json({ message: "Veterinaria actualizada con éxito" });

    } catch (error) {
        console.error("Error al actualizar veterinaria:", error);
        res.status(500).json({ error: "Error interno del servidor" });
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
