const db = require('../database');

// Crear aliado
exports.createAliado = async (req, res) => {
    try {
        const { nombre_aliado, direccion_aliado, telefono_aliado, email, nit_aliado, aliado_detalles, aliado_estado } = req.body;
        const [result] = await db.query(
            'INSERT INTO Aliado (nombre_aliado, direccion_aliado, telefono_aliado, email, nit_aliado, aliado_detalles, aliado_estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre_aliado, direccion_aliado, telefono_aliado, email, nit_aliado, aliado_detalles, aliado_estado || 'activo']
        );
        res.status(201).json({ message: 'Aliado creado', aliado_id: result.insertId });
    } catch (error) {
        console.error('Error al crear aliado:', error);
        res.status(500).json({ message: 'Error al crear aliado' });
    }
};

// Obtener todos los aliados
exports.getAliados = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Aliado');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener aliados:', error);
        res.status(500).json({ message: 'Error al obtener aliados' });
    }
};

// Obtener aliado por ID
exports.getAliadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM Aliado WHERE aliado_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aliado no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener aliado:', error);
        res.status(500).json({ message: 'Error al obtener aliado' });
    }
};

// Actualizar aliado
exports.updateAliado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_aliado, direccion_aliado, telefono_aliado, email, nit_aliado, aliado_detalles, aliado_estado } = req.body;

        const [result] = await db.query(
            'UPDATE Aliado SET nombre_aliado=?, direccion_aliado=?, telefono_aliado=?, email=?, nit_aliado=?, aliado_detalles=?, aliado_estado=? WHERE aliado_id=?',
            [nombre_aliado, direccion_aliado, telefono_aliado, email, nit_aliado, aliado_detalles, aliado_estado, id]
        );

        res.json({ message: 'Aliado actualizado' });
    } catch (error) {
        console.error('Error al actualizar aliado:', error);
        res.status(500).json({ message: 'Error al actualizar aliado' });
    }
};

// Eliminar aliado
exports.deleteAliado = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.query('DELETE FROM Aliado WHERE aliado_id = ?', [id]);

        res.json({ message: 'Aliado eliminado' });
    } catch (error) {
        console.error('Error al eliminar aliado:', error);
        res.status(500).json({ message: 'Error al eliminar aliado' });
    }
};
