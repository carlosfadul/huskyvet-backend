const db = require('../database');
const fs = require('fs');

exports.createAtencion = async (req, res) => {
  const {
    mascota_id,
    servicio_id,
    usuario_id,
    atencion_cantidad,
    atencion_precio,
    atencion_detalle,
    atencion_estado,
    diagnostico,
    tratamiento,
    observaciones
  } = req.body;

  const archivoAdjunto = req.file ? req.file.buffer : null;

  try {
    const [result] = await db.query(
      `INSERT INTO Atencion 
      (mascota_id, servicio_id, usuario_id, atencion_cantidad, atencion_precio, atencion_detalle, atencion_archivoAdjunto, atencion_estado, diagnostico, tratamiento, observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mascota_id, servicio_id, usuario_id, atencion_cantidad, atencion_precio, atencion_detalle, archivoAdjunto, atencion_estado, diagnostico, tratamiento, observaciones]
    );
    res.status(201).json({ message: 'Atención creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear atención:', error);
    res.status(500).json({ message: 'Error al crear atención' });
  }
};

exports.getAtenciones = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Atencion');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener atenciones:', error);
    res.status(500).json({ message: 'Error al obtener atenciones' });
  }
};

exports.getAtencionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Atencion WHERE atencion_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Atención no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener atención por ID:', error);
    res.status(500).json({ message: 'Error al obtener atención' });
  }
};

exports.updateAtencion = async (req, res) => {
  const { id } = req.params;
  const {
    mascota_id,
    servicio_id,
    usuario_id,
    atencion_cantidad,
    atencion_precio,
    atencion_detalle,
    atencion_estado,
    diagnostico,
    tratamiento,
    observaciones
  } = req.body;

  const archivoAdjunto = req.file ? req.file.buffer : null;

  try {
    const query = `
      UPDATE Atencion SET 
        mascota_id = ?, 
        servicio_id = ?, 
        usuario_id = ?, 
        atencion_cantidad = ?, 
        atencion_precio = ?, 
        atencion_detalle = ?, 
        atencion_archivoAdjunto = IFNULL(?, atencion_archivoAdjunto), 
        atencion_estado = ?, 
        diagnostico = ?, 
        tratamiento = ?, 
        observaciones = ?
      WHERE atencion_id = ?
    `;
    await db.query(query, [
      mascota_id,
      servicio_id,
      usuario_id,
      atencion_cantidad,
      atencion_precio,
      atencion_detalle,
      archivoAdjunto,
      atencion_estado,
      diagnostico,
      tratamiento,
      observaciones,
      id
    ]);
    res.json({ message: 'Atención actualizada' });
  } catch (error) {
    console.error('Error al actualizar atención:', error);
    res.status(500).json({ message: 'Error al actualizar atención' });
  }
};

exports.deleteAtencion = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Atencion WHERE atencion_id = ?', [id]);
    res.json({ message: 'Atención eliminada' });
  } catch (error) {
    console.error('Error al eliminar atención:', error);
    res.status(500).json({ message: 'Error al eliminar atención' });
  }
};
