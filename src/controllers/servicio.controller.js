const db = require('../database');

// Obtener todos los servicios
const getServicios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Servicio');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
};

// Obtener servicio por ID
const getServicioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Servicio WHERE servicio_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener servicio:', error);
    res.status(500).json({ error: 'Error al obtener servicio' });
  }
};

// Crear servicio
const createServicio = async (req, res) => {
  const { servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO Servicio (servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado || 'activo']
    );
    res.status(201).json({ message: 'Servicio creado', servicio_id: result.insertId });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ error: 'Error al crear servicio' });
  }
};

// Actualizar servicio
const updateServicio = async (req, res) => {
  const { id } = req.params;
  const { servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado } = req.body;
  try {
    await db.query(
      `UPDATE Servicio SET servicio_nombre = ?, servicio_tipo = ?, servicio_detalle = ?, 
       servicio_precio = ?, servicio_duracion = ?, servicio_estado = ?
       WHERE servicio_id = ?`,
      [servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado, id]
    );
    res.json({ message: 'Servicio actualizado' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ error: 'Error al actualizar servicio' });
  }
};

// Eliminar servicio
const deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Servicio WHERE servicio_id = ?', [id]);
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ error: 'Error al eliminar servicio' });
  }
};

module.exports = {
  getServicios,
  getServicioById,
  createServicio,
  updateServicio,
  deleteServicio
};
