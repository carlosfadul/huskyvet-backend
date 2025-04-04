// src/controllers/aplicacionDesparasitante.controller.js
const db = require('../database');

exports.createAplicacion = async (req, res) => {
  try {
    const {
      mascota_id,
      desparasitante_id,
      usuario_id,
      aplicacionDesparasitante_fecha,
      proximoDesparasitante_fecha,
      proximoDesparasitante_nombre,
      proximoDesparasitante_detalle,
      aplicacionDesparasitante_estado,
      dosis,
      observaciones
    } = req.body;

    const [result] = await db.promise().query(
      `INSERT INTO AplicacionDesparasitante (
        mascota_id, desparasitante_id, usuario_id, aplicacionDesparasitante_fecha,
        proximoDesparasitante_fecha, proximoDesparasitante_nombre, proximoDesparasitante_detalle,
        aplicacionDesparasitante_estado, dosis, observaciones
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        mascota_id, desparasitante_id, usuario_id, aplicacionDesparasitante_fecha,
        proximoDesparasitante_fecha, proximoDesparasitante_nombre, proximoDesparasitante_detalle,
        aplicacionDesparasitante_estado, dosis, observaciones
      ]
    );

    res.status(201).json({ message: 'Aplicación registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear aplicación:', error);
    res.status(500).json({ message: 'Error al crear aplicación', error });
  }
};

exports.getAplicaciones = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM AplicacionDesparasitante');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener aplicaciones:', error);
    res.status(500).json({ message: 'Error al obtener aplicaciones', error });
  }
};

exports.getAplicacionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().query('SELECT * FROM AplicacionDesparasitante WHERE aplicacionDesparasitante_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Aplicación no encontrada' });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener aplicación:', error);
    res.status(500).json({ message: 'Error al obtener aplicación', error });
  }
};

exports.updateAplicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mascota_id,
      desparasitante_id,
      usuario_id,
      aplicacionDesparasitante_fecha,
      proximoDesparasitante_fecha,
      proximoDesparasitante_nombre,
      proximoDesparasitante_detalle,
      aplicacionDesparasitante_estado,
      dosis,
      observaciones
    } = req.body;

    await db.promise().query(
      `UPDATE AplicacionDesparasitante SET
        mascota_id = ?,
        desparasitante_id = ?,
        usuario_id = ?,
        aplicacionDesparasitante_fecha = ?,
        proximoDesparasitante_fecha = ?,
        proximoDesparasitante_nombre = ?,
        proximoDesparasitante_detalle = ?,
        aplicacionDesparasitante_estado = ?,
        dosis = ?,
        observaciones = ?
      WHERE aplicacionDesparasitante_id = ?`,
      [
        mascota_id, desparasitante_id, usuario_id, aplicacionDesparasitante_fecha,
        proximoDesparasitante_fecha, proximoDesparasitante_nombre, proximoDesparasitante_detalle,
        aplicacionDesparasitante_estado, dosis, observaciones, id
      ]
    );

    res.json({ message: 'Aplicación actualizada' });
  } catch (error) {
    console.error('Error al actualizar aplicación:', error);
    res.status(500).json({ message: 'Error al actualizar aplicación', error });
  }
};

exports.deleteAplicacion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query('DELETE FROM AplicacionDesparasitante WHERE aplicacionDesparasitante_id = ?', [id]);
    res.json({ message: 'Aplicación eliminada' });
  } catch (error) {
    console.error('Error al eliminar aplicación:', error);
    res.status(500).json({ message: 'Error al eliminar aplicación', error });
  }
};
