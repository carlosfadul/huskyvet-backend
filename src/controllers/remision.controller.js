const db = require('../database');

exports.getAllRemisiones = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Remision');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener las remisiones:', error);
    res.status(500).json({ error: 'Error al obtener las remisiones' });
  }
};

exports.getRemisionById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Remision WHERE remision_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Remisión no encontrada' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener la remisión:', error);
    res.status(500).json({ error: 'Error al obtener la remisión' });
  }
};

exports.createRemision = async (req, res) => {
  const {
    sucursal_id,
    aliado_id,
    mascota_id,
    usuario_id,
    remision_fecha,
    remision_estado,
    remision_diagnostico,
    remision_observaciones,
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO Remision 
      (sucursal_id, aliado_id, mascota_id, usuario_id, remision_fecha, remision_estado, remision_diagnostico, remision_observaciones)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sucursal_id,
        aliado_id,
        mascota_id,
        usuario_id || null,
        remision_fecha,
        remision_estado,
        remision_diagnostico,
        remision_observaciones,
      ]
    );
    res.status(201).json({ message: 'Remisión creada', remision_id: result.insertId });
  } catch (error) {
    console.error('Error al crear la remisión:', error);
    res.status(500).json({ error: 'Error al crear la remisión' });
  }
};

exports.updateRemision = async (req, res) => {
  const { id } = req.params;
  const {
    sucursal_id,
    aliado_id,
    mascota_id,
    usuario_id,
    remision_fecha,
    remision_estado,
    remision_diagnostico,
    remision_observaciones,
  } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE Remision 
       SET sucursal_id = ?, aliado_id = ?, mascota_id = ?, usuario_id = ?, 
           remision_fecha = ?, remision_estado = ?, remision_diagnostico = ?, remision_observaciones = ?
       WHERE remision_id = ?`,
      [
        sucursal_id,
        aliado_id,
        mascota_id,
        usuario_id || null,
        remision_fecha,
        remision_estado,
        remision_diagnostico,
        remision_observaciones,
        id,
      ]
    );
    res.json({ message: 'Remisión actualizada' });
  } catch (error) {
    console.error('Error al actualizar la remisión:', error);
    res.status(500).json({ error: 'Error al actualizar la remisión' });
  }
};

exports.deleteRemision = async (req, res) => {
  try {
    await db.query('DELETE FROM Remision WHERE remision_id = ?', [req.params.id]);
    res.json({ message: 'Remisión eliminada' });
  } catch (error) {
    console.error('Error al eliminar la remisión:', error);
    res.status(500).json({ error: 'Error al eliminar la remisión' });
  }
};
