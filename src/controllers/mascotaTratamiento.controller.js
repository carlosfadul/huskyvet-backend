const db = require('../database');

exports.createMascotaTratamiento = async (req, res) => {
  try {
    const {
      mascota_id, tratamiento_id, atencion_id,
      fecha_inicio, fecha_fin, dosis, frecuencia,
      via_administracion, observaciones, estado
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO MascotaTratamiento 
      (mascota_id, tratamiento_id, atencion_id, fecha_inicio, fecha_fin, dosis, frecuencia, via_administracion, observaciones, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [mascota_id, tratamiento_id, atencion_id, fecha_inicio, fecha_fin, dosis, frecuencia, via_administracion, observaciones, estado]
    );

    res.status(201).json({ message: 'Tratamiento asignado a mascota', id: result.insertId });
  } catch (error) {
    console.error('Error al asignar tratamiento:', error);
    res.status(500).json({ error: 'Error al asignar tratamiento a la mascota' });
  }
};

exports.getMascotaTratamientos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM MascotaTratamiento');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tratamientos:', error);
    res.status(500).json({ error: 'Error al obtener tratamientos' });
  }
};

exports.getMascotaTratamientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM MascotaTratamiento WHERE mascota_tratamiento_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tratamiento no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener tratamiento:', error);
    res.status(500).json({ error: 'Error al obtener tratamiento' });
  }
};

exports.updateMascotaTratamiento = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      mascota_id, tratamiento_id, atencion_id,
      fecha_inicio, fecha_fin, dosis, frecuencia,
      via_administracion, observaciones, estado
    } = req.body;

    await db.query(
      `UPDATE MascotaTratamiento 
       SET mascota_id=?, tratamiento_id=?, atencion_id=?, fecha_inicio=?, fecha_fin=?, dosis=?, frecuencia=?, via_administracion=?, observaciones=?, estado=?
       WHERE mascota_tratamiento_id=?`,
      [mascota_id, tratamiento_id, atencion_id, fecha_inicio, fecha_fin, dosis, frecuencia, via_administracion, observaciones, estado, id]
    );

    res.json({ message: 'Tratamiento actualizado' });
  } catch (error) {
    console.error('Error al actualizar tratamiento:', error);
    res.status(500).json({ error: 'Error al actualizar tratamiento' });
  }
};

exports.deleteMascotaTratamiento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM MascotaTratamiento WHERE mascota_tratamiento_id = ?', [id]);
    res.json({ message: 'Tratamiento eliminado' });
  } catch (error) {
    console.error('Error al eliminar tratamiento:', error);
    res.status(500).json({ error: 'Error al eliminar tratamiento' });
  }
};
