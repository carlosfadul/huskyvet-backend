// src/controllers/servicioAliado.controller.js
const db = require('../database');

exports.createServicioAliado = async (req, res) => {
  try {
    const {
      aliado_id,
      nombre_servicioAliado,
      detalle_servicioAliado,
      precio_servicio,
      servicio_estado
    } = req.body;

    const [result] = await db.promise().query(
      `INSERT INTO ServicioAliado (aliado_id, nombre_servicioAliado, detalle_servicioAliado, precio_servicio, servicio_estado)
       VALUES (?, ?, ?, ?, ?)`,
      [aliado_id, nombre_servicioAliado, detalle_servicioAliado, precio_servicio, servicio_estado]
    );

    res.status(201).json({ message: 'ServicioAliado creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear ServicioAliado:', error);
    res.status(500).json({ message: 'Error al crear el servicio aliado', error });
  }
};

exports.getServiciosAliado = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM ServicioAliado');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
};

exports.getServicioAliadoById = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM ServicioAliado WHERE servicioAliado_id = ?', [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener servicio por ID:', error);
    res.status(500).json({ message: 'Error al obtener el servicio' });
  }
};

exports.updateServicioAliado = async (req, res) => {
  try {
    const {
      aliado_id,
      nombre_servicioAliado,
      detalle_servicioAliado,
      precio_servicio,
      servicio_estado
    } = req.body;

    await db.promise().query(
      `UPDATE ServicioAliado SET aliado_id=?, nombre_servicioAliado=?, detalle_servicioAliado=?, precio_servicio=?, servicio_estado=? WHERE servicioAliado_id=?`,
      [aliado_id, nombre_servicioAliado, detalle_servicioAliado, precio_servicio, servicio_estado, req.params.id]
    );

    res.json({ message: 'ServicioAliado actualizado' });
  } catch (error) {
    console.error('Error al actualizar servicio:', error);
    res.status(500).json({ message: 'Error al actualizar el servicio' });
  }
};

exports.deleteServicioAliado = async (req, res) => {
  try {
    await db.promise().query('DELETE FROM ServicioAliado WHERE servicioAliado_id = ?', [req.params.id]);
    res.json({ message: 'ServicioAliado eliminado' });
  } catch (error) {
    console.error('Error al eliminar servicio:', error);
    res.status(500).json({ message: 'Error al eliminar el servicio' });
  }
};
