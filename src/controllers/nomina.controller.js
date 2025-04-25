// src/controllers/nomina.controller.js
const db = require('../database');

// Función para formatear fechas a YYYY-MM-DD
function formatDate(fecha) {
  if (!fecha) return null;
  const d = new Date(fecha);
  return d.toISOString().split('T')[0];
}

exports.getAllNominas = (req, res) => {
  db.query('SELECT * FROM Nomina', (err, rows) => {
    if (err) {
      console.error('Error al obtener las nóminas:', err);
      return res.status(500).json({ message: 'Error al obtener las nóminas' });
    }
    res.status(200).json(rows);
  });
};

exports.getNominaById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Nomina WHERE nomina_id = ?', [id], (err, rows) => {
    if (err) {
      console.error('Error al obtener la nómina:', err);
      return res.status(500).json({ message: 'Error al obtener la nómina' });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nómina no encontrada' });
    }
    res.status(200).json(rows[0]);
  });
};

exports.createNomina = (req, res) => {
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

  db.query(
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
    ],
    (err, result) => {
      if (err) {
        console.error('Error al crear la nómina:', err);
        return res.status(500).json({ message: 'Error al crear la nómina' });
      }
      res.status(201).json({ message: 'Nómina creada', id: result.insertId });
    }
  );
};

exports.updateNomina = (req, res) => {
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

  db.query(
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
    ],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar la nómina:', err);
        return res.status(500).json({ message: 'Error al actualizar la nómina' });
      }
      res.json({ message: 'Nómina actualizada' });
    }
  );
};

exports.deleteNomina = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM Nomina WHERE nomina_id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la nómina:', err);
      return res.status(500).json({ message: 'Error al eliminar la nómina' });
    }
    res.json({ message: 'Nómina eliminada' });
  });
};

// src/controllers/nomina.controller.js

exports.getNominasPorSucursal = async (req, res) => {
  const { sucursalId } = req.params;
  console.log('▶️ getNominasPorSucursal invocado con sucursalId =', sucursalId);

  // Prueba mínima
  try {
    const [testRows] = await db.query('SELECT 1 AS prueba');
    console.log('🔍 SELECT 1 rowsPrueba =', testRows);
  } catch (err) {
    console.error('❌ Error en SELECT 1:', err);
  }

  // Query real de nóminas
  try {
    const [rows] = await db.query(
      'SELECT * FROM Nomina WHERE sucursal_id = ?',
      [sucursalId]
    );
    console.log('✅ Query completada, filas obtenidas =', rows.length);
    return res.status(200).json(rows);
  } catch (err) {
    console.error('❌ Error en la query de nóminas:', err);
    return res
      .status(500)
      .json({ message: 'Error al obtener las nóminas por sucursal' });
  }
};




