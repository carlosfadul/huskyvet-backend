const db = require('../database');

// Obtener todos los servicios
exports.getServicios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Servicio');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener servicios' });
  }
};

// Obtener un servicio por ID
exports.getServicioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Servicio WHERE servicio_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener servicio por ID:', error);
    res.status(500).json({ message: 'Error al obtener servicio' });
  }
};

// Crear nuevo servicio
exports.createServicio = async (req, res) => {
  const {
    servicio_nombre,
    servicio_tipo,
    servicio_detalle,
    servicio_precio,
    servicio_duracion,
    servicio_estado = 'activo',
  } = req.body;

  try {
    await db.query(
      'INSERT INTO Servicio (servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado) VALUES (?, ?, ?, ?, ?, ?)',
      [servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado]
    );
    res.status(201).json({ message: 'Servicio creado correctamente' });
  } catch (error) {
    console.error('Error al crear servicio:', error);
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// Actualizar servicio
exports.updateServicio = async (req, res) => {
  const { id } = req.params;
  const {
    servicio_nombre,
    servicio_tipo,
    servicio_detalle,
    servicio_precio,
    servicio_duracion,
    servicio_estado,
  } = req.body;

  try {
    await db.query(
      'UPDATE Servicio SET servicio_nombre = ?, servicio_tipo = ?, servicio_detalle = ?, servicio_precio = ?, servicio_duracion = ?, servicio_estado = ? WHERE servicio_id = ?',
      [servicio_nombre, servicio_tipo, servicio_detalle, servicio_precio, servicio_duracion, servicio_estado, id]
    );
    res.status(200).json({ message: 'Servicio actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// Eliminar servicio
exports.deleteServicio = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM Servicio WHERE servicio_id = ?', [id]);
    res.status(200).json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};
