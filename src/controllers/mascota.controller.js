const db = require('../database');

// Crear nueva mascota
exports.createMascota = async (req, res) => {
    try {
        const {
            cliente_id,
            mascota_nombre,
            mascota_especie,
            mascota_raza,
            mascota_sexo,
            mascota_fecha_nac,
            mascota_color,
            mascota_peso,
            mascota_estado
        } = req.body;

        const mascota_foto = req.file ? req.file.buffer : null;

        const [result] = await db.query(
            `INSERT INTO Mascota (
                cliente_id, mascota_nombre, mascota_especie, mascota_raza, mascota_sexo,
                mascota_fecha_nac, mascota_color, mascota_peso, mascota_foto, mascota_estado
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                cliente_id, mascota_nombre, mascota_especie, mascota_raza, mascota_sexo,
                mascota_fecha_nac, mascota_color, mascota_peso, mascota_foto, mascota_estado || 'vivo'
            ]
        );

        res.status(201).json({ message: 'Mascota creada', mascota_id: result.insertId });
    } catch (error) {
        console.error('Error al crear mascota:', error);
        res.status(500).json({ message: 'Error al crear la mascota' });
    }
};

// Obtener todas las mascotas
exports.getMascotas = async (req, res) => {
    try {
        const [mascotas] = await db.query('SELECT * FROM Mascota');
        res.json(mascotas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las mascotas' });
    }
};

// Obtener mascota por ID
exports.getMascotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Mascota WHERE mascota_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Mascota no encontrada' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener la mascota' });
    }
};

// Actualizar mascota
exports.updateMascota = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            cliente_id,
            mascota_nombre,
            mascota_especie,
            mascota_raza,
            mascota_sexo,
            mascota_fecha_nac,
            mascota_color,
            mascota_peso,
            mascota_estado
        } = req.body;

        const mascota_foto = req.file ? req.file.buffer : null;

        const query = `
            UPDATE Mascota SET
                cliente_id = ?, mascota_nombre = ?, mascota_especie = ?, mascota_raza = ?, mascota_sexo = ?,
                mascota_fecha_nac = ?, mascota_color = ?, mascota_peso = ?, ${mascota_foto ? 'mascota_foto = ?,' : ''} mascota_estado = ?
            WHERE mascota_id = ?`;

        const params = [
            cliente_id, mascota_nombre, mascota_especie, mascota_raza, mascota_sexo,
            mascota_fecha_nac, mascota_color, mascota_peso,
            ...(mascota_foto ? [mascota_foto] : []),
            mascota_estado, id
        ];

        await db.query(query, params);

        res.json({ message: 'Mascota actualizada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la mascota' });
    }
};

// Eliminar mascota
exports.deleteMascota = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM Mascota WHERE mascota_id = ?', [id]);
        res.json({ message: 'Mascota eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la mascota' });
    }
};
