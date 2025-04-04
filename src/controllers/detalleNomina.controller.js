const db = require('../database');

// Obtener todos los detalles de nómina
exports.getAllDetallesNomina = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM DetalleNomina');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener los detalles de nómina:', error);
    res.status(500).json({ error: 'Error al obtener los detalles de nómina' });
  }
};

// Obtener detalle por ID
exports.getDetalleNominaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM DetalleNomina WHERE detalleNomina_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Detalle no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener el detalle de nómina:', error);
    res.status(500).json({ error: 'Error al obtener el detalle de nómina' });
  }
};

// Crear detalle
exports.createDetalleNomina = async (req, res) => {
  const {
    nomina_id,
    empleado_id,
    cantidad_horas,
    valor_hora,
    horas_extras,
    valor_horas_extras,
    bonificaciones,
    descuentos,
    anotaciones
  } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO DetalleNomina (
        nomina_id, empleado_id, cantidad_horas, valor_hora, horas_extras,
        valor_horas_extras, bonificaciones, descuentos, anotaciones
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomina_id,
        empleado_id,
        cantidad_horas,
        valor_hora,
        horas_extras || 0,
        valor_horas_extras || 0,
        bonificaciones || 0,
        descuentos || 0,
        anotaciones
      ]
    );
    res.status(201).json({ message: 'Detalle de nómina creado', detalleNomina_id: result.insertId });
  } catch (error) {
    console.error('Error al crear el detalle de nómina:', error);
    res.status(500).json({ error: 'Error al crear el detalle de nómina' });
  }
};

// Actualizar detalle
exports.updateDetalleNomina = async (req, res) => {
  const { id } = req.params;
  const {
    nomina_id,
    empleado_id,
    cantidad_horas,
    valor_hora,
    horas_extras,
    valor_horas_extras,
    bonificaciones,
    descuentos,
    anotaciones
  } = req.body;

  try {
    await db.query(
      `UPDATE DetalleNomina SET 
        nomina_id = ?, 
        empleado_id = ?, 
        cantidad_horas = ?, 
        valor_hora = ?, 
        horas_extras = ?, 
        valor_horas_extras = ?, 
        bonificaciones = ?, 
        descuentos = ?, 
        anotaciones = ?
       WHERE detalleNomina_id = ?`,
      [
        nomina_id,
        empleado_id,
        cantidad_horas,
        valor_hora,
        horas_extras || 0,
        valor_horas_extras || 0,
        bonificaciones || 0,
        descuentos || 0,
        anotaciones,
        id
      ]
    );
    res.json({ message: 'Detalle de nómina actualizado' });
  } catch (error) {
    console.error('Error al actualizar el detalle de nómina:', error);
    res.status(500).json({ error: 'Error al actualizar el detalle de nómina' });
  }
};

// Eliminar detalle
exports.deleteDetalleNomina = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM DetalleNomina WHERE detalleNomina_id = ?', [id]);
    res.json({ message: 'Detalle de nómina eliminado' });
  } catch (error) {
    console.error('Error al eliminar el detalle de nómina:', error);
    res.status(500).json({ error: 'Error al eliminar el detalle de nómina' });
  }
};
