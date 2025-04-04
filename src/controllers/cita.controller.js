// src/controllers/cita.controller.js
const db = require('../database');

// Obtener todas las citas
exports.getCitas = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Cita');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener citas' });
  }
};

// Obtener cita por ID
exports.getCitaById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Cita WHERE cita_id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener la cita:', error);
    res.status(500).json({ message: 'Error al obtener la cita' });
  }
};

// Crear nueva cita
exports.createCita = async (req, res) => {
  const {
    mascota_id,
    servicio_id,
    usuario_id,
    sucursal_id,
    cita_fecha,
    cita_duracion,
    cita_estado,
    cita_motivo,
    cita_observaciones
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO Cita (mascota_id, servicio_id, usuario_id, sucursal_id, cita_fecha, cita_duracion, cita_estado, cita_motivo, cita_observaciones)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mascota_id, servicio_id, usuario_id || null, sucursal_id, cita_fecha, cita_duracion, cita_estado || 'pendiente', cita_motivo, cita_observaciones]
    );
    res.status(201).json({ message: 'Cita creada exitosamente', cita_id: result.insertId });
  } catch (error) {
    console.error('Error al crear la cita:', error);
    res.status(500).json({ message: 'Error al crear la cita' });
  }
};

// Actualizar cita
exports.updateCita = async (req, res) => {
  const { id } = req.params;
  const {
    mascota_id,
    servicio_id,
    usuario_id,
    sucursal_id,
    cita_fecha,
    cita_duracion,
    cita_estado,
    cita_motivo,
    cita_observaciones
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Cita SET mascota_id = ?, servicio_id = ?, usuario_id = ?, sucursal_id = ?, cita_fecha = ?, cita_duracion = ?, cita_estado = ?, cita_motivo = ?, cita_observaciones = ?
       WHERE cita_id = ?`,
      [mascota_id, servicio_id, usuario_id || null, sucursal_id, cita_fecha, cita_duracion, cita_estado, cita_motivo, cita_observaciones, id]
    );
    res.status(200).json({ message: 'Cita actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la cita:', error);
    res.status(500).json({ message: 'Error al actualizar la cita' });
  }
};

// Eliminar cita
exports.deleteCita = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM Cita WHERE cita_id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la cita:', error);
    res.status(500).json({ message: 'Error al eliminar la cita' });
  }
};
