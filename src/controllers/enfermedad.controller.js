const db = require('../database');

exports.getEnfermedades = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Enfermedad');
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener enfermedades:', err);
    res.status(500).json({ message: 'Error al obtener enfermedades' });
  }
};

exports.getEnfermedadById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Enfermedad WHERE enfermedad_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Enfermedad no encontrada' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener enfermedad:', err);
    res.status(500).json({ message: 'Error al obtener enfermedad' });
  }
};

exports.createEnfermedad = async (req, res) => {
  const { nombre_enfermedad, descripcion_enfermedad, categoria, especie_afectada } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO Enfermedad (nombre_enfermedad, descripcion_enfermedad, categoria, especie_afectada)
       VALUES (?, ?, ?, ?)`,
      [nombre_enfermedad, descripcion_enfermedad, categoria, especie_afectada]
    );
    res.status(201).json({ message: 'Enfermedad creada', enfermedad_id: result.insertId });
  } catch (err) {
    console.error('Error al crear enfermedad:', err);
    res.status(500).json({ message: 'Error al crear enfermedad' });
  }
};

exports.updateEnfermedad = async (req, res) => {
  const { id } = req.params;
  const { nombre_enfermedad, descripcion_enfermedad, categoria, especie_afectada } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE Enfermedad SET nombre_enfermedad = ?, descripcion_enfermedad = ?, categoria = ?, especie_afectada = ?
       WHERE enfermedad_id = ?`,
      [nombre_enfermedad, descripcion_enfermedad, categoria, especie_afectada, id]
    );
    res.json({ message: 'Enfermedad actualizada' });
  } catch (err) {
    console.error('Error al actualizar enfermedad:', err);
    res.status(500).json({ message: 'Error al actualizar enfermedad' });
  }
};

exports.deleteEnfermedad = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Enfermedad WHERE enfermedad_id = ?', [id]);
    res.json({ message: 'Enfermedad eliminada' });
  } catch (err) {
    console.error('Error al eliminar enfermedad:', err);
    res.status(500).json({ message: 'Error al eliminar enfermedad' });
  }
};
