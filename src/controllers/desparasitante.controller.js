// src/controllers/desparasitante.controller.js
const db = require('../database');

exports.createDesparasitante = async (req, res) => {
  try {
    const {
      desparasitante_nombre,
      desparasitante_laboratorio,
      desparasitante_detalles,
      tipo,
      especie_destinada,
      edad_minima_semanas,
      peso_minimo,
      peso_maximo
    } = req.body;

    const [result] = await db.promise().query(
      `INSERT INTO Desparasitante (desparasitante_nombre, desparasitante_laboratorio, desparasitante_detalles, tipo, especie_destinada, edad_minima_semanas, peso_minimo, peso_maximo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        desparasitante_nombre,
        desparasitante_laboratorio,
        desparasitante_detalles,
        tipo,
        especie_destinada,
        edad_minima_semanas,
        peso_minimo,
        peso_maximo
      ]
    );

    res.status(201).json({ message: 'Desparasitante creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear desparasitante:', error);
    res.status(500).json({ message: 'Error al crear desparasitante' });
  }
};

exports.getDesparasitantes = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM Desparasitante');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener desparasitantes:', error);
    res.status(500).json({ message: 'Error al obtener desparasitantes' });
  }
};

exports.getDesparasitanteById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().query('SELECT * FROM Desparasitante WHERE desparasitante_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Desparasitante no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener desparasitante:', error);
    res.status(500).json({ message: 'Error al obtener desparasitante' });
  }
};

exports.updateDesparasitante = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      desparasitante_nombre,
      desparasitante_laboratorio,
      desparasitante_detalles,
      tipo,
      especie_destinada,
      edad_minima_semanas,
      peso_minimo,
      peso_maximo
    } = req.body;

    await db.promise().query(
      `UPDATE Desparasitante SET desparasitante_nombre=?, desparasitante_laboratorio=?, desparasitante_detalles=?, tipo=?, especie_destinada=?, edad_minima_semanas=?, peso_minimo=?, peso_maximo=?
       WHERE desparasitante_id=?`,
      [
        desparasitante_nombre,
        desparasitante_laboratorio,
        desparasitante_detalles,
        tipo,
        especie_destinada,
        edad_minima_semanas,
        peso_minimo,
        peso_maximo,
        id
      ]
    );

    res.json({ message: 'Desparasitante actualizado' });
  } catch (error) {
    console.error('Error al actualizar desparasitante:', error);
    res.status(500).json({ message: 'Error al actualizar desparasitante' });
  }
};

exports.deleteDesparasitante = async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query('DELETE FROM Desparasitante WHERE desparasitante_id = ?', [id]);
    res.json({ message: 'Desparasitante eliminado' });
  } catch (error) {
    console.error('Error al eliminar desparasitante:', error);
    res.status(500).json({ message: 'Error al eliminar desparasitante' });
  }
};
