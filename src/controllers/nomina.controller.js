// src/controllers/nomina.controller.js
const db = require('../database');


exports.getAllNominas = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM Nomina');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener las nóminas:', error);
    res.status(500).json({ message: 'Error al obtener las nóminas' });
  }
};

exports.getNominaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.promise().query('SELECT * FROM Nomina WHERE nomina_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nómina no encontrada' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error al obtener la nómina:', error);
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

  try {
    const [result] = await db.promise().query(
      `INSERT INTO Nomina (sucursal_id, usuario_id, nomina_fecha, nomina_periodo_inicio, nomina_periodo_fin, nomina_estado, total_nomina, observaciones)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [sucursal_id, usuario_id, nomina_fecha, nomina_periodo_inicio, nomina_periodo_fin, nomina_estado, total_nomina, observaciones]
    );
    res.status(201).json({ message: 'Nómina creada', id: result.insertId });
  } catch (error) {
    console.error('Error al crear la nómina:', error);
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

  try {
    await db.promise().query(
      `UPDATE Nomina SET sucursal_id=?, usuario_id=?, nomina_fecha=?, nomina_periodo_inicio=?, nomina_periodo_fin=?, nomina_estado=?, total_nomina=?, observaciones=? WHERE nomina_id=?`,
      [sucursal_id, usuario_id, nomina_fecha, nomina_periodo_inicio, nomina_periodo_fin, nomina_estado, total_nomina, observaciones, id]
    );
    res.json({ message: 'Nómina actualizada' });
  } catch (error) {
    console.error('Error al actualizar la nómina:', error);
    res.status(500).json({ message: 'Error al actualizar la nómina' });
  }
};

exports.deleteNomina = async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query('DELETE FROM Nomina WHERE nomina_id = ?', [id]);
    res.json({ message: 'Nómina eliminada' });
  } catch (error) {
    console.error('Error al eliminar la nómina:', error);
    res.status(500).json({ message: 'Error al eliminar la nómina' });
  }
};
