const db = require('../database');

// Crear tratamiento
exports.createTratamiento = async (req, res) => {
  try {
    const { nombre_tratamiento, descripcion_tratamiento, tipo_tratamiento, duracion_recomendada } = req.body;

    const [result] = await db.query(
      'INSERT INTO Tratamiento (nombre_tratamiento, descripcion_tratamiento, tipo_tratamiento, duracion_recomendada) VALUES (?, ?, ?, ?)',
      [nombre_tratamiento, descripcion_tratamiento, tipo_tratamiento, duracion_recomendada]
    );

    res.status(201).json({ message: 'Tratamiento creado', tratamiento_id: result.insertId });
  } catch (error) {
    console.error('Error al crear tratamiento:', error);
    res.status(500).json({ message: 'Error al crear tratamiento' });
  }
};

// Obtener todos los tratamientos
exports.getAllTratamientos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Tratamiento');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener tratamientos:', error);
    res.status(500).json({ message: 'Error al obtener tratamientos' });
  }
};

// Obtener tratamiento por ID
exports.getTratamientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM Tratamiento WHERE tratamiento_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener tratamiento por ID:', error);
    res.status(500).json({ message: 'Error al obtener tratamiento' });
  }
};

// Actualizar tratamiento
exports.updateTratamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_tratamiento, descripcion_tratamiento, tipo_tratamiento, duracion_recomendada } = req.body;

    await db.query(
      'UPDATE Tratamiento SET nombre_tratamiento = ?, descripcion_tratamiento = ?, tipo_tratamiento = ?, duracion_recomendada = ? WHERE tratamiento_id = ?',
      [nombre_tratamiento, descripcion_tratamiento, tipo_tratamiento, duracion_recomendada, id]
    );

    res.status(200).json({ message: 'Tratamiento actualizado' });
  } catch (error) {
    console.error('Error al actualizar tratamiento:', error);
    res.status(500).json({ message: 'Error al actualizar tratamiento' });
  }
};

// Eliminar tratamiento
exports.deleteTratamiento = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query('DELETE FROM Tratamiento WHERE tratamiento_id = ?', [id]);

    res.status(200).json({ message: 'Tratamiento eliminado' });
  } catch (error) {
    console.error('Error al eliminar tratamiento:', error);
    res.status(500).json({ message: 'Error al eliminar tratamiento' });
  }
};
