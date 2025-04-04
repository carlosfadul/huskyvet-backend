const db = require('../database');

// Obtener todas las aplicaciones
exports.getAplicacionesVacuna = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM AplicacionVacuna');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener aplicaciones de vacuna:', error);
        res.status(500).json({ message: 'Error al obtener aplicaciones de vacuna' });
    }
};

// Obtener aplicación por ID
exports.getAplicacionVacunaById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM AplicacionVacuna WHERE aplicacionVacuna_id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Aplicación no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al obtener la aplicación:', error);
        res.status(500).json({ message: 'Error al obtener la aplicación' });
    }
};

// Crear nueva aplicación
exports.createAplicacionVacuna = async (req, res) => {
    const {
        mascota_id, vacuna_id, usuario_id, aplicacionVacuna_fecha,
        proximaVacuna_fecha, proximaVacuna_nombre, proximaVacuna_detalle,
        aplicacionVacuna_estado, lote_vacuna, observaciones
    } = req.body;

    try {
        const [result] = await db.query(`
            INSERT INTO AplicacionVacuna (
                mascota_id, vacuna_id, usuario_id, aplicacionVacuna_fecha,
                proximaVacuna_fecha, proximaVacuna_nombre, proximaVacuna_detalle,
                aplicacionVacuna_estado, lote_vacuna, observaciones
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            mascota_id, vacuna_id, usuario_id, aplicacionVacuna_fecha || new Date(),
            proximaVacuna_fecha, proximaVacuna_nombre, proximaVacuna_detalle,
            aplicacionVacuna_estado, lote_vacuna, observaciones
        ]);
        res.status(201).json({ message: 'Aplicación creada', id: result.insertId });
    } catch (error) {
        console.error('Error al crear aplicación:', error);
        res.status(500).json({ message: 'Error al crear aplicación' });
    }
};

// Actualizar aplicación
exports.updateAplicacionVacuna = async (req, res) => {
    const { id } = req.params;
    const {
        mascota_id, vacuna_id, usuario_id, aplicacionVacuna_fecha,
        proximaVacuna_fecha, proximaVacuna_nombre, proximaVacuna_detalle,
        aplicacionVacuna_estado, lote_vacuna, observaciones
    } = req.body;

    try {
        const [result] = await db.query(`
            UPDATE AplicacionVacuna SET
                mascota_id = ?, vacuna_id = ?, usuario_id = ?, aplicacionVacuna_fecha = ?,
                proximaVacuna_fecha = ?, proximaVacuna_nombre = ?, proximaVacuna_detalle = ?,
                aplicacionVacuna_estado = ?, lote_vacuna = ?, observaciones = ?
            WHERE aplicacionVacuna_id = ?
        `, [
            mascota_id, vacuna_id, usuario_id, aplicacionVacuna_fecha,
            proximaVacuna_fecha, proximaVacuna_nombre, proximaVacuna_detalle,
            aplicacionVacuna_estado, lote_vacuna, observaciones, id
        ]);
        res.json({ message: 'Aplicación actualizada' });
    } catch (error) {
        console.error('Error al actualizar aplicación:', error);
        res.status(500).json({ message: 'Error al actualizar aplicación' });
    }
};

// Eliminar aplicación
exports.deleteAplicacionVacuna = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM AplicacionVacuna WHERE aplicacionVacuna_id = ?', [id]);
        res.json({ message: 'Aplicación eliminada' });
    } catch (error) {
        console.error('Error al eliminar aplicación:', error);
        res.status(500).json({ message: 'Error al eliminar aplicación' });
    }
};
