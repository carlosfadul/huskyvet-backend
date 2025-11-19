const db = require('../database');

// Crear desparasitante
exports.createDesparasitante = async (req, res) => {
  const data = req.body; // asumimos que los nombres de campos coinciden con las columnas

  try {
    const [result] = await db.query('INSERT INTO Desparasitante SET ?', [data]);
    res.status(201).json({
      message: 'Desparasitante creado',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear desparasitante:', error);
    res.status(500).json({ message: 'Error al crear desparasitante' });
  }
};

// Obtener todos los desparasitantes
exports.getDesparasitantes = async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM Desparasitante ORDER BY desparasitante_id DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener desparasitantes:', error);
    res.status(500).json({ message: 'Error al obtener desparasitantes' });
  }
};

// Obtener un desparasitante por ID
exports.getDesparasitanteById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      'SELECT * FROM Desparasitante WHERE desparasitante_id = ?',
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Desparasitante no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener desparasitante:', error);
    res.status(500).json({ message: 'Error al obtener desparasitante' });
  }
};

// Actualizar desparasitante
exports.updateDesparasitante = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const [result] = await db.query(
      'UPDATE Desparasitante SET ? WHERE desparasitante_id = ?',
      [data, id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Desparasitante no encontrado' });
    }

    res.json({ message: 'Desparasitante actualizado' });
  } catch (error) {
    console.error('Error al actualizar desparasitante:', error);
    res.status(500).json({ message: 'Error al actualizar desparasitante' });
  }
};

// Eliminar desparasitante
exports.deleteDesparasitante = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query(
      'DELETE FROM Desparasitante WHERE desparasitante_id = ?',
      [id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({ message: 'Desparasitante no encontrado' });
    }

    res.json({ message: 'Desparasitante eliminado' });
  } catch (error) {
    console.error('Error al eliminar desparasitante:', error);
    res.status(500).json({ message: 'Error al eliminar desparasitante' });
  }
};
