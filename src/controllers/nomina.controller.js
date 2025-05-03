// src/controllers/nomina.controller.js
const pool = require('../database'); // Usamos el nombre "pool" para dejar claro que es mysql2/promise

// Función para formatear fechas a YYYY-MM-DD
function formatDate(fecha) {
  if (!fecha) return null;
  const d = new Date(fecha);
  return d.toISOString().split('T')[0];
}

// ✅ Versión con async/await para consultas modernas
exports.getAllNominas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Nomina');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error al obtener las nóminas:', err);
    res.status(500).json({ message: 'Error al obtener las nóminas' });
  }
};

exports.getNominaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Nomina WHERE nomina_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nómina no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error al obtener la nómina:', err);
    res.status(500).json({ message: 'Error al obtener la nómina' });
  }
};

exports.createNomina = async (req, res) => {
  const {
    sucursal_id,
    usuario_id,
    nomina_fecha,
    nomina_periodo_inicio,
    nomina_periodo_fin,
    nomina_estado,
    total_nomina,
    observaciones
  } = req.body;

  const estadoFinal = ['borrador', 'calculada', 'pagada', 'cancelada'].includes(nomina_estado)
    ? nomina_estado
    : 'borrador';

  try {
    const [result] = await pool.query(
      `INSERT INTO Nomina (
        sucursal_id, usuario_id, nomina_fecha, nomina_periodo_inicio,
        nomina_periodo_fin, nomina_estado, total_nomina, observaciones)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sucursal_id,
        usuario_id || null,
        formatDate(nomina_fecha),
        formatDate(nomina_periodo_inicio),
        formatDate(nomina_periodo_fin),
        estadoFinal,
        total_nomina || 0,
        observaciones || ''
      ]
    );
    res.status(201).json({ message: 'Nómina creada', id: result.insertId });
  } catch (err) {
    console.error('Error al crear la nómina:', err);
    res.status(500).json({ message: 'Error al crear la nómina' });
  }
};

exports.updateNomina = async (req, res) => {
  const { id } = req.params;
  const {
    sucursal_id,
    usuario_id,
    nomina_fecha,
    nomina_periodo_inicio,
    nomina_periodo_fin,
    nomina_estado,
    total_nomina,
    observaciones
  } = req.body;

  const estadoFinal = ['borrador', 'calculada', 'pagada', 'cancelada'].includes(nomina_estado)
    ? nomina_estado
    : 'borrador';

  try {
    await pool.query(
      `UPDATE Nomina SET
        sucursal_id=?, usuario_id=?, nomina_fecha=?, nomina_periodo_inicio=?,
        nomina_periodo_fin=?, nomina_estado=?, total_nomina=?, observaciones=?
       WHERE nomina_id=?`,
      [
        sucursal_id,
        usuario_id || null,
        formatDate(nomina_fecha),
        formatDate(nomina_periodo_inicio),
        formatDate(nomina_periodo_fin),
        estadoFinal,
        total_nomina || 0,
        observaciones || '',
        id
      ]
    );
    res.json({ message: 'Nómina actualizada' });
  } catch (err) {
    console.error('Error al actualizar la nómina:', err);
    res.status(500).json({ message: 'Error al actualizar la nómina' });
  }
};

exports.deleteNomina = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Nomina WHERE nomina_id = ?', [id]);
    res.json({ message: 'Nómina eliminada' });
  } catch (err) {
    console.error('Error al eliminar la nómina:', err);
    res.status(500).json({ message: 'Error al eliminar la nómina' });
  }
};

exports.getNominasPorSucursal = async (req, res) => {
  const { sucursalId } = req.params;
  console.log('▶️ getNominasPorSucursal invocado con sucursalId =', sucursalId);

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Nomina WHERE sucursal_id = ?',
      [sucursalId]
    );
    console.log('✅ Query completada, filas obtenidas =', rows.length);
    return res.status(200).json(rows);
  } catch (err) {
    console.error('❌ Error en la query de nóminas:', err);
    return res.status(500).json({ message: 'Error al obtener las nóminas por sucursal' });
  }
};

